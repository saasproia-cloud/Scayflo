import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getSession()
  if (!session || (session as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
  }
  const companies = await prisma.company.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, email: true, name: true } },
      _count: { select: { clients: true } },
    },
  })
  return NextResponse.json(
    companies.map((c) => ({
      id: c.id,
      name: c.name,
      plan: c.plan,
      createdAt: c.createdAt,
      user: c.user,
      clientCount: c._count.clients,
    }))
  )
}
