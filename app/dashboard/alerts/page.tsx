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
import { Badge } from "@/components/ui/badge"
import { Bell, TrendingUp, TrendingDown, AlertTriangle, ArrowRight } from "lucide-react"

interface AlertItem {
  id: string
  type: "kpi" | "threshold" | "audit"
  title: string
  message: string
  clientName?: string
  clientId?: string
  severity: "high" | "medium" | "low"
  createdAt: string
  read: boolean
}

export default function DashboardAlertsPage() {
  const [user, setUser] = useState<{ company?: { name: string; plan: string } } | null>(null)
  const [alerts, setAlerts] = useState<AlertItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user ?? null))
  }, [])

  useEffect(() => {
    setLoading(true)
    fetch("/api/alerts")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setAlerts(data)
        else setAlerts([])
      })
      .catch(() => setAlerts([]))
      .finally(() => setLoading(false))
  }, [])

  const unreadCount = alerts.filter((a) => !a.read).length

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
          current="alerts"
          showAlertsBadge={unreadCount > 0}
        />

        <main className="flex-1 p-6 lg:ml-64">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Alerts</h1>
            <p className="text-sm text-muted-foreground">
              Notifications and KPI alerts for your clients.
            </p>
          </div>

          {loading ? (
            <p className="text-muted-foreground">Chargement...</p>
          ) : alerts.length === 0 ? (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground">No alerts</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md">
                  When you set up KPI thresholds or when we detect important changes, alerts will appear here.
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
              {alerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={`border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:bg-card hover:shadow-lg ${
                    !alert.read ? "border-primary/30 bg-primary/5" : ""
                  }`}
                >
                  <CardContent className="p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          alert.severity === "high"
                            ? "bg-destructive/20 text-destructive"
                            : alert.severity === "medium"
                            ? "bg-chart-3/20 text-chart-3"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {alert.type === "kpi" ? (
                          <TrendingUp className="h-5 w-5" />
                        ) : alert.type === "threshold" ? (
                          <AlertTriangle className="h-5 w-5" />
                        ) : (
                          <Bell className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{alert.title}</p>
                          {!alert.read && (
                            <Badge className="bg-primary/20 text-primary border-0 text-xs">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{alert.message}</p>
                        {alert.clientName && (
                          <p className="text-xs text-muted-foreground mt-1">Client: {alert.clientName}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(alert.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {alert.clientId && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard?client=${alert.clientId}`}>View Dashboard</Link>
                      </Button>
                    )}
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
