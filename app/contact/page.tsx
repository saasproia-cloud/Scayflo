"use client"

import React from "react"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { SettingsPanel } from "@/components/settings-panel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Clock,
  Users,
  Zap,
} from "lucide-react"

const benefits = [
  {
    icon: Clock,
    title: "Personalized Demo",
    description: "30 minutes to discover all the features tailored to your needs.",
  },
  {
    icon: Users,
    title: "Guided Onboarding",
    description: "Our team will help you get started with the platform.",
  },
  {
    icon: Zap,
    title: "Extended Free Trial",
    description: "Request a demo and get 30 days free trial instead of 14.",
  },
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    demoRequest: false,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")
    setSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          company: formState.company || undefined,
          phone: formState.phone || undefined,
          message: formState.message,
          demoRequest: formState.demoRequest,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setSubmitError(data.error ?? "Une erreur est survenue.")
        return
      }
      setIsSubmitted(true)
    } catch {
      setSubmitError("Une erreur est survenue. Réessayez.")
    } finally {
      setSubmitting(false)
    }
  }

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
              Contact us or{" "}
              <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">request a demo</span>
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "100ms" }}>
              Our team is here to answer your questions and help you discover Scayflo.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 md:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="animate-in fade-in slide-in-from-left-4 duration-700">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 md:p-8">
                  {isSubmitted ? (
                    <div className="flex flex-col items-center py-12 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
                        <CheckCircle2 className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-foreground">Message sent!</h3>
                      <p className="text-muted-foreground">
                        Thank you for your message. Our team will respond within 24 hours.
                      </p>
                      <Button
                        className="mt-6 bg-transparent"
                        variant="outline"
                        onClick={() => {
                          setIsSubmitted(false)
                          setFormState({
                            name: "",
                            email: "",
                            company: "",
                            phone: "",
                            message: "",
                            demoRequest: false,
                          })
                        }}
                      >
                        Send another message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {submitError && (
                        <p className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">
                          {submitError}
                        </p>
                      )}
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-foreground">Full name *</Label>
                          <Input
                            id="name"
                            required
                            placeholder="John Smith"
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="border-border/50 bg-secondary/50 focus:border-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-foreground">Work email *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            placeholder="john@agency.com"
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className="border-border/50 bg-secondary/50 focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-foreground">Company name</Label>
                          <Input
                            id="company"
                            placeholder="XYZ Agency"
                            value={formState.company}
                            onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                            className="border-border/50 bg-secondary/50 focus:border-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-foreground">Phone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={formState.phone}
                            onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                            className="border-border/50 bg-secondary/50 focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-foreground">Your message *</Label>
                        <Textarea
                          id="message"
                          required
                          placeholder="How can we help you? Tell us about your needs..."
                          rows={5}
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          className="border-border/50 bg-secondary/50 focus:border-primary"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="demo"
                          checked={formState.demoRequest}
                          onChange={(e) => setFormState({ ...formState, demoRequest: e.target.checked })}
                          className="h-4 w-4 rounded border-border/50 bg-secondary/50 accent-primary"
                        />
                        <Label htmlFor="demo" className="cursor-pointer text-sm text-muted-foreground">
                          I would also like to schedule a personalized demo
                        </Label>
                      </div>

                      <Button type="submit" size="lg" className="w-full group shadow-lg shadow-primary/25" disabled={submitting}>
                        {submitting ? "Sending..." : "Send message"}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Info & Benefits */}
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700" style={{ animationDelay: "100ms" }}>
              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Get in touch</h2>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: "Email", value: "hello@scayflo.io" },
                    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                    { icon: MapPin, label: "Address", value: "123 Market Street, San Francisco, CA 94102" },
                    { icon: Calendar, label: "Hours", value: "Mon - Fri: 9am - 6pm EST" },
                  ].map((item) => (
                    <div key={item.label} className="group flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 transition-transform group-hover:scale-110">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="text-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demo Benefits */}
              <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
                <h3 className="mb-4 text-lg font-semibold text-foreground">Why request a demo?</h3>
                <div className="space-y-4">
                  {benefits.map((benefit) => (
                    <div key={benefit.title} className="group flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 transition-transform group-hover:scale-110">
                        <benefit.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 text-center transition-all hover:border-primary/50 hover:bg-card">
                  <p className="text-2xl font-bold text-primary">24h</p>
                  <p className="text-sm text-muted-foreground">Average response time</p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 text-center transition-all hover:border-primary/50 hover:bg-card">
                  <p className="text-2xl font-bold text-primary">98%</p>
                  <p className="text-sm text-muted-foreground">Customer satisfaction</p>
                </div>
              </div>
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
