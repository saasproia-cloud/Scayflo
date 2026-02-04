"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { SettingsPanel } from "@/components/settings-panel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Users,
  MousePointerClick,
  Search,
  Share2,
  TrendingUp,
  TrendingDown,
  Plus,
  FileText,
  Settings,
  Bell,
  LayoutDashboard,
  Building2,
  Download,
  Lightbulb,
  ArrowRight,
} from "lucide-react"
import {
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import type { DashboardDataJson } from "@/lib/dashboard-data"
import { getPlanFeatures } from "@/lib/features"
import { Lock } from "lucide-react"

interface ClientItem {
  id: string
  name: string
  sector: string
  status: string
  lastAudit: string | null
}

interface ClientDetail extends ClientItem {
  dashboardData: DashboardDataJson
}

const KPI_LABELS = ["Monthly Traffic", "Conversion Rate", "Avg. SEO Position", "Social Engagement"] as const
type EditKpisKey = "kpi0" | "kpi1" | "kpi2" | "kpi3" | "ch0" | "ch1" | "ch2" | "ch3"

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<{ company?: { name: string; plan: string } } | null>(null)
  const [clients, setClients] = useState<ClientItem[]>([])
  const [selectedClient, setSelectedClient] = useState<ClientItem | null>(null)
  const [clientDetail, setClientDetail] = useState<ClientDetail | null>(null)
  const [loadingClients, setLoadingClients] = useState(true)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [newAuditOpen, setNewAuditOpen] = useState(false)
  const [editKpis, setEditKpis] = useState<Record<EditKpisKey, string>>({
    kpi0: "", kpi1: "", kpi2: "", kpi3: "", ch0: "", ch1: "", ch2: "", ch3: "",
  })
  const [savingAudit, setSavingAudit] = useState(false)
  const [exportingPdf, setExportingPdf] = useState(false)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user ?? null))
  }, [])

  const fetchClients = useCallback(() => {
    setLoadingClients(true)
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setClients(data)
          const clientIdFromUrl = searchParams.get("client")
          if (data.length > 0) {
            if (clientIdFromUrl) {
              const fromUrl = data.find((c: ClientItem) => c.id === clientIdFromUrl)
              setSelectedClient(fromUrl ?? data[0])
            } else {
              setSelectedClient((prev) => prev && data.some((c: ClientItem) => c.id === prev.id) ? prev : data[0])
            }
          } else {
            setSelectedClient(null)
            setClientDetail(null)
          }
        }
      })
      .finally(() => setLoadingClients(false))
  }, [searchParams])

  useEffect(() => {
    fetchClients()
  }, [])

  useEffect(() => {
    if (!selectedClient) {
      setClientDetail(null)
      return
    }
    setLoadingDetail(true)
    fetch(`/api/clients/${selectedClient.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setClientDetail(data)
          setEditKpis({
            kpi0: data.dashboardData?.kpis?.[0]?.value ?? "5,200",
            kpi1: data.dashboardData?.kpis?.[1]?.value ?? "4.8%",
            kpi2: data.dashboardData?.kpis?.[2]?.value ?? "5.8",
            kpi3: data.dashboardData?.kpis?.[3]?.value ?? "12K",
            ch0: data.dashboardData?.kpis?.[0]?.change ?? "+8.3%",
            ch1: data.dashboardData?.kpis?.[1]?.change ?? "+17%",
            ch2: data.dashboardData?.kpis?.[2]?.change ?? "+3 pos",
            ch3: data.dashboardData?.kpis?.[3]?.change ?? "-2.1%",
          })
        }
      })
      .finally(() => setLoadingDetail(false))
  }, [selectedClient?.id])

  const handleExportPdf = async () => {
    if (!selectedClient) return
    setExportingPdf(true)
    try {
      const res = await fetch(`/api/export/pdf?clientId=${encodeURIComponent(selectedClient.id)}`, { credentials: "include" })
      if (!res.ok) throw new Error("Export failed")
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `audit-${selectedClient.name.replace(/\s+/g, "-")}-${new Date().toISOString().slice(0, 10)}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      // ignore
    } finally {
      setExportingPdf(false)
    }
  }

  const handleSaveNewAudit = async () => {
    if (!clientDetail) return
    setSavingAudit(true)
    try {
      const updated = {
        ...clientDetail.dashboardData,
        kpis: [
          { label: "Monthly Traffic", value: editKpis.kpi0, change: editKpis.ch0, up: true, color: "chart-1" },
          { label: "Conversion Rate", value: editKpis.kpi1, change: editKpis.ch1, up: true, color: "chart-2" },
          { label: "Avg. SEO Position", value: editKpis.kpi2, change: editKpis.ch2, up: true, color: "chart-3" },
          { label: "Social Engagement", value: editKpis.kpi3, change: editKpis.ch3, up: false, color: "chart-4" },
        ],
      }
      const res = await fetch(`/api/clients/${selectedClient?.id}/metrics`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      })
      if (!res.ok) throw new Error("Save failed")
      setClientDetail((prev) => prev ? { ...prev, dashboardData: updated } : null)
      setNewAuditOpen(false)
      fetchClients()
    } catch {
      // ignore
    } finally {
      setSavingAudit(false)
    }
  }

  const kpiIcons = [Users, MousePointerClick, Search, Share2]
  const kpiColors = ["chart-1", "chart-2", "chart-3", "chart-4"]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Demo Banner - only when we have real data (user is logged in) */}
      {user && (
        <div className="fixed top-[73px] left-0 right-0 z-40 bg-gradient-to-r from-primary to-chart-2 px-4 py-2 text-center text-sm text-primary-foreground">
          Tableau de bord actif. Vos données sont enregistrées.{" "}
          <Link href="/contact" className="underline font-medium hover:opacity-80">
            Nous contacter
          </Link>
        </div>
      )}

      <div className="flex pt-[121px]">
        <aside className="fixed left-0 top-[121px] bottom-0 w-64 border-r border-border/50 bg-card/50 backdrop-blur-sm p-4 hidden lg:block">
          <div className="mb-6">
            <div className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3 transition-all hover:bg-secondary">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{user?.company?.name ?? "My Agency"}</p>
                <p className="text-xs text-muted-foreground">{user?.company?.plan ?? "Premium"} Plan</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            <Link href="/dashboard" className="flex w-full items-center gap-3 rounded-xl bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition-all">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link href="/dashboard/clients" className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-secondary hover:text-foreground">
              <Users className="h-4 w-4" />
              Clients
            </Link>
            <Link href="/dashboard/reports" className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-secondary hover:text-foreground">
              <FileText className="h-4 w-4" />
              Reports
            </Link>
            <Link href="/dashboard/alerts" className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-secondary hover:text-foreground">
              <Bell className="h-4 w-4" />
              Alerts
              <Badge className="ml-auto bg-destructive text-destructive-foreground text-xs">3</Badge>
            </Link>
            <Link href="/dashboard/settings" className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-secondary hover:text-foreground">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>

          <div className="mt-8">
            <h4 className="mb-3 px-3 text-xs font-semibold uppercase text-muted-foreground">
              Recent Clients
            </h4>
            {loadingClients ? (
              <p className="px-3 text-sm text-muted-foreground">Chargement...</p>
            ) : clients.length === 0 ? (
              <p className="px-3 text-sm text-muted-foreground">Aucun client. <Link href="/dashboard/clients" className="text-primary underline">Ajouter</Link></p>
            ) : (
              <div className="space-y-1">
                {clients.slice(0, 4).map((client) => (
                  <button
                    key={client.id}
                    onClick={() => setSelectedClient(client)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all ${
                      selectedClient?.id === client.id
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${
                      client.status === "active" ? "bg-chart-1" : "bg-chart-3"
                    }`} />
                    <span className="truncate">{client.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        <main className="flex-1 p-6 lg:ml-64">
          {!selectedClient ? (
            <div className="rounded-2xl border border-border/50 bg-card/50 p-12 text-center">
              <h2 className="text-xl font-semibold text-foreground">Aucun client sélectionné</h2>
              <p className="mt-2 text-muted-foreground">Ajoutez un client ou sélectionnez-en un dans la barre latérale.</p>
              <Button className="mt-6 shadow-lg shadow-primary/25" asChild>
                <Link href="/dashboard/clients">
                  <Plus className="mr-2 h-4 w-4" />
                  Gérer les clients
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{selectedClient.name}</h1>
                  <p className="text-sm text-muted-foreground">
                    Industry: {selectedClient.sector} | Last audit: {selectedClient.lastAudit ?? "-"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="bg-transparent" onClick={handleExportPdf} disabled={exportingPdf}>
                    <Download className="mr-2 h-4 w-4" />
                    {exportingPdf ? "Export..." : "Export PDF"}
                  </Button>
                  <Button size="sm" className="shadow-lg shadow-primary/25" onClick={() => setNewAuditOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Audit
                  </Button>
                </div>
              </div>

              {loadingDetail ? (
                <p className="text-muted-foreground">Chargement des données...</p>
              ) : clientDetail?.dashboardData ? (
                <>
                  <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {(clientDetail.dashboardData.kpis ?? []).map((kpi, index) => (
                      <Card key={kpi.label} className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:bg-card hover:shadow-lg">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-muted-foreground">{kpi.label}</p>
                              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                            </div>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                              kpi.color === "chart-1" ? "bg-chart-1/20" : kpi.color === "chart-2" ? "bg-chart-2/20" : kpi.color === "chart-3" ? "bg-chart-3/20" : "bg-chart-4/20"
                            }`}>
                              {(() => {
                                const Icon = kpiIcons[index] ?? Users
                                return <Icon className={`h-5 w-5 ${kpi.color === "chart-1" ? "text-chart-1" : kpi.color === "chart-2" ? "text-chart-2" : kpi.color === "chart-3" ? "text-chart-3" : "text-chart-4"}`} />
                              })()}
                            </div>
                          </div>
                          <div className={`mt-2 flex items-center gap-1 text-xs ${kpi.up ? "text-chart-1" : "text-destructive"}`}>
                            {kpi.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            <span>{kpi.change} vs last month</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mb-6 grid gap-6 lg:grid-cols-2">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-foreground">Traffic & Conversions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={clientDetail.dashboardData.trafficData ?? []}>
                              <defs>
                                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                              <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }} labelStyle={{ color: "var(--foreground)" }} />
                              <Area type="monotone" dataKey="visitors" stroke="var(--chart-1)" fill="url(#colorVisitors)" strokeWidth={2} name="Visitors" />
                              <Area type="monotone" dataKey="conversions" stroke="var(--chart-2)" fill="url(#colorConversions)" strokeWidth={2} name="Conversions" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-foreground">Traffic Sources</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex h-64 items-center justify-center gap-8">
                          <ResponsiveContainer width="50%" height="100%">
                            <PieChart>
                              <Pie
                                data={clientDetail.dashboardData.channelData ?? []}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                              >
                                {(clientDetail.dashboardData.channelData ?? []).map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }} formatter={(value: number) => [`${value}%`, ""]} />
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="space-y-3">
                            {(clientDetail.dashboardData.channelData ?? []).map((item) => (
                              <div key={item.name} className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-sm text-muted-foreground">{item.name}</span>
                                <span className="text-sm font-medium text-foreground">{item.value}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mb-6 grid gap-6 lg:grid-cols-2">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-foreground">SEO Rankings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {(clientDetail.dashboardData.seoData ?? []).map((item) => (
                            <div key={item.keyword} className="flex items-center justify-between rounded-xl bg-secondary/50 p-3 transition-all hover:bg-secondary">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-foreground">{item.keyword}</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground">Position {item.position}</span>
                                <span className={`flex items-center gap-1 text-xs ${item.change > 0 ? "text-chart-1" : item.change < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                                  {item.change > 0 ? <TrendingUp className="h-3 w-3" /> : item.change < 0 ? <TrendingDown className="h-3 w-3" /> : null}
                                  {item.change > 0 ? `+${item.change}` : item.change < 0 ? item.change : "-"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-foreground">Social Media</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {(clientDetail.dashboardData.socialData ?? []).map((item) => (
                            <div key={item.platform} className="flex items-center justify-between rounded-xl bg-secondary/50 p-3 transition-all hover:bg-secondary">
                              <div>
                                <p className="text-sm font-medium text-foreground">{item.platform}</p>
                                <p className="text-xs text-muted-foreground">{item.followers.toLocaleString()} followers</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-foreground">{item.engagement}%</p>
                                <p className="text-xs text-muted-foreground">engagement</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className={`border-border/50 bg-card/50 backdrop-blur-sm relative ${!getPlanFeatures(user?.company?.plan).aiRecommendations ? "overflow-hidden" : ""}`}>
                    {!getPlanFeatures(user?.company?.plan).aiRecommendations && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm p-6 text-center">
                        <Lock className="h-10 w-10 text-muted-foreground mb-3" />
                        <p className="text-sm font-medium text-foreground">AI Recommendations</p>
                        <p className="text-xs text-muted-foreground mt-1">Upgrade to Premium to unlock advanced AI recommendations.</p>
                        <Link href="/contact" className="mt-4">
                          <Button size="sm" className="shadow-lg shadow-primary/25">Contact for Premium</Button>
                        </Link>
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <Lightbulb className="h-4 w-4 text-chart-2" />
                          AI Recommendations
                        </CardTitle>
                        <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-0">
                          {(clientDetail.dashboardData.recommendations ?? []).length} new
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        {(clientDetail.dashboardData.recommendations ?? []).map((rec, index) => (
                          <div key={index} className="rounded-xl border border-border/50 bg-secondary/50 p-4 transition-all hover:bg-secondary hover:border-primary/50">
                            <div className="mb-2 flex items-center justify-between">
                              <Badge variant="outline" className={`text-xs bg-transparent ${
                                rec.type === "seo" ? "border-chart-1 text-chart-1" :
                                rec.type === "content" ? "border-chart-2 text-chart-2" :
                                rec.type === "technical" ? "border-chart-3 text-chart-3" :
                                "border-chart-4 text-chart-4"
                              }`}>
                                {rec.type.toUpperCase()}
                              </Badge>
                              <span className={`text-xs ${rec.impact === "high" ? "text-chart-1" : "text-chart-3"}`}>
                                {rec.impact === "high" ? "High impact" : "Medium impact"}
                              </span>
                            </div>
                            <h4 className="mb-1 font-medium text-foreground">{rec.title}</h4>
                            <p className="text-sm text-muted-foreground">{rec.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="mt-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card via-card to-primary/5 p-6 text-center">
                    <h3 className="text-lg font-semibold text-foreground">Want to see this with your own data?</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Request a personalized demo and discover how Scayflo can help your agency.
                    </p>
                    <Button className="mt-4 group shadow-lg shadow-primary/25" asChild>
                      <Link href="/contact">
                        Request Demo
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </>
              ) : null}
            </>
          )}
        </main>
      </div>

      <Dialog open={newAuditOpen} onOpenChange={setNewAuditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New Audit / Edit KPIs</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {KPI_LABELS.map((label, i) => (
              <div key={label} className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">{label}</Label>
                  <Input
                    value={editKpis[`kpi${i}` as EditKpisKey]}
                    onChange={(e) => setEditKpis((p) => ({ ...p, [`kpi${i}`]: e.target.value } as Record<EditKpisKey, string>))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Change vs last month</Label>
                  <Input
                    value={editKpis[`ch${i}` as EditKpisKey]}
                    onChange={(e) => setEditKpis((p) => ({ ...p, [`ch${i}`]: e.target.value } as Record<EditKpisKey, string>))}
                    className="mt-1"
                    placeholder="+8.3%"
                  />
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewAuditOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveNewAudit} disabled={savingAudit}>{savingAudit ? "Saving..." : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
      <Chatbot />
      <SettingsPanel />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center pt-32">Chargement...</div>}>
      <DashboardContent />
    </Suspense>
  )
}
