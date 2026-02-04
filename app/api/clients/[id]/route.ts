import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { parseDashboardData } from "@/lib/dashboard-data"

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  sector: z.string().min(1).optional(),
  status: z.string().optional(),
})

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }
  const { id } = await params
  const client = await prisma.client.findFirst({
    where: { id, companyId: session.companyId },
  })
  if (!client) {
    return NextResponse.json({ error: "Client introuvable" }, { status: 404 })
  }
  const dashboardData = parseDashboardData(client.dashboardData)
  return NextResponse.json({
    id: client.id,
    name: client.name,
    sector: client.sector,
    status: client.status,
    lastAudit: client.lastAudit ? new Date(client.lastAudit).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null,
    dashboardData,
  })
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }
  const { id } = await params
  const client = await prisma.client.findFirst({
    where: { id, companyId: session.companyId },
  })
  if (!client) {
    return NextResponse.json({ error: "Client introuvable" }, { status: 404 })
  }
  try {
    const body = await request.json()
    const data = updateSchema.parse(body)
    const updated = await prisma.client.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.sector && { sector: data.sector }),
        ...(data.status && { status: data.status }),
      },
    })
    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      sector: updated.sector,
      status: updated.status,
      lastAudit: updated.lastAudit ? new Date(updated.lastAudit).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null,
    })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 })
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }
  const { id } = await params
  const client = await prisma.client.findFirst({
    where: { id, companyId: session.companyId },
  })
  if (!client) {
    return NextResponse.json({ error: "Client introuvable" }, { status: 404 })
  }
  await prisma.client.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
