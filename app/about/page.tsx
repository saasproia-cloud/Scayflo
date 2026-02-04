"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { SettingsPanel } from "@/components/settings-panel"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="relative mx-auto max-w-3xl px-6">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            About AuditPro
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            AuditPro is the all-in-one platform for marketing agencies, SEO consultants, and freelancers. 
            We help you analyze, visualize, and present your client data with professional dashboards and PDF reports.
          </p>
          <p className="mt-4 text-muted-foreground">
            Our mission is to save you time on audits so you can focus on what matters: growing your business and delighting your clients.
          </p>
          <Button className="mt-8 group shadow-lg shadow-primary/25" asChild>
            <Link href="/contact">
              Contact us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
