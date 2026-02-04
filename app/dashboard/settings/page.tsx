"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { SettingsPanel } from "@/components/settings-panel"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Sun, Moon, Monitor, Check, Palette } from "lucide-react"

const themeOptions = [
  { id: "dark", name: "Dark", icon: Moon },
  { id: "light", name: "Light", icon: Sun },
  { id: "system", name: "System", icon: Monitor },
]

const colorSchemes = [
  { id: "green", name: "Green", primary: "oklch(0.65 0.18 145)", class: "bg-[oklch(0.65_0.18_145)]" },
  { id: "blue", name: "Blue", primary: "oklch(0.65 0.18 230)", class: "bg-[oklch(0.65_0.18_230)]" },
  { id: "orange", name: "Orange", primary: "oklch(0.7 0.18 50)", class: "bg-[oklch(0.7_0.18_50)]" },
  { id: "pink", name: "Pink", primary: "oklch(0.65 0.18 350)", class: "bg-[oklch(0.65_0.18_350)]" },
  { id: "cyan", name: "Cyan", primary: "oklch(0.7 0.15 200)", class: "bg-[oklch(0.7_0.15_200)]" },
]

export default function DashboardSettingsPage() {
  const [user, setUser] = useState<{ company?: { name: string; plan: string } } | null>(null)
  const [theme, setTheme] = useState("dark")
  const [colorScheme, setColorScheme] = useState("green")

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user ?? null))
  }, [])

  useEffect(() => {
    const savedTheme = typeof window !== "undefined" ? localStorage.getItem("scayflo-theme") || "dark" : "dark"
    const savedColor = typeof window !== "undefined" ? localStorage.getItem("scayflo-color") || "green" : "green"
    setTheme(savedTheme)
    setColorScheme(savedColor)
    applyTheme(savedTheme)
    applyColorScheme(savedColor)
  }, [])

  const applyTheme = (newTheme: string) => {
    if (typeof document === "undefined") return
    const root = document.documentElement
    if (newTheme === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      root.classList.toggle("dark", systemDark)
      root.classList.toggle("light", !systemDark)
    } else if (newTheme === "light") {
      root.classList.remove("dark")
      root.classList.add("light")
      root.style.setProperty("--background", "oklch(0.98 0 0)")
      root.style.setProperty("--foreground", "oklch(0.15 0.01 260)")
      root.style.setProperty("--card", "oklch(1 0 0)")
      root.style.setProperty("--card-foreground", "oklch(0.15 0.01 260)")
      root.style.setProperty("--popover", "oklch(1 0 0)")
      root.style.setProperty("--popover-foreground", "oklch(0.15 0.01 260)")
      root.style.setProperty("--secondary", "oklch(0.95 0 0)")
      root.style.setProperty("--secondary-foreground", "oklch(0.15 0.01 260)")
      root.style.setProperty("--muted", "oklch(0.95 0 0)")
      root.style.setProperty("--muted-foreground", "oklch(0.45 0 0)")
      root.style.setProperty("--border", "oklch(0.88 0 0)")
      root.style.setProperty("--input", "oklch(0.95 0 0)")
    } else {
      root.classList.add("dark")
      root.classList.remove("light")
      root.style.setProperty("--background", "oklch(0.13 0.01 260)")
      root.style.setProperty("--foreground", "oklch(0.98 0 0)")
      root.style.setProperty("--card", "oklch(0.17 0.01 260)")
      root.style.setProperty("--card-foreground", "oklch(0.98 0 0)")
      root.style.setProperty("--popover", "oklch(0.17 0.01 260)")
      root.style.setProperty("--popover-foreground", "oklch(0.98 0 0)")
      root.style.setProperty("--secondary", "oklch(0.22 0.01 260)")
      root.style.setProperty("--secondary-foreground", "oklch(0.98 0 0)")
      root.style.setProperty("--muted", "oklch(0.22 0.01 260)")
      root.style.setProperty("--muted-foreground", "oklch(0.65 0 0)")
      root.style.setProperty("--border", "oklch(0.28 0.01 260)")
      root.style.setProperty("--input", "oklch(0.22 0.01 260)")
    }
  }

  const applyColorScheme = (schemeId: string) => {
    const scheme = colorSchemes.find((s) => s.id === schemeId)
    if (scheme && typeof document !== "undefined") {
      const root = document.documentElement
      root.style.setProperty("--primary", scheme.primary)
      root.style.setProperty("--accent", scheme.primary)
      root.style.setProperty("--ring", scheme.primary)
      root.style.setProperty("--chart-1", scheme.primary)
    }
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    if (typeof window !== "undefined") localStorage.setItem("scayflo-theme", newTheme)
    applyTheme(newTheme)
  }

  const handleColorChange = (newColor: string) => {
    setColorScheme(newColor)
    if (typeof window !== "undefined") localStorage.setItem("scayflo-color", newColor)
    applyColorScheme(newColor)
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
        <DashboardSidebar
          companyName={user?.company?.name}
          plan={user?.company?.plan}
          current="settings"
        />

        <main className="flex-1 p-6 lg:ml-64">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground">
              Customize your experience: theme and accent color.
            </p>
          </div>

          <div className="max-w-2xl space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Palette className="h-5 w-5 text-primary" />
                  Theme Mode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {themeOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleThemeChange(option.id)}
                      className={`relative flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
                        theme === option.id
                          ? "border-primary bg-primary/10"
                          : "border-border/50 bg-secondary/50 hover:border-primary/50 hover:bg-secondary"
                      }`}
                    >
                      <option.icon className={`h-5 w-5 ${theme === option.id ? "text-primary" : "text-muted-foreground"}`} />
                      <span className={`text-xs font-medium ${theme === option.id ? "text-primary" : "text-muted-foreground"}`}>
                        {option.name}
                      </span>
                      {theme === option.id && (
                        <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings className="h-5 w-5 text-primary" />
                  Accent Color
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {colorSchemes.map((scheme) => (
                    <button
                      key={scheme.id}
                      onClick={() => handleColorChange(scheme.id)}
                      className={`group relative flex flex-col items-center gap-2 rounded-xl border p-3 transition-all ${
                        colorScheme === scheme.id
                          ? "border-primary bg-primary/10"
                          : "border-border/50 bg-secondary/50 hover:border-primary/50 hover:bg-secondary"
                      }`}
                    >
                      <div className={`h-8 w-8 rounded-full ${scheme.class} shadow-lg transition-transform group-hover:scale-110`} />
                      <span className={`text-xs font-medium ${colorScheme === scheme.id ? "text-primary" : "text-muted-foreground"}`}>
                        {scheme.name}
                      </span>
                      {colorScheme === scheme.id && (
                        <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <Footer />
      <Chatbot />
      <SettingsPanel />
    </div>
  )
}
