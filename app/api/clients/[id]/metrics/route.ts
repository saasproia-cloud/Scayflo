import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import type { DashboardDataJson } from "@/lib/dashboard-data"

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
  const dashboardData = client.dashboardData
  return NextResponse.json(dashboardData ? JSON.parse(dashboardData) : null)
}

export async function PUT(
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
    const body = (await request.json()) as DashboardDataJson
    const json = JSON.stringify(body)
    await prisma.client.update({
      where: { id },
      data: {
        dashboardData: json,
        lastAudit: new Date(),
      },
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 })
  }
}
