import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
  }

  const id = params.id
  const body = await req.json()
  const { plan, name } = body
  const updateData: any = {}
  if (plan) updateData.plan = plan
  if (name) updateData.name = name

  const company = await prisma.company.update({ where: { id }, data: updateData })
  return NextResponse.json({ id: company.id, name: company.name, plan: company.plan })
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
  }
  const id = params.id
  await prisma.company.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
