import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getSession()
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { company: { select: { id: true, name: true, plan: true } } },
  })

  return NextResponse.json(
    users.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      company: u.company,
      createdAt: u.createdAt,
    }))
  )
}

export async function PATCH(req: Request) {
  const session = await getSession()
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
  }

  const body = await req.json()
  const { id, name, role, companyId } = body
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

  const updateData: any = {}
  if (name) updateData.name = name
  if (role) updateData.role = role
  if (companyId) updateData.companyId = companyId

  const user = await prisma.user.update({ where: { id }, data: updateData })
  return NextResponse.json({ id: user.id, email: user.email, name: user.name, role: user.role })
}

export async function DELETE(req: Request) {
  const session = await getSession()
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

  await prisma.user.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
