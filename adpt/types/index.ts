export type PolicyStatus = 'in-force' | 'under-review' | 'under-consultation' | 'proposed'
export type SimLevel = 'Very High' | 'High' | 'Medium' | 'Low'
export type PolicyArea =
  | 'Data Protection'
  | 'Cybersecurity'
  | 'Artificial Intelligence'
  | 'Digital Finance'
  | 'Digital Economy'
  | 'Digital Infrastructure'
  | 'Telecommunications'
  | 'Digital Identity'

export interface Policy {
  id: number
  title: string
  country: string
  flag: string
  region: string
  group: string
  year: number
  status: PolicyStatus
  area: PolicyArea | string
  instrument: string
  act: string
  enacted: string
  inForce: string
  authority: string
  closestFW: string
  simLevel: SimLevel | string
  oecd: number[]          // float[5] — OECD AI Principles scores
  summary: string
  tags: string[]
  whoAffects: string
  sectorImpact: string
  demand: string
  keyObs: string
  areas?: string[]
  updated?: string
}

// ── World Bank ──────────────────────────────────────────────────────────────
export interface WBIndicatorValue {
  year: string
  value: number | null
}

export interface WBCountryData {
  internetPenetration: WBIndicatorValue[]
  mobileCoverage: WBIndicatorValue[]
  broadband: WBIndicatorValue[]
  gdpPerCapita: WBIndicatorValue[]
}

// ── REST Countries ─────────────────────────────────────────────────────────
export interface RESTCountry {
  name: { common: string; official: string }
  flags: { png: string; svg: string; alt?: string }
  population: number
  capital: string[]
  languages: Record<string, string>
  subregion: string
  cca2: string
  cca3: string
}

// ── GitHub ─────────────────────────────────────────────────────────────────
export interface GitHubStats {
  stars: number
  forks: number
  openIssues: number
  updatedAt: string
  contributors: number
}

// ── Insights ───────────────────────────────────────────────────────────────
export interface InsightsByKey {
  [key: string]: number
}

export interface Insights {
  total: number
  inForce: number
  countries: number
  areas: number
  byStatus: InsightsByKey
  byArea: InsightsByKey
  byCountry: InsightsByKey
  byRegion: InsightsByKey
  byYear: InsightsByKey
  gdprAligned: number
  gdprAlignedPct: number
  recentCount: number
  avgOecd: number
}

// ── Taxonomy ───────────────────────────────────────────────────────────────
export interface TaxonomyNode {
  id: string
  name: string
  count: number
  children?: TaxonomyNode[]
}
