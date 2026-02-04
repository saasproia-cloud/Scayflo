"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { SettingsPanel } from "@/components/settings-panel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, X, ArrowRight, HelpCircle } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "0",
    period: "/month",
    description: "Perfect for discovering Scayflo and testing its features.",
    features: [
      { text: "Up to 3 clients", included: true },
      { text: "Basic dashboard", included: true },
      { text: "Simple PDF export", included: true },
      { text: "1 data source", included: true },
      { text: "AI recommendations", included: false },
      { text: "Custom branding", included: false },
      { text: "Smart alerts", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Premium",
    price: "X",
    period: "/month",
    description: "All features unlimited for professionals.",
    features: [
      { text: "Unlimited clients", included: true },
      { text: "Complete dashboard", included: true },
      { text: "Professional PDF export", included: true },
      { text: "All data sources", included: true },
      { text: "Advanced AI recommendations", included: true },
      { text: "Custom branding", included: true },
      { text: "Smart alerts", included: true },
      { text: "24/7 Priority support", included: true },
    ],
    cta: "Get Premium",
    popular: true,
  },
]

const faqs = [
  {
    question: "Can I switch plans at any time?",
    answer: "Yes, you can switch from the free plan to premium at any time and vice versa.",
  },
  {
    question: "Are there any hidden fees?",
    answer: "No, the displayed prices are all-inclusive. No setup fees, no cancellation fees.",
  },
  {
    question: "How does custom branding work?",
    answer: "You can add your logo, colors, and agency information to all PDF exports.",
  },
  {
    question: "Can I cancel at any time?",
    answer: "Yes, you can cancel your subscription at any time. Your access remains active until the end of the paid period.",
  },
  {
    question: "What are the main differences between Free and Premium?",
    answer: "The free plan allows you to manage up to 3 clients with basic features. The premium plan offers unlimited access to all clients and all advanced features.",
  },
  {
    question: "Do you offer pricing for large teams?",
    answer: "Yes, contact us for a custom quote tailored to your specific needs.",
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute top-40 right-1/4 h-96 w-96 rounded-full bg-chart-2/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-700">
              Simple and{" "}
              <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">transparent</span> pricing
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "100ms" }}>
              Choose the plan that fits your needs. Start free and upgrade when you're ready.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 md:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`group relative border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 ${
                  plan.popular ? "border-primary/50 ring-1 ring-primary/50 hover:border-primary" : "hover:border-primary/50"
                } animate-in fade-in slide-in-from-bottom-4 duration-700`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-chart-2 text-primary-foreground border-0 shadow-lg shadow-primary/25">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-foreground">{plan.name}</CardTitle>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-foreground">${plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-center gap-3 text-sm">
                        {feature.included ? (
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground/50" />
                        )}
                        <span className={feature.included ? "text-foreground" : "text-muted-foreground/50"}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "shadow-lg shadow-primary/25" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/contact" className="group">
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enterprise */}
          <div className="mt-12 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div>
                <h3 className="text-2xl font-bold text-foreground">Need a custom solution?</h3>
                <p className="mt-2 text-muted-foreground">
                  For large agencies and enterprises, we offer custom plans with dedicated features and support.
                </p>
              </div>
              <Button size="lg" variant="outline" className="shrink-0 bg-transparent" asChild>
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              Compare Plans
            </h2>
          </div>
          <div className="overflow-x-auto max-w-4xl mx-auto">
            <table className="w-full min-w-[500px] border-collapse">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="py-4 text-left text-sm font-medium text-muted-foreground">Feature</th>
                  <th className="py-4 text-center text-sm font-medium text-muted-foreground">Free</th>
                  <th className="py-4 text-center text-sm font-medium text-muted-foreground">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Number of clients", free: "3", premium: "Unlimited" },
                  { feature: "Data sources", free: "1", premium: "All" },
                  { feature: "PDF Export", free: "Basic", premium: "Professional" },
                  { feature: "AI Recommendations", free: false, premium: true },
                  { feature: "Custom branding", free: false, premium: true },
                  { feature: "Smart alerts", free: false, premium: true },
                  { feature: "Priority support", free: false, premium: true },
                ].map((row) => (
                  <tr key={row.feature} className="border-b border-border/50 transition-colors hover:bg-card/50">
                    <td className="py-4 text-sm text-foreground">{row.feature}</td>
                    <td className="py-4 text-center text-sm text-muted-foreground">
                      {typeof row.free === "boolean" ? (
                        row.free ? (
                          <CheckCircle2 className="mx-auto h-4 w-4 text-primary" />
                        ) : (
                          <X className="mx-auto h-4 w-4 text-muted-foreground/50" />
                        )
                      ) : (
                        row.free
                      )}
                    </td>
                    <td className="py-4 text-center text-sm text-muted-foreground">
                      {typeof row.premium === "boolean" ? (
                        row.premium ? (
                          <CheckCircle2 className="mx-auto h-4 w-4 text-primary" />
                        ) : (
                          <X className="mx-auto h-4 w-4 text-muted-foreground/50" />
                        )
                      ) : (
                        row.premium
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="grid gap-4">
              {faqs.map((faq, index) => (
                <div 
                  key={faq.question} 
                  className="group rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/50 hover:bg-card"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">{faq.question}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-primary/5 p-8 text-center md:p-16">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Start with the free plan and upgrade to Premium whenever you're ready.
            </p>
            <div className="mt-8">
              <Button size="lg" className="group shadow-lg shadow-primary/25" asChild>
                <Link href="/contact">
                  Start Free Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
