"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { SettingsPanel } from "@/components/settings-panel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, ArrowRight } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          companyName,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Erreur lors de l'inscription")
        return
      }
      router.push("/dashboard")
      router.refresh()
    } catch {
      setError("Erreur lors de l'inscription")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-md">
            <div className="mb-8 flex justify-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
                  <BarChart3 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Scayflo</span>
              </Link>
            </div>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 md:p-8">
                <h1 className="text-2xl font-bold text-foreground mb-2">Créer un compte</h1>
                <p className="text-sm text-muted-foreground mb-6">
                  Créez votre compte entreprise pour gérer vos clients et audits.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <p className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">
                      {error}
                    </p>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Nom complet</Label>
                    <Input
                      id="name"
                      required
                      placeholder="Jean Dupont"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border-border/50 bg-secondary/50 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-foreground">Nom de l'entreprise</Label>
                    <Input
                      id="companyName"
                      required
                      placeholder="Mon Agence"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="border-border/50 bg-secondary/50 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="vous@agence.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-border/50 bg-secondary/50 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">Mot de passe (min. 6 caractères)</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      minLength={6}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-border/50 bg-secondary/50 focus:border-primary"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full group shadow-lg shadow-primary/25"
                    disabled={loading}
                  >
                    {loading ? "Création..." : "Créer mon compte"}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Déjà un compte ?{" "}
                  <Link href="/login" className="text-primary font-medium hover:underline">
                    Se connecter
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
      <SettingsPanel />
    </div>
  )
}
