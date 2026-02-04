"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { SettingsPanel } from "@/components/settings-panel"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="relative mx-auto max-w-3xl px-6">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Cookie Policy
          </h1>
          <p className="mt-6 text-sm text-muted-foreground">
            Last updated: February 2026
          </p>
          <div className="mt-8 space-y-6 text-muted-foreground">
            <p>
              AuditPro uses cookies and similar technologies to provide and improve the Service.
            </p>
            <h2 className="text-lg font-semibold text-foreground">Essential cookies</h2>
            <p>
              We use cookies that are strictly necessary for the Service to function, such as authentication (e.g. session token). These cannot be disabled.
            </p>
            <h2 className="text-lg font-semibold text-foreground">Preferences</h2>
            <p>
              We store your theme and accent color preferences in local storage so they persist across sessions. This is not shared with third parties.
            </p>
            <h2 className="text-lg font-semibold text-foreground">Analytics</h2>
            <p>
              We may use analytics to understand how the product is used and to improve performance. You can manage cookie preferences in your browser.
            </p>
          </div>
          <Button className="mt-8" variant="outline" asChild>
            <Link href="/contact">
              Contact us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
      <Chatbot />
      <SettingsPanel />
    </div>
  )
}
