/**
 * Feature flags and plan limits. Free vs Premium (manual only).
 * UI for disabled features remains visible but locked.
 */

export type PlanType = "free" | "premium"

export interface PlanFeatures {
  maxClients: number
  basicDashboard: boolean
  completeDashboard: boolean
  simplePdfExport: boolean
  professionalPdfExport: boolean
  maxDataSources: number
  aiRecommendations: boolean
  customBranding: boolean
  smartAlerts: boolean
  prioritySupport: boolean
}

const FREE_FEATURES: PlanFeatures = {
  maxClients: 3,
  basicDashboard: true,
  completeDashboard: false,
  simplePdfExport: true,
  professionalPdfExport: false,
  maxDataSources: 1,
  aiRecommendations: false,
  customBranding: false,
  smartAlerts: false,
  prioritySupport: false,
}

const PREMIUM_FEATURES: PlanFeatures = {
  maxClients: Infinity,
  basicDashboard: true,
  completeDashboard: true,
  simplePdfExport: true,
  professionalPdfExport: true,
  maxDataSources: Infinity,
  aiRecommendations: true,
  customBranding: true,
  smartAlerts: true,
  prioritySupport: true,
}

export function getPlanFeatures(plan: string | null | undefined): PlanFeatures {
  return plan === "premium" ? PREMIUM_FEATURES : FREE_FEATURES
}

export function isPremium(plan: string | null | undefined): boolean {
  return plan === "premium"
}

export function canAddClient(plan: string | null | undefined, currentCount: number): boolean {
  const features = getPlanFeatures(plan)
  return currentCount < features.maxClients
}
