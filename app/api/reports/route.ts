import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "auditpro-secret-change-in-production"
)

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auditpro-token")?.value
    if (!token) {
      return NextResponse.json([], { status: 200 })
    }
    await jwtVerify(token, SECRET)
    // TODO: add Report model to store export history; for now return empty list
    return NextResponse.json([])
  } catch {
    return NextResponse.json([], { status: 200 })
  }
}
