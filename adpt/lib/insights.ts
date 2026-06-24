import type { Policy, Insights } from '@/types'

export function computeInsights(policies: Policy[]): Insights {
  const byStatus: Record<string, number> = {}
  const byArea: Record<string, number> = {}
  const byCountry: Record<string, number> = {}
  const byRegion: Record<string, number> = {}
  const byYear: Record<string, number> = {}

  let inForce = 0
  let gdprAligned = 0
  let oecdSum = 0

  for (const p of policies) {
    byStatus[p.status] = (byStatus[p.status] ?? 0) + 1
    byArea[p.area] = (byArea[p.area] ?? 0) + 1
    byCountry[p.country] = (byCountry[p.country] ?? 0) + 1
    byRegion[p.region] = (byRegion[p.region] ?? 0) + 1
    byYear[String(p.year)] = (byYear[String(p.year)] ?? 0) + 1

    if (p.status === 'in-force') inForce++
    if (p.closestFW?.toLowerCase().includes('gdpr')) gdprAligned++
    if (p.oecd?.length) oecdSum += p.oecd[0]
  }

  const total = policies.length
  const countries = Object.keys(byCountry).length
  const areas = Object.keys(byArea).length
  const recentCount = policies.filter((p) => p.year >= 2022).length

  return {
    total,
    inForce,
    countries,
    areas,
    byStatus,
    byArea,
    byCountry,
    byRegion,
    byYear,
    gdprAligned,
    gdprAlignedPct: total ? Math.round((gdprAligned / total) * 100) : 0,
    recentCount,
    avgOecd: total ? Math.round((oecdSum / total) * 100) / 100 : 0,
  }
}
