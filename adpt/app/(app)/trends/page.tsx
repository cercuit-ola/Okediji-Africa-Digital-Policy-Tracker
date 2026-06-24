'use client'

import { useState, useMemo } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { TrendsChart } from '@/components/charts/TrendsChart'
import { POLICIES_SEED } from '@/lib/policies-seed'
import { AREA_COLORS } from '@/lib/utils'

const KEY_AREAS = ['Data Protection', 'Cybersecurity', 'Artificial Intelligence', 'Digital Finance']

function buildCumulativeData(areaFilter: string) {
  const years = Array.from({ length: 17 }, (_, i) => 2007 + i) // 2007–2023
  const areas = areaFilter ? [areaFilter] : KEY_AREAS

  const cumulative: Record<string, number> = {}
  areas.forEach((a) => (cumulative[a] = 0))

  return years.map((year) => {
    const row: Record<string, number | string> = { year }
    areas.forEach((area) => {
      const newThisYear = POLICIES_SEED.filter((p) => p.year === year && p.area === area).length
      cumulative[area] = (cumulative[area] ?? 0) + newThisYear
      row[area] = cumulative[area]
    })
    return row
  })
}

export default function TrendsPage() {
  const [areaFilter, setAreaFilter] = useState('')

  const chartData = useMemo(() => buildCumulativeData(areaFilter), [areaFilter])
  const activeAreas = areaFilter ? [areaFilter] : KEY_AREAS

  // Status breakdown
  const statusCounts = {
    'In Force': POLICIES_SEED.filter((p) => p.status === 'in-force').length,
    'Under Review': POLICIES_SEED.filter((p) => p.status === 'under-review').length,
    'Proposed': POLICIES_SEED.filter((p) => p.status === 'proposed').length,
    'Under Consultation': POLICIES_SEED.filter((p) => p.status === 'under-consultation').length,
  }
  const maxStatus = Math.max(...Object.values(statusCounts))

  // Framework alignment
  const frameworks = [
    { name: 'GDPR (EU)',          count: POLICIES_SEED.filter((p) => p.closestFW?.includes('GDPR')).length },
    { name: 'Budapest Convention', count: POLICIES_SEED.filter((p) => p.closestFW?.includes('Budapest')).length },
    { name: 'OECD AI Principles', count: POLICIES_SEED.filter((p) => p.closestFW?.includes('OECD')).length },
    { name: 'FATF',               count: POLICIES_SEED.filter((p) => p.closestFW?.includes('FATF')).length },
    { name: 'BIS CBDC',           count: POLICIES_SEED.filter((p) => p.closestFW?.includes('BIS')).length },
  ]

  // Top tags
  const tagFreq: Record<string, number> = {}
  POLICIES_SEED.forEach((p) => p.tags?.forEach((t) => { tagFreq[t] = (tagFreq[t] ?? 0) + 1 }))
  const topTags = Object.entries(tagFreq).sort((a, b) => b[1] - a[1]).slice(0, 6)

  // Timeline dots
  const timelinePolicies = [...POLICIES_SEED]
    .filter((p) => p.year >= 2010 && KEY_AREAS.includes(p.area))
    .sort((a, b) => a.year - b.year)

  const [tooltip, setTooltip] = useState<{ p: typeof POLICIES_SEED[0]; x: number; y: number } | null>(null)

  return (
    <div className="pb-10 fade-up">
      <PageHeader title="Trends" subtitle="Policy enactment patterns and legislative momentum across Africa." />

      {/* Filter pills */}
      <div className="flex gap-2 px-8 mt-5 mb-4 flex-wrap">
        {['', ...KEY_AREAS].map((a) => (
          <button
            key={a || 'all'}
            onClick={() => setAreaFilter(a)}
            className={`px-3 py-1.5 rounded-full border text-[12px] font-semibold transition-all ${areaFilter === a ? 'text-white border-transparent' : 'bg-card border-border text-text2 hover:border-gray-400'}`}
            style={areaFilter === a ? { background: a ? AREA_COLORS[a] : '#0d3b2c' } : {}}
          >
            {a || 'All Areas'}
          </button>
        ))}
      </div>

      {/* Main chart */}
      <div className="mx-8 bg-card border border-border rounded-[10px] p-5 mb-4">
        <div className="flex items-start justify-between mb-1">
          <div>
            <div className="text-[14px] font-bold">Cumulative Policy Enactment</div>
            <div className="text-[12px] text-text3">2007 – 2023</div>
          </div>
          <div className="flex gap-3">
            {activeAreas.map((a) => (
              <div key={a} className="flex items-center gap-1.5 text-[12px] font-medium">
                <div className="w-2 h-2 rounded-full" style={{ background: AREA_COLORS[a] }} />
                {a}
              </div>
            ))}
          </div>
        </div>
        <TrendsChart data={chartData} areas={activeAreas} />
      </div>

      {/* Timeline */}
      <div className="mx-8 bg-card border border-border rounded-[10px] p-5 mb-4 overflow-x-auto">
        <div className="text-[14px] font-bold mb-4">Policy Timeline</div>
        <div className="relative" style={{ minWidth: 900, height: 120 }}>
          {/* Axis line */}
          <div className="absolute left-0 right-0 bg-border h-[3px] rounded" style={{ top: 60 }} />

          {/* Year ticks */}
          {[2010, 2013, 2016, 2019, 2022].map((yr) => {
            const pct = ((yr - 2010) / (2023 - 2010)) * 100
            return (
              <div key={yr} className="absolute flex flex-col items-center" style={{ left: `${pct}%`, top: 53 }}>
                <div className="w-px h-3.5 bg-border" />
                <div className="text-[10px] font-bold text-text3 mt-1">{yr}</div>
              </div>
            )
          })}

          {/* Dots */}
          {timelinePolicies.map((p, idx) => {
            const pct = ((p.year - 2010) / (2023 - 2010)) * 100
            const above = idx % 2 === 0
            const color = AREA_COLORS[p.area] ?? '#94a3b8'
            return (
              <div
                key={p.id}
                className="absolute flex flex-col items-center cursor-pointer"
                style={{ left: `${Math.min(pct + (idx % 3) * 0.5, 98)}%`, top: 60 }}
                onMouseEnter={(e) => setTooltip({ p, x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setTooltip(null)}
              >
                {above && <div className="text-[9px] font-semibold text-text2 whitespace-nowrap max-w-[80px] truncate text-center absolute" style={{ bottom: 'calc(100% + 6px)' }}>{p.country}</div>}
                <div className="w-3 h-3 rounded-full border-2 border-card" style={{ background: color, transform: 'translateY(-50%)' }} />
                {!above && <div className="text-[9px] font-semibold text-text2 whitespace-nowrap max-w-[80px] truncate text-center absolute" style={{ top: 'calc(100% + 6px)' }}>{p.country}</div>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 bg-primary text-white rounded-[8px] px-3.5 py-2.5 text-[12px] pointer-events-none max-w-[200px] shadow-lg"
          style={{ left: tooltip.x + 12, top: tooltip.y - 10 }}
        >
          <div className="font-bold text-[13px] mb-0.5">{tooltip.p.title}</div>
          <div className="text-white/70">{tooltip.p.country} · {tooltip.p.year}</div>
        </div>
      )}

      {/* Bottom 3-col */}
      <div className="grid grid-cols-3 gap-3.5 px-8">
        {/* Status breakdown */}
        <div className="bg-card border border-border rounded-[10px] p-5">
          <div className="text-[14px] font-bold mb-4">Status Breakdown</div>
          {Object.entries(statusCounts).map(([label, count]) => (
            <div key={label} className="mb-3">
              <div className="flex justify-between mb-1 text-[12.5px]">
                <span className="font-medium">{label}</span>
                <span className="font-bold">{count}</span>
              </div>
              <div className="h-2 bg-border2 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${(count / maxStatus) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Framework alignment */}
        <div className="bg-card border border-border rounded-[10px] p-5">
          <div className="text-[14px] font-bold mb-4">Global Framework Alignment</div>
          {frameworks.map(({ name, count }) => (
            <div key={name} className="mb-3">
              <div className="flex justify-between mb-1 text-[12.5px]">
                <span className="font-medium">{name}</span>
                <span className="font-bold">{count}</span>
              </div>
              <div className="h-2 bg-border2 rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: `${(count / POLICIES_SEED.length) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Top tags */}
        <div className="bg-card border border-border rounded-[10px] p-5">
          <div className="text-[14px] font-bold mb-4">Emerging Topics</div>
          <div className="space-y-2.5">
            {topTags.map(([tag, count], i) => (
              <div key={tag} className="flex items-center gap-3 bg-app-bg border border-border rounded-[8px] p-2.5">
                <span className="text-[12px] font-bold text-text3 w-5">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold truncate">{tag}</div>
                  <div className="text-[11.5px] text-text3">{count} policies</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
