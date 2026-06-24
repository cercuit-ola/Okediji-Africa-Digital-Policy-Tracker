'use client'

import { useState, useMemo } from 'react'
import { PolicyCard } from '@/components/ui/PolicyCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { OECDRadar } from '@/components/charts/OECDRadar'
import { POLICIES_SEED } from '@/lib/policies-seed'
import { AREA_COLORS, OECD_DIMENSIONS } from '@/lib/utils'
import type { Policy } from '@/types'

const AREAS = [...new Set(POLICIES_SEED.map((p) => p.area))].sort()
const STATUSES = ['in-force', 'under-review', 'under-consultation', 'proposed']

type Tab = 'overview' | 'taxonomy' | 'oecd' | 'comparators'

export default function ExplorerPage() {
  const [selected, setSelected] = useState<Policy>(POLICIES_SEED[0])
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [filterArea, setFilterArea] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return POLICIES_SEED.filter((p) => {
      if (filterArea && p.area !== filterArea) return false
      if (filterStatus && p.status !== filterStatus) return false
      if (q && ![p.title, p.country, p.area, p.summary].some((f) => f?.toLowerCase().includes(q))) return false
      return true
    })
  }, [filterArea, filterStatus, search])

  const related = POLICIES_SEED.filter(
    (p) => p.area === selected.area && p.id !== selected.id
  ).slice(0, 3)

  const comparators = POLICIES_SEED.filter(
    (p) => p.closestFW === selected.closestFW && p.id !== selected.id
  ).slice(0, 3)

  const accentColor = AREA_COLORS[selected.area] ?? '#0d3b2c'

  return (
    <div className="flex flex-col h-full">
      {/* Filters bar */}
      <div className="px-8 pt-5 pb-0">
        <h1 className="text-[28px] font-extrabold tracking-tight mb-4">All Policies</h1>
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <button
            onClick={() => setFilterArea('')}
            className={`px-3 py-1.5 rounded-[7px] text-[13px] font-medium border transition-all ${!filterArea ? 'bg-primary text-white border-primary' : 'bg-card border-border text-text2 hover:border-gray-400'}`}
          >
            All
          </button>
          {AREAS.map((a) => (
            <button
              key={a}
              onClick={() => setFilterArea(filterArea === a ? '' : a)}
              className={`px-3 py-1.5 rounded-[7px] text-[13px] font-medium border transition-all ${filterArea === a ? 'text-white border-transparent' : 'bg-card border-border text-text2 hover:border-gray-400'}`}
              style={filterArea === a ? { background: AREA_COLORS[a] } : {}}
            >
              {a}
            </button>
          ))}
          <div className="flex-1" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 border border-border rounded-[7px] text-[13px] bg-card text-text font-[inherit] outline-none"
          >
            <option value="">All Statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <input
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1.5 border border-border rounded-[7px] text-[13px] bg-app-bg text-text font-[inherit] outline-none focus:border-accent w-44"
          />
          <span className="text-[13px] font-semibold text-text2">{filtered.length} results</span>
        </div>
      </div>

      {/* Two-pane layout */}
      <div className="flex mx-8 mb-6 border border-border rounded-[10px] overflow-hidden bg-card flex-1 min-h-0">
        {/* Left list */}
        <div className="w-[360px] flex-shrink-0 border-r border-border flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {filtered.map((p) => (
              <PolicyCard
                key={p.id}
                policy={p}
                selected={selected.id === p.id}
                onClick={() => { setSelected(p); setActiveTab('overview') }}
              />
            ))}
            {filtered.length === 0 && (
              <div className="p-8 text-center text-text3 text-[13px]">No policies match your filters.</div>
            )}
          </div>
        </div>

        {/* Right detail */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Header */}
          <div className="px-6 pt-5 pb-0 border-b border-border2 sticky top-0 bg-card z-10">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <div className="text-[20px] font-extrabold leading-snug">{selected.title}</div>
                <div className="text-[12px] text-text3 mt-0.5">Last updated: {selected.updated ?? selected.enacted}</div>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-primary text-white text-[13px] font-semibold rounded-[7px] flex-shrink-0">
                ↓ Download
              </button>
            </div>
            <div className="flex items-center gap-3.5 text-[12px] text-text2 mb-3 flex-wrap">
              <span className="flex items-center gap-1">{selected.flag} {selected.country}</span>
              <span className="flex items-center gap-1">📅 {selected.year}</span>
              <span className="flex items-center gap-1">🏛 {selected.instrument}</span>
              <StatusBadge status={selected.status} />
            </div>
            {/* Tabs */}
            <div className="flex">
              {(['overview', 'taxonomy', 'oecd', 'comparators'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-[13px] font-medium border-b-2 transition-all capitalize ${activeTab === tab ? 'text-primary border-primary font-semibold' : 'text-text3 border-transparent hover:text-text'}`}
                >
                  {tab === 'oecd' ? 'OECD Mapping' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-6 flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { lbl: 'What Is It?',          val: selected.summary },
                    { lbl: 'Who Does It Affect?',  val: selected.whoAffects },
                    { lbl: 'What Does It Demand?', val: selected.demand },
                  ].map((box) => (
                    <div key={box.lbl} className="bg-app-bg border border-border2 rounded-[8px] p-3.5">
                      <div className="text-[9.5px] font-bold text-text3 uppercase tracking-widest mb-2">{box.lbl}</div>
                      <p className="text-[12.5px] text-text leading-relaxed">{box.val}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-app-bg border border-border2 rounded-[8px] p-3.5">
                  <div className="text-[9.5px] font-bold text-text3 uppercase tracking-widest mb-2">Key Obligations</div>
                  <p className="text-[13px] text-text">{selected.keyObs}</p>
                </div>

                {related.length > 0 && (
                  <div>
                    <div className="text-[13px] font-bold mb-2.5">Related Policies</div>
                    <div className="space-y-2">
                      {related.map((r) => (
                        <div
                          key={r.id}
                          onClick={() => setSelected(r)}
                          className="flex items-center gap-3 p-3 bg-app-bg border border-border2 rounded-[8px] cursor-pointer hover:border-accent transition-all"
                        >
                          <span className="text-xl">{r.flag}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold truncate">{r.title}</div>
                            <div className="text-[11.5px] text-text3 mt-0.5">{r.country} · {r.year}</div>
                          </div>
                          <StatusBadge status={r.status} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'taxonomy' && (
              <div className="space-y-4">
                <div className="bg-app-bg border border-border2 rounded-[8px] p-4">
                  <div className="text-[10px] font-bold text-text3 uppercase tracking-widest mb-3">Classification</div>
                  <div className="flex flex-wrap gap-2">
                    {selected.tags?.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-card border border-border rounded-[6px] text-[12px] font-medium text-text2">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-app-bg border border-border2 rounded-[8px] p-3.5">
                    <div className="text-[10px] font-bold text-text3 uppercase tracking-widest mb-2">Primary Area</div>
                    <div className="text-[14px] font-bold" style={{ color: accentColor }}>{selected.area}</div>
                  </div>
                  <div className="bg-app-bg border border-border2 rounded-[8px] p-3.5">
                    <div className="text-[10px] font-bold text-text3 uppercase tracking-widest mb-2">Instrument Type</div>
                    <div className="text-[14px] font-bold">{selected.instrument}</div>
                  </div>
                  <div className="bg-app-bg border border-border2 rounded-[8px] p-3.5">
                    <div className="text-[10px] font-bold text-text3 uppercase tracking-widest mb-2">Sector Impact</div>
                    <div className="text-[13px] font-semibold">{selected.sectorImpact}</div>
                  </div>
                  <div className="bg-app-bg border border-border2 rounded-[8px] p-3.5">
                    <div className="text-[10px] font-bold text-text3 uppercase tracking-widest mb-2">Authority</div>
                    <div className="text-[13px] font-semibold">{selected.authority}</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'oecd' && (
              <div className="space-y-4">
                <OECDRadar policies={[{ title: selected.title, oecd: selected.oecd ?? [], color: accentColor }]} />
                <div className="space-y-2.5">
                  {OECD_DIMENSIONS.map((dim, i) => {
                    const val = (selected.oecd?.[i] ?? 0) * 100
                    return (
                      <div key={dim}>
                        <div className="flex justify-between mb-1">
                          <span className="text-[12.5px] font-semibold">{dim}</span>
                          <span className={`text-[12px] font-bold ${val >= 80 ? 'text-green-600' : val >= 60 ? 'text-amber-600' : 'text-red-500'}`}>{Math.round(val)}%</span>
                        </div>
                        <div className="h-2 bg-border2 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${val}%`, background: accentColor }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {activeTab === 'comparators' && (
              <div className="space-y-4">
                <div className="bg-app-bg border border-border2 rounded-[8px] p-4">
                  <div className="text-[10px] font-bold text-text3 uppercase tracking-widest mb-2">Closest Global Framework</div>
                  <div className="text-[15px] font-bold text-primary">{selected.closestFW}</div>
                  <div className="text-[12px] text-text2 mt-1">Similarity: <strong>{selected.simLevel}</strong></div>
                </div>
                {comparators.length > 0 && (
                  <div>
                    <div className="text-[13px] font-bold mb-2.5">Policies using the same framework</div>
                    <div className="space-y-2">
                      {comparators.map((r) => (
                        <div
                          key={r.id}
                          onClick={() => setSelected(r)}
                          className="flex items-center gap-3 p-3 bg-app-bg border border-border2 rounded-[8px] cursor-pointer hover:border-accent transition-all"
                        >
                          <span className="text-xl">{r.flag}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold truncate">{r.title}</div>
                            <div className="text-[11.5px] text-text3 mt-0.5">{r.country} · {r.year}</div>
                          </div>
                          <span className="text-[11px] font-semibold text-text2 flex-shrink-0">{r.simLevel}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
