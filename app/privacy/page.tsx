"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { SettingsPanel } from "@/components/settings-panel"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="relative mx-auto max-w-3xl px-6">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-sm text-muted-foreground">
            Last updated: February 2026
          </p>
          <div className="mt-8 space-y-6 text-muted-foreground">
            <p>
              Scayflo (&quot;we&quot;, &quot;our&quot;) respects your privacy. This policy describes how we collect, use, and protect your personal data when you use our platform.
            </p>
            <h2 className="text-lg font-semibold text-foreground">Data we collect</h2>
            <p>
              We collect account information (email, name, company name), data you enter for your clients (dashboards, metrics), and usage data necessary to operate the service.
            </p>
            <h2 className="text-lg font-semibold text-foreground">How we use it</h2>
            <p>
              We use your data to provide the service, improve our product, send important notifications, and comply with legal obligations. We do not sell your data to third parties.
            </p>
            <h2 className="text-lg font-semibold text-foreground">Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your data. Passwords are hashed; access is controlled and logged.
            </p>
            <h2 className="text-lg font-semibold text-foreground">Your rights</h2>
            <p>
              You may access, correct, or delete your personal data. You may also request a copy of your data or object to certain processing. Contact us to exercise these rights.
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
