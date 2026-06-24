'use client'

import { useState } from 'react'
import { useWorldBank } from '@/lib/queries'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { PageHeader } from '@/components/ui/PageHeader'
import { POLICIES_SEED } from '@/lib/policies-seed'
import type { Policy } from '@/types'

// Build unique country data from seed
const countryMap = new Map<string, { flag: string; region: string; group: string; policies: Policy[] }>()
for (const p of POLICIES_SEED) {
  if (p.country === 'ECOWAS' || p.country === 'African Union') continue
  if (!countryMap.has(p.country)) {
    countryMap.set(p.country, { flag: p.flag, region: p.region, group: p.group, policies: [] })
  }
  countryMap.get(p.country)!.policies.push(p)
}
const COUNTRIES = [...countryMap.entries()].sort((a, b) => b[1].policies.length - a[1].policies.length)

function WBPanel({ country }: { country: string }) {
  const { data, isLoading } = useWorldBank(country)

  if (isLoading) {
    return (
      <div className="mt-3 pt-3 border-t border-border2 space-y-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-3 bg-border2 rounded animate-pulse" />
        ))}
      </div>
    )
  }

  if (!data) return null

  const indicators = [
    { label: 'Internet', values: data.internetPenetration, unit: '%' },
    { label: 'Mobile', values: data.mobileCoverage, unit: '/100' },
    { label: 'Broadband', values: data.broadband, unit: '/100' },
  ]

  const latestGDP = data.gdpPerCapita[0]?.value

  return (
    <div className="mt-3 pt-3 border-t border-border2">
      {latestGDP && (
        <div className="text-[11px] text-text3 mb-2">
          GDP/capita: <strong className="text-text2">${latestGDP.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
        </div>
      )}
      {indicators.map(({ label, values, unit }) => {
        const latest = values[0]
        if (!latest?.value) return null
        const pct = unit === '%' ? latest.value : Math.min(latest.value, 100)
        return (
          <div key={label} className="mb-2">
            <div className="flex justify-between text-[11px] mb-0.5">
              <span className="text-text3">{label}</span>
              <span className="font-semibold text-text2">{Math.round(latest.value)}{unit}</span>
            </div>
            <div className="h-1.5 bg-border2 rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: `${Math.min(pct, 100)}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function CountriesPage() {
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null)

  return (
    <div className="pb-10 fade-up">
      <PageHeader title="Countries" subtitle="Digital policy coverage across African Union member states." />

      <div className="grid grid-cols-4 gap-3.5 px-8 mt-6">
        {COUNTRIES.map(([country, info]) => {
          const inForce = info.policies.filter((p) => p.status === 'in-force').length
          const isExpanded = expandedCountry === country

          return (
            <div
              key={country}
              className="bg-card border border-border rounded-[10px] p-[18px] cursor-pointer transition-all hover:border-accent hover:shadow-md"
              onClick={() => setExpandedCountry(isExpanded ? null : country)}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-[28px]">{info.flag}</span>
                <span className="text-[11px] font-semibold text-text3 bg-border2 px-2 py-0.5 rounded-full">{info.group}</span>
              </div>
              <div className="text-[16px] font-extrabold mb-0.5">{country}</div>
              <div className="text-[12px] text-text3 mb-3">{info.region}</div>
              <div className="border-t border-border2 pt-3 flex items-end justify-between">
                <div>
                  <div className="text-[22px] font-extrabold">{info.policies.length}</div>
                  <div className="text-[11px] text-text3 font-medium">Policies</div>
                </div>
                <div className="text-right">
                  <div className="text-[14px] font-bold text-green-600">{inForce}</div>
                  <div className="text-[11px] text-text3">In Force</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {[...new Set(info.policies.map((p) => p.status))].map((s) => (
                  <StatusBadge key={s} status={s} className="text-[10px] px-1.5 py-0" />
                ))}
              </div>

              {isExpanded && <WBPanel country={country} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
