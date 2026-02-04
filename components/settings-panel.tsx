"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Settings,
  X,
  Sun,
  Moon,
  Monitor,
  Check,
  Palette,
} from "lucide-react"

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

export function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState("dark")
  const [colorScheme, setColorScheme] = useState("green")

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("scayflo-theme") || "dark"
    const savedColor = localStorage.getItem("scayflo-color") || "green"
    setTheme(savedTheme)
    setColorScheme(savedColor)
    applyTheme(savedTheme)
    applyColorScheme(savedColor)
  }, [])

  const applyTheme = (newTheme: string) => {
    const root = document.documentElement
    
    if (newTheme === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      root.classList.toggle("dark", systemDark)
      root.classList.toggle("light", !systemDark)
    } else if (newTheme === "light") {
      root.classList.remove("dark")
      root.classList.add("light")
      // Apply light mode colors
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
      // Apply dark mode colors
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
    if (scheme) {
      const root = document.documentElement
      root.style.setProperty("--primary", scheme.primary)
      root.style.setProperty("--accent", scheme.primary)
      root.style.setProperty("--ring", scheme.primary)
      root.style.setProperty("--chart-1", scheme.primary)
    }
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem("scayflo-theme", newTheme)
    applyTheme(newTheme)
  }

  const handleColorChange = (newColor: string) => {
    setColorScheme(newColor)
    localStorage.setItem("scayflo-color", newColor)
    applyColorScheme(newColor)
  }

  return (
    <>
      {/* Settings Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-secondary border border-border/50 text-muted-foreground shadow-lg transition-all hover:scale-110 hover:text-foreground hover:shadow-xl ${isOpen ? "hidden" : ""}`}
        aria-label="Open settings"
      >
        <Settings className="h-5 w-5" />
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <Card className="fixed top-1/2 left-1/2 z-50 w-[400px] max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl animate-in zoom-in-95 fade-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                  <Palette className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Settings</h3>
                  <p className="text-xs text-muted-foreground">Customize your experience</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close settings"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Theme Selection */}
              <div>
                <label className="mb-3 block text-sm font-medium text-foreground">
                  Theme Mode
                </label>
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
              </div>

              {/* Color Scheme */}
              <div>
                <label className="mb-3 block text-sm font-medium text-foreground">
                  Accent Color
                </label>
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
                      <div
                        className={`h-8 w-8 rounded-full ${scheme.class} shadow-lg transition-transform group-hover:scale-110`}
                      />
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
              </div>

              {/* Preview */}
              <div className="rounded-xl border border-border/50 bg-secondary/50 p-4">
                <p className="mb-2 text-xs text-muted-foreground">Preview</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary" />
                  <div className="flex-1">
                    <div className="h-3 w-24 rounded bg-foreground/80" />
                    <div className="mt-1 h-2 w-32 rounded bg-muted-foreground/50" />
                  </div>
                  <Button size="sm">Button</Button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border/50 p-4">
              <Button
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                Done
              </Button>
            </div>
          </Card>
        </>
      )}
    </>
  )
}
