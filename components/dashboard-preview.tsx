"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  Users,
  MousePointerClick,
  Search,
  Share2,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

const trafficData = [
  { month: "Jan", visitors: 2400 },
  { month: "Feb", visitors: 1398 },
  { month: "Mar", visitors: 3800 },
  { month: "Apr", visitors: 3908 },
  { month: "May", visitors: 4800 },
  { month: "Jun", visitors: 5200 },
]

const conversionData = [
  { month: "Jan", rate: 2.1 },
  { month: "Feb", rate: 2.8 },
  { month: "Mar", rate: 3.2 },
  { month: "Apr", rate: 3.5 },
  { month: "May", rate: 4.1 },
  { month: "Jun", rate: 4.8 },
]

const seoData = [
  { keyword: "digital marketing", position: 3 },
  { keyword: "SEO agency", position: 7 },
  { keyword: "website audit", position: 2 },
  { keyword: "digital consultant", position: 12 },
  { keyword: "web strategy", position: 5 },
]

const socialData = [
  { platform: "LinkedIn", engagement: 4200 },
  { platform: "Twitter", engagement: 2800 },
  { platform: "Facebook", engagement: 1900 },
  { platform: "Instagram", engagement: 3100 },
]

export function DashboardPreview() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-4 md:p-6 shadow-2xl">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Client: TechStartup Inc.</h3>
          <p className="text-sm text-muted-foreground">Industry: B2B SaaS | Last audit: Jan 15, 2026</p>
        </div>
        <Badge className="w-fit bg-primary/20 text-primary hover:bg-primary/30 border-0">
          Complete Audit
        </Badge>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card className="border-border/50 bg-secondary/50 backdrop-blur-sm transition-all hover:bg-secondary hover:shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Monthly Traffic</p>
                <p className="text-2xl font-bold text-foreground">5,200</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-1/20">
                <Users className="h-5 w-5 text-chart-1" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-chart-1">
              <TrendingUp className="h-3 w-3" />
              <span>+8.3% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-secondary/50 backdrop-blur-sm transition-all hover:bg-secondary hover:shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold text-foreground">4.8%</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-2/20">
                <MousePointerClick className="h-5 w-5 text-chart-2" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-chart-1">
              <TrendingUp className="h-3 w-3" />
              <span>+17% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-secondary/50 backdrop-blur-sm transition-all hover:bg-secondary hover:shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg. SEO Position</p>
                <p className="text-2xl font-bold text-foreground">5.8</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-3/20">
                <Search className="h-5 w-5 text-chart-3" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-chart-1">
              <TrendingUp className="h-3 w-3" />
              <span>+3 positions</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-secondary/50 backdrop-blur-sm transition-all hover:bg-secondary hover:shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Social Engagement</p>
                <p className="text-2xl font-bold text-foreground">12K</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-4/20">
                <Share2 className="h-5 w-5 text-chart-4" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-destructive">
              <TrendingDown className="h-3 w-3" />
              <span>-2.1% vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <Card className="border-border/50 bg-secondary/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Traffic Evolution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }}
                    labelStyle={{ color: 'var(--foreground)' }}
                  />
                  <Area type="monotone" dataKey="visitors" stroke="var(--chart-1)" fill="url(#colorVisitors)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-secondary/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversionData}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }}
                    labelStyle={{ color: 'var(--foreground)' }}
                    formatter={(value) => [`${value}%`, 'Conversion']}
                  />
                  <Line type="monotone" dataKey="rate" stroke="var(--chart-2)" strokeWidth={2} dot={{ fill: 'var(--chart-2)', strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-secondary/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">SEO Rankings by Keyword</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={seoData} layout="vertical">
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} domain={[0, 20]} reversed />
                  <YAxis type="category" dataKey="keyword" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }} width={100} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }}
                    labelStyle={{ color: 'var(--foreground)' }}
                    formatter={(value) => [`Position ${value}`, 'Ranking']}
                  />
                  <Bar dataKey="position" fill="var(--chart-3)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-secondary/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Social Media Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={socialData}>
                  <XAxis dataKey="platform" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }}
                    labelStyle={{ color: 'var(--foreground)' }}
                  />
                  <Bar dataKey="engagement" fill="var(--chart-4)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50 bg-secondary/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground">
              <CheckCircle2 className="h-4 w-4 text-chart-1" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-chart-1" />
                Excellent organic traffic growth
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-chart-1" />
                Conversion rate above industry average
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-chart-1" />
                3 keywords in Google top 5
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-secondary/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground">
              <AlertTriangle className="h-4 w-4 text-chart-5" />
              Areas to Improve
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-chart-5" />
                Social media engagement declining
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-chart-5" />
                Mobile load time needs optimization
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-chart-5" />
                High bounce rate on product pages
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-secondary/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Lightbulb className="h-4 w-4 text-chart-2" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-chart-2" />
                Add "digital consultant" keyword to services page
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-chart-2" />
                Post 2 LinkedIn articles/week to boost engagement
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-chart-2" />
                Optimize images to reduce load time
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
