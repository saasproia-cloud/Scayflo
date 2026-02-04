import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "auditpro-secret-change-in-production"
)

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auditpro-token")?.value
  const path = request.nextUrl.pathname
  const isDashboard = path.startsWith("/dashboard")
  const isAdmin = path.startsWith("/admin")

  if (isAdmin) {
    if (!token) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("from", path)
      return NextResponse.redirect(loginUrl)
    }
    try {
      const { payload } = await jwtVerify(token, SECRET)
      const role = (payload as { role?: string }).role
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
      return NextResponse.next()
    } catch {
      const res = NextResponse.redirect(new URL("/login", request.url))
      res.cookies.delete("auditpro-token")
      return res
    }
  }

  if (isDashboard) {
    if (!token) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("from", path)
      return NextResponse.redirect(loginUrl)
    }
    try {
      await jwtVerify(token, SECRET)
      return NextResponse.next()
    } catch {
      const res = NextResponse.redirect(new URL("/login", request.url))
      res.cookies.delete("auditpro-token")
      return res
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}
