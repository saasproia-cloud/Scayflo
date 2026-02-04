import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { parseDashboardData } from "@/lib/dashboard-data"
import { getPlanFeatures } from "@/lib/features"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

export async function GET(request: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }
  const { searchParams } = new URL(request.url)
  const clientId = searchParams.get("clientId")
  if (!clientId) {
    return NextResponse.json({ error: "clientId requis" }, { status: 400 })
  }
  const client = await prisma.client.findFirst({
    where: { id: clientId, companyId: session.companyId },
    include: { company: true },
  })
  if (!client) {
    return NextResponse.json({ error: "Client introuvable" }, { status: 404 })
  }
  const plan = client.company?.plan ?? "free"
  const features = getPlanFeatures(plan)
  const dashboardData = parseDashboardData(client.dashboardData)
  const isProfessional = features.professionalPdfExport

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
  let y = 20

  // Professional: branded header with company name
  if (isProfessional) {
    doc.setFillColor(40, 80, 60) // primary-like
    doc.rect(0, 0, doc.getPageWidth(), 28, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(18)
    doc.text(client.company?.name ?? "Scayflo", 14, 14)
    doc.setFontSize(10)
    doc.text(`Rapport d'audit professionnel · ${new Date().toLocaleDateString("fr-FR")}`, 14, 22)
    doc.setTextColor(0, 0, 0)
    y = 36
  } else {
    doc.setFontSize(22)
    doc.text("Scayflo - Rapport d'audit", 14, y)
    y += 10
  }

  doc.setFontSize(14)
  doc.text(client.name, 14, y)
  y += 6
  doc.setFontSize(10)
  doc.text(`Secteur: ${client.sector} | Dernier audit: ${client.lastAudit ? new Date(client.lastAudit).toLocaleDateString() : "-"}`, 14, y)
  y += 15

  doc.setFontSize(12)
  doc.text("KPIs", 14, y)
  y += 8
  const headColor = isProfessional ? [40, 80, 60] : [100, 100, 100]
  autoTable(doc, {
    startY: y,
    head: [["Indicateur", "Valeur", "Évolution"]],
    body: dashboardData.kpis.map((k) => [k.label, k.value, `${k.change} vs mois précédent`]),
    theme: "grid",
    headStyles: { fillColor: headColor },
    margin: { left: 14 },
  })
  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12

  doc.setFontSize(12)
  doc.text("Trafic & Conversions", 14, y)
  y += 8
  autoTable(doc, {
    startY: y,
    head: [["Mois", "Visiteurs", "Conversions"]],
    body: dashboardData.trafficData.map((r) => [r.month, String(r.visitors), String(r.conversions)]),
    theme: "grid",
    headStyles: { fillColor: headColor },
    margin: { left: 14 },
  })
  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12

  doc.setFontSize(12)
  doc.text("Sources de trafic", 14, y)
  y += 8
  autoTable(doc, {
    startY: y,
    head: [["Source", "Part (%)"]],
    body: dashboardData.channelData.map((r) => [r.name, `${r.value}%`]),
    theme: "grid",
    headStyles: { fillColor: headColor },
    margin: { left: 14 },
  })
  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12

  doc.setFontSize(12)
  doc.text("SEO - Positions", 14, y)
  y += 8
  autoTable(doc, {
    startY: y,
    head: [["Mot-clé", "Position", "Changement"]],
    body: dashboardData.seoData.map((r) => [r.keyword, String(r.position), r.change > 0 ? `+${r.change}` : String(r.change)]),
    theme: "grid",
    headStyles: { fillColor: headColor },
    margin: { left: 14 },
  })
  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12

  doc.setFontSize(12)
  doc.text("Réseaux sociaux", 14, y)
  y += 8
  autoTable(doc, {
    startY: y,
    head: [["Plateforme", "Abonnés", "Engagement (%)"]],
    body: dashboardData.socialData.map((r) => [r.platform, String(r.followers), String(r.engagement)]),
    theme: "grid",
    headStyles: { fillColor: headColor },
    margin: { left: 14 },
  })
  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12

  // AI recommendations: Premium only in professional PDF; Free gets basic section title + "Disponible en Premium"
  if (features.aiRecommendations) {
    doc.setFontSize(12)
    doc.text("Recommandations IA", 14, y)
    y += 8
    autoTable(doc, {
      startY: y,
      head: [["Type", "Titre", "Impact", "Description"]],
      body: dashboardData.recommendations.map((r) => [
        r.type.toUpperCase(),
        r.title,
        r.impact === "high" ? "Élevé" : "Moyen",
        r.description,
      ]),
      theme: "grid",
      headStyles: { fillColor: headColor },
      margin: { left: 14 },
      columnStyles: { 3: { cellWidth: 60 } },
    })
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12
  } else {
    doc.setFontSize(12)
    doc.text("Recommandations IA", 14, y)
    y += 6
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text("Disponible avec le plan Premium.", 14, y)
    doc.setTextColor(0, 0, 0)
    y += 12
  }

  if (isProfessional) {
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(128, 128, 128)
      doc.text(
        `${client.company?.name ?? "Scayflo"} · ${client.name} · Page ${i}/${pageCount}`,
        14,
        doc.getPageHeight() - 10
      )
      doc.setTextColor(0, 0, 0)
    }
  }

  const pdfBytes = doc.output("arraybuffer")
  const suffix = isProfessional ? "professional" : "basic"
  const filename = `audit-${client.name.replace(/\s+/g, "-")}-${new Date().toISOString().slice(0, 10)}-${suffix}.pdf`
  return new NextResponse(pdfBytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  })
}
