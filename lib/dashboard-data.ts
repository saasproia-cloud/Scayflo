export const defaultTrafficData = [
  { month: "Jan", visitors: 2400, conversions: 120 },
  { month: "Feb", visitors: 1398, conversions: 98 },
  { month: "Mar", visitors: 3800, conversions: 180 },
  { month: "Apr", visitors: 3908, conversions: 220 },
  { month: "May", visitors: 4800, conversions: 280 },
  { month: "Jun", visitors: 5200, conversions: 340 },
]

export const defaultChannelData = [
  { name: "Organic", value: 45, color: "var(--chart-1)" },
  { name: "Direct", value: 25, color: "var(--chart-2)" },
  { name: "Referral", value: 15, color: "var(--chart-3)" },
  { name: "Social", value: 15, color: "var(--chart-4)" },
]

export const defaultSeoData = [
  { keyword: "digital marketing", position: 3, change: 2 },
  { keyword: "SEO agency NYC", position: 7, change: -1 },
  { keyword: "website audit", position: 2, change: 3 },
  { keyword: "digital consultant", position: 12, change: 5 },
  { keyword: "web strategy", position: 5, change: 0 },
]

export const defaultSocialData = [
  { platform: "LinkedIn", followers: 4200, engagement: 5.2 },
  { platform: "Twitter", followers: 2800, engagement: 3.1 },
  { platform: "Facebook", followers: 1900, engagement: 2.8 },
  { platform: "Instagram", followers: 3100, engagement: 4.5 },
]

export const defaultRecommendations = [
  { type: "seo", title: "Optimize Services page", description: "Add 'digital consultant' keyword to H1 and first 100 words.", impact: "high" },
  { type: "content", title: "Post more on LinkedIn", description: "Increase from 1 to 3 posts per week to boost engagement by 40%.", impact: "medium" },
  { type: "technical", title: "Optimize images", description: "Compress homepage images to gain 2s of load time.", impact: "high" },
  { type: "ads", title: "Adjust Google Ads budget", description: "Reallocate 20% of budget to higher ROI keywords.", impact: "medium" },
]

export const defaultKpis = [
  { label: "Monthly Traffic", value: "5,200", change: "+8.3%", up: true, color: "chart-1" },
  { label: "Conversion Rate", value: "4.8%", change: "+17%", up: true, color: "chart-2" },
  { label: "Avg. SEO Position", value: "5.8", change: "+3 pos", up: true, color: "chart-3" },
  { label: "Social Engagement", value: "12K", change: "-2.1%", up: false, color: "chart-4" },
]

export interface DashboardDataJson {
  trafficData: typeof defaultTrafficData
  channelData: typeof defaultChannelData
  seoData: typeof defaultSeoData
  socialData: typeof defaultSocialData
  recommendations: typeof defaultRecommendations
  kpis: typeof defaultKpis
}

export const defaultDashboardData: DashboardDataJson = {
  trafficData: defaultTrafficData,
  channelData: defaultChannelData,
  seoData: defaultSeoData,
  socialData: defaultSocialData,
  recommendations: defaultRecommendations,
  kpis: defaultKpis,
}

export function parseDashboardData(json: string | null): DashboardDataJson {
  if (!json) return defaultDashboardData
  try {
    const parsed = JSON.parse(json) as Partial<DashboardDataJson>
    return {
      trafficData: parsed.trafficData ?? defaultTrafficData,
      channelData: parsed.channelData ?? defaultChannelData,
      seoData: parsed.seoData ?? defaultSeoData,
      socialData: parsed.socialData ?? defaultSocialData,
      recommendations: parsed.recommendations ?? defaultRecommendations,
      kpis: parsed.kpis ?? defaultKpis,
    }
  } catch {
    return defaultDashboardData
  }
}
