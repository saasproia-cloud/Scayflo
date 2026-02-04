"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { SettingsPanel } from "@/components/settings-panel"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, FileText } from "lucide-react"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="relative mx-auto max-w-3xl px-6">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Blog
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Tips, news, and best practices for marketing agencies and digital consultants.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-32">
        <div className="mx-auto max-w-4xl px-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground">Coming soon</h2>
              <p className="mt-2 text-muted-foreground">
                We are preparing articles and guides. Check back later or contact us for updates.
              </p>
              <Button className="mt-6" asChild>
                <Link href="/contact">
                  Get in touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
      <Chatbot />
      <SettingsPanel />
    </div>
  )
}
