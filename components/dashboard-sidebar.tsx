"use client"

import Link from "next/link"
import {
  Building2,
  LayoutDashboard,
  Users,
  FileText,
  Bell,
  Settings,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

type DashboardSection = "dashboard" | "clients" | "reports" | "alerts" | "settings"

interface DashboardSidebarProps {
  companyName?: string
  plan?: string
  current: DashboardSection
  showAlertsBadge?: boolean
}

export function DashboardSidebar({
  companyName = "My Agency",
  plan = "Premium",
  current,
  showAlertsBadge = false,
}: DashboardSidebarProps) {
  const linkClass = (section: DashboardSection) =>
    current === section
      ? "flex w-full items-center gap-3 rounded-xl bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition-all"
      : "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"

  return (
    <aside className="fixed left-0 top-[121px] bottom-0 w-64 border-r border-border/50 bg-card/50 backdrop-blur-sm p-4 hidden lg:block">
      <div className="mb-6">
        <div className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3 transition-all hover:bg-secondary">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{companyName}</p>
            <p className="text-xs text-muted-foreground">{plan} Plan</p>
          </div>
        </div>
      </div>

      <nav className="space-y-1">
        <Link href="/dashboard" className={linkClass("dashboard")}>
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>
        <Link href="/dashboard/clients" className={linkClass("clients")}>
          <Users className="h-4 w-4" />
          Clients
        </Link>
        <Link href="/dashboard/reports" className={linkClass("reports")}>
          <FileText className="h-4 w-4" />
          Reports
        </Link>
        <Link href="/dashboard/alerts" className={linkClass("alerts")}>
          <Bell className="h-4 w-4" />
          Alerts
          {showAlertsBadge && (
            <Badge className="ml-auto bg-destructive text-destructive-foreground text-xs">3</Badge>
          )}
        </Link>
        <Link href="/dashboard/settings" className={linkClass("settings")}>
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </nav>
    </aside>
  )
}
