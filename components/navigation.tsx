"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Menu, X, BarChart3, LogOut, LayoutDashboard } from "lucide-react"

interface AuthUser {
  id: string
  email: string
  name: string
  role?: string
  company: { id: string; name: string; plan: string } | null
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user ?? null)
        setAuthChecked(true)
      })
      .catch(() => setAuthChecked(true))
  }, [])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
    router.push("/")
    router.refresh()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25 transition-transform group-hover:scale-105">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">AuditPro</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="/pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Pricing
          </Link>
          <Link href="/dashboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Dashboard
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Contact
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {authChecked && (
            user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="bg-transparent hover:bg-secondary gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    {user.company?.name ?? user.name}
                  </Button>
                </Link>
                {user.role === "admin" && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm" className="bg-transparent hover:bg-secondary">
                      Admin
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" className="bg-transparent hover:bg-secondary" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="bg-transparent hover:bg-secondary" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" className="shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30" asChild>
                  <Link href="/signup">Start Free</Link>
                </Button>
              </>
            )
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl px-6 py-4 md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4">
            <Link href="/features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              {authChecked && (
                user ? (
                  <>
                    <span className="text-sm text-muted-foreground">{user.company?.name ?? user.email}</span>
                    {user.role === "admin" && (
                      <Link href="/admin">
                        <Button variant="outline" size="sm" className="w-full">Admin</Button>
                      </Link>
                    )}
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" className="bg-transparent" asChild>
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/signup">Start Free</Link>
                    </Button>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
