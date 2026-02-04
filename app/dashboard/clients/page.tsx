"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { SettingsPanel } from "@/components/settings-panel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Users, Plus, Building2, LayoutDashboard, FileText, Settings, Bell, Pencil, Trash2 } from "lucide-react"
import { getPlanFeatures } from "@/lib/features"

interface ClientItem {
  id: string
  name: string
  sector: string
  status: string
  lastAudit: string | null
}

export default function DashboardClientsPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ company?: { name: string; plan: string } } | null>(null)
  const [clients, setClients] = useState<ClientItem[]>([])
  const [loading, setLoading] = useState(true)
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editingClient, setEditingClient] = useState<ClientItem | null>(null)
  const [formName, setFormName] = useState("")
  const [formSector, setFormSector] = useState("")
  const [formStatus, setFormStatus] = useState("active")
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [addError, setAddError] = useState("")

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user ?? null))
  }, [])

  const fetchClients = () => {
    setLoading(true)
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setClients(data)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddError("")
    setSaving(true)
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, sector: formSector, status: formStatus }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setAddError(data.error ?? "Erreur lors de l'ajout.")
        return
      }
      setAddOpen(false)
      setFormName("")
      setFormSector("")
      setFormStatus("active")
      fetchClients()
    } catch {
      setAddError("Erreur réseau.")
    } finally {
      setSaving(false)
    }
  }
  const plan = user?.company?.plan ?? "free"
  const features = getPlanFeatures(plan)
  const canAddMore = clients.length < features.maxClients

  const openEdit = (client: ClientItem) => {
    setEditingClient(client)
    setFormName(client.name)
    setFormSector(client.sector)
    setFormStatus(client.status)
    setEditOpen(true)
  }

  const handleEditClient = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingClient) return
    setSaving(true)
    try {
      const res = await fetch(`/api/clients/${editingClient.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, sector: formSector, status: formStatus }),
      })
      if (!res.ok) throw new Error("Failed")
      setEditOpen(false)
      setEditingClient(null)
      fetchClients()
    } catch {
      // ignore
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/clients/${deleteId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed")
      setDeleteId(null)
      fetchClients()
    } catch {
      // ignore
    } finally {
      setDeleting(false)
    }
  }

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
            <Link href="/dashboard" className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-secondary hover:text-foreground">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link href="/dashboard/clients" className="flex w-full items-center gap-3 rounded-xl bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition-all">
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
            </Link>
            <Link href="/dashboard/settings" className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-secondary hover:text-foreground">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-6 lg:ml-64">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Clients</h1>
              <p className="text-sm text-muted-foreground">Manage your clients and their audits.</p>
            </div>
            <Button
              size="sm"
              className="shadow-lg shadow-primary/25"
              disabled={!canAddMore}
              onClick={() => { setAddError(""); setFormName(""); setFormSector(""); setFormStatus("active"); setAddOpen(true); }}
              title={!canAddMore ? `Limite du plan Free (max. ${features.maxClients} clients). Contactez-nous pour Premium.` : undefined}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </div>

          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : clients.length === 0 ? (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground">No clients yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">Add your first client to get started.</p>
                <Button className="mt-6 shadow-lg shadow-primary/25" disabled={!canAddMore} onClick={() => { setAddError(""); setAddOpen(true); }} title={!canAddMore ? `Limite du plan Free (max. ${features.maxClients} clients).` : undefined}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Client
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {clients.map((client) => (
                <Card key={client.id} className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:bg-card hover:shadow-lg">
                  <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`h-2 w-2 rounded-full ${client.status === "active" ? "bg-chart-1" : "bg-chart-3"}`} />
                      <div>
                        <p className="font-medium text-foreground">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.sector} · Last audit: {client.lastAudit ?? "-"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEdit(client)}>
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => setDeleteId(client.id)}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/dashboard?client=${client.id}`}>View Dashboard</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Client</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddClient} className="space-y-4 py-4">
            {addError && (
              <p className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">{addError}</p>
            )}
            <div>
              <Label>Name</Label>
              <Input value={formName} onChange={(e) => setFormName(e.target.value)} required placeholder="Client name" className="mt-1" />
            </div>
            <div>
              <Label>Sector</Label>
              <Input value={formSector} onChange={(e) => setFormSector(e.target.value)} required placeholder="e.g. B2B SaaS" className="mt-1" />
            </div>
            <div>
              <Label>Status</Label>
              <select value={formStatus} onChange={(e) => setFormStatus(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="active">Active</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={saving}>{saving ? "Adding..." : "Add"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={(open) => { if (!open) setEditingClient(null); setEditOpen(open); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditClient} className="space-y-4 py-4">
            <div>
              <Label>Name</Label>
              <Input value={formName} onChange={(e) => setFormName(e.target.value)} required placeholder="Client name" className="mt-1" />
            </div>
            <div>
              <Label>Sector</Label>
              <Input value={formSector} onChange={(e) => setFormSector(e.target.value)} required placeholder="e.g. B2B SaaS" className="mt-1" />
            </div>
            <div>
              <Label>Status</Label>
              <select value={formStatus} onChange={(e) => setFormStatus(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="active">Active</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete client?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. All audit data for this client will be permanently removed.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
      <Chatbot />
      <SettingsPanel />
    </div>
  )
}
