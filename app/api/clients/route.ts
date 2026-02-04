import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { defaultDashboardData } from "@/lib/dashboard-data"
import { canAddClient, getPlanFeatures } from "@/lib/features"

const createSchema = z.object({
  name: z.string().min(1),
  sector: z.string().min(1),
  status: z.string().optional(),
})

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }
  const clients = await prisma.client.findMany({
    where: { companyId: session.companyId },
    orderBy: { createdAt: "desc" },
  })
  const clientsWithFormattedDate = clients.map((c) => ({
    id: c.id,
    name: c.name,
    sector: c.sector,
    status: c.status,
    lastAudit: c.lastAudit ? new Date(c.lastAudit).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null,
    createdAt: c.createdAt,
  }))
  return NextResponse.json(clientsWithFormattedDate)
}

export async function POST(request: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }
  try {
    const company = await prisma.company.findUnique({
      where: { id: session.companyId },
      include: { _count: { select: { clients: true } } },
    })
    if (!company) {
      return NextResponse.json({ error: "Entreprise introuvable" }, { status: 404 })
    }
    const plan = company.plan ?? "free"
    if (!canAddClient(plan, company._count.clients)) {
      const features = getPlanFeatures(plan)
      return NextResponse.json(
        {
          error: `Limite du plan Free atteinte (max. ${features.maxClients} clients). Contactez-nous pour passer en Premium.`,
        },
        { status: 403 }
      )
    }
    const body = await request.json()
    const { name, sector, status } = createSchema.parse(body)
    const client = await prisma.client.create({
      data: {
        companyId: session.companyId,
        name,
        sector,
        status: status ?? "active",
        dashboardData: JSON.stringify(defaultDashboardData),
      },
    })
    return NextResponse.json({
      id: client.id,
      name: client.name,
      sector: client.sector,
      status: client.status,
      lastAudit: client.lastAudit ? new Date(client.lastAudit).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null,
    })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 })
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
