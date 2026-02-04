"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { SettingsPanel } from "@/components/settings-panel"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Download, ArrowRight } from "lucide-react"

interface ReportItem {
  id: string
  clientName: string
  clientId: string
  createdAt: string
}

export default function DashboardReportsPage() {
  const [user, setUser] = useState<{ company?: { name: string; plan: string } } | null>(null)
  const [reports, setReports] = useState<ReportItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user ?? null))
  }, [])

  useEffect(() => {
    setLoading(true)
    fetch("/api/reports")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setReports(data)
        else setReports([])
      })
      .catch(() => setReports([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {user && (
        <div className="fixed top-[73px] left-0 right-0 z-40 bg-gradient-to-r from-primary to-chart-2 px-4 py-2 text-center text-sm text-primary-foreground">
          Tableau de bord actif. Vos données sont enregistrées.{" "}
          <Link href="/contact" className="underline font-medium hover:opacity-80">
            Nous contacter
          </Link>
        </div>
      )}

      <div className="flex pt-[121px]">
        <DashboardSidebar
          companyName={user?.company?.name}
          plan={user?.company?.plan}
          current="reports"
        />

        <main className="flex-1 p-6 lg:ml-64">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Reports</h1>
            <p className="text-sm text-muted-foreground">
              Your exported PDF reports. Generate new ones from any client dashboard.
            </p>
          </div>

          {loading ? (
            <p className="text-muted-foreground">Chargement...</p>
          ) : reports.length === 0 ? (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground">No reports yet</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md">
                  Export a PDF from a client dashboard to create your first report. Your export history will appear here.
                </p>
                <Button className="mt-6 shadow-lg shadow-primary/25" asChild>
                  <Link href="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <Card key={report.id} className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:bg-card hover:shadow-lg">
                  <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{report.clientName}</p>
                        <p className="text-sm text-muted-foreground">
                          Exporté le {new Date(report.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/api/export/pdf?clientId=${encodeURIComponent(report.clientId)}`} target="_blank" download>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
      <Chatbot />
      <SettingsPanel />
    </div>
  )
}
