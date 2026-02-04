import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 })
  }
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { company: true },
  })
  if (!user) {
    return NextResponse.json({ user: null }, { status: 200 })
  }
  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: (user as { role?: string }).role ?? "user",
      company: user.company
        ? { id: user.company.id, name: user.company.name, plan: user.company.plan }
        : null,
    },
  })
}
