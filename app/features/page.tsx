"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { SettingsPanel } from "@/components/settings-panel"
import {
  BarChart3,
  FileText,
  Zap,
  Shield,
  Users,
  TrendingUp,
  ArrowRight,
  Database,
  Mail,
  Bell,
  Globe,
  Lock,
  Sparkles,
  Target,
  LineChart,
  Share2,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const coreFeatures = [
  {
    icon: Database,
    title: "Multi-source Data Integration",
    description: "Connect Google Analytics, Search Console, Google Ads and import your CSV or Google Sheets data.",
    details: ["Google Analytics 4", "Search Console", "Google Ads", "CSV / Google Sheets", "Custom APIs"],
  },
  {
    icon: BarChart3,
    title: "Central Dashboard",
    description: "View all your client metrics at a glance with interactive charts and visualizations.",
    details: ["Real-time charts", "Customizable KPIs", "Period comparison", "Client-by-client view"],
  },
  {
    icon: FileText,
    title: "Professional PDF Export",
    description: "Generate customized PDF reports with your agency logo and brand colors.",
    details: ["Custom branding", "Professional layouts", "One-click export", "Multiple templates"],
  },
  {
    icon: Zap,
    title: "AI Recommendations",
    description: "Our AI analyzes your data and generates concrete, actionable recommendations.",
    details: ["SEO suggestions", "Ads optimizations", "Content advice", "Automatic alerts"],
  },
  {
    icon: Users,
    title: "Multi-client Management",
    description: "Manage all your clients from a single organized and secure interface.",
    details: ["Unlimited clients*", "Tags & categories", "Advanced search", "Archive system"],
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Your data and your clients' data are protected with the highest security standards.",
    details: ["AES-256 encryption", "GDPR compliant", "Daily backups", "SSO available"],
  },
]

const advancedFeatures = [
  {
    icon: Share2,
    title: "Facebook & LinkedIn Ads",
    description: "Connect your ad accounts for comprehensive cross-platform audits.",
    badge: "Coming Soon",
  },
  {
    icon: Target,
    title: "Competitor Benchmarking",
    description: "Compare your clients' performance against their competitors.",
    badge: "Coming Soon",
  },
  {
    icon: Sparkles,
    title: "Advanced AI",
    description: "Ultra-personalized suggestions based on your specific industry.",
    badge: "Premium",
  },
  {
    icon: Lock,
    title: "Secure Sharing",
    description: "Share read-only dashboards directly with your clients.",
    badge: "Premium",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Get notifications when a KPI exceeds a defined threshold.",
    badge: "Premium",
  },
  {
    icon: Mail,
    title: "Direct Email Sending",
    description: "Send your PDF audits directly via email from the platform.",
    badge: "Premium",
  },
]

const integrations = [
  { name: "Google Analytics", icon: LineChart },
  { name: "Search Console", icon: Globe },
  { name: "Google Ads", icon: Target },
  { name: "Google Sheets", icon: Database },
  { name: "Facebook Ads", icon: Share2 },
  { name: "LinkedIn Ads", icon: Users },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute top-40 right-1/4 h-96 w-96 rounded-full bg-chart-2/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-700">
              Powerful features for{" "}
              <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">exceptional audits</span>
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "100ms" }}>
              Discover all the tools that make Scayflo the preferred platform for marketing agencies and digital consultants worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30 border-0">
              Core Features
            </Badge>
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              Everything you need
            </h2>
            <p className="mt-4 text-muted-foreground">
              Tools designed to save you time and impress your clients.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {coreFeatures.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-xl hover:shadow-primary/5"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 transition-transform group-hover:scale-110">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-chart-4/20 text-chart-4 hover:bg-chart-4/30 border-0">
              Roadmap
            </Badge>
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              Advanced Features
            </h2>
            <p className="mt-4 text-muted-foreground">
              Even more powerful tools to take your audits further.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {advancedFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group flex items-start gap-4 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary transition-transform group-hover:scale-110">
                  <feature.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        feature.badge === "Premium"
                          ? "border-primary text-primary bg-transparent"
                          : "border-chart-3 text-chart-3 bg-transparent"
                      }`}
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              Available Integrations
            </h2>
            <p className="mt-4 text-muted-foreground">
              Connect your favorite tools in just a few clicks.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 text-center transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary transition-transform group-hover:scale-110">
                  <integration.icon className="h-6 w-6 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">{integration.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-muted-foreground">
              Generate professional audits in 3 simple steps.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: 1, title: "Connect your data", description: "Link Google Analytics, Search Console or import a CSV file." },
              { step: 2, title: "Analyze automatically", description: "Our AI analyzes your data and generates charts and recommendations." },
              { step: 3, title: "Export & share", description: "Download your professional PDF or share a secure link with clients." },
            ].map((item) => (
              <div key={item.step} className="relative text-center group">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-2xl font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform group-hover:scale-110">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-primary/5 p-8 text-center md:p-16">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              Ready to discover Scayflo?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Start free and explore all these features today.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="group shadow-lg shadow-primary/25" asChild>
                <Link href="/contact">
                  Start Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent" asChild>
                <Link href="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
      <SettingsPanel />
    </div>
  )
}
