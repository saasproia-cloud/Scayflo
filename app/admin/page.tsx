"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Mail, ArrowLeft, Crown, Zap } from "lucide-react"

interface CompanyRow {
  id: string
  name: string
  plan: string
  createdAt: string
  user: { id: string; email: string; name: string } | null
  clientCount: number
}

export default function AdminPage() {
  const [companies, setCompanies] = useState<CompanyRow[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/admin/companies", { credentials: "include" })
      .then((res) => {
        if (res.status === 403) throw new Error("Forbidden")
        return res.json()
      })
      .then((data) => setCompanies(Array.isArray(data) ? data : []))
      .catch(() => setCompanies([]))
      .finally(() => setLoading(false))
  }, [])

  const setPlan = async (companyId: string, plan: "free" | "premium") => {
    setUpdatingId(companyId)
    try {
      const res = await fetch(`/api/admin/companies/${companyId}/plan`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed")
      setCompanies((prev) =>
        prev.map((c) => (c.id === companyId ? { ...c, plan } : c))
      )
    } catch {
      // ignore
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-[73px]">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Link
                href="/dashboard"
                className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-foreground">Admin – Companies & Plans</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manually assign or revoke Premium. Users cannot change their plan.
              </p>
            </div>
          </div>

          {loading ? (
            <p className="text-muted-foreground">Chargement...</p>
          ) : companies.length === 0 ? (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="py-12 text-center">
                <Building2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Aucune entreprise.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {companies.map((c) => (
                <Card
                  key={c.id}
                  className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:bg-card hover:shadow-lg"
                >
                  <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{c.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {c.user?.email ?? "—"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {c.user?.name ?? "—"} · {c.clientCount} client{c.clientCount !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge
                        variant={c.plan === "premium" ? "default" : "secondary"}
                        className={c.plan === "premium" ? "bg-primary" : ""}
                      >
                        {c.plan === "premium" ? (
                          <>
                            <Crown className="h-3 w-3 mr-1" />
                            Premium
                          </>
                        ) : (
                          <>
                            <Zap className="h-3 w-3 mr-1" />
                            Free
                          </>
                        )}
                      </Badge>
                      {c.plan === "premium" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={updatingId === c.id}
                          onClick={() => setPlan(c.id, "free")}
                        >
                          {updatingId === c.id ? "..." : "Set Free"}
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="shadow-lg shadow-primary/25"
                          disabled={updatingId === c.id}
                          onClick={() => setPlan(c.id, "premium")}
                        >
                          {updatingId === c.id ? "..." : "Set Premium"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
