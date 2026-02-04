"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { SettingsPanel } from "@/components/settings-panel"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="relative mx-auto max-w-3xl px-6">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-6 text-sm text-muted-foreground">
            Last updated: February 2026
          </p>
          <div className="mt-8 space-y-6 text-muted-foreground">
            <p>
              By using AuditPro (&quot;the Service&quot;), you agree to these Terms of Service.
            </p>
            <h2 className="text-lg font-semibold text-foreground">Use of the Service</h2>
            <p>
              You must use the Service in compliance with applicable laws. You are responsible for the accuracy of the data you enter and for keeping your account credentials secure.
            </p>
            <h2 className="text-lg font-semibold text-foreground">Account and billing</h2>
            <p>
              You may use the free plan as described. Paid plans are billed according to the pricing in effect at the time of subscription. You may cancel at any time.
            </p>
            <h2 className="text-lg font-semibold text-foreground">Intellectual property</h2>
            <p>
              AuditPro and its content are owned by us. You retain ownership of your data. We may use anonymized or aggregated data to improve the Service.
            </p>
            <h2 className="text-lg font-semibold text-foreground">Limitation of liability</h2>
            <p>
              The Service is provided &quot;as is&quot;. We are not liable for indirect, incidental, or consequential damages. Our total liability is limited to the amount you paid in the twelve months preceding the claim.
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
