'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { OECDRadar } from '@/components/charts/OECDRadar'
import { POLICIES_SEED } from '@/lib/policies-seed'
import { AREA_COLORS, OECD_DIMENSIONS } from '@/lib/utils'
import { cn } from '@/lib/utils'

const PALETTE = ['#0d3b2c', '#17c9a4', '#6366f1', '#f59e0b', '#ec4899']

export default function OECDPage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([1, 5, 12])
  const [search, setSearch] = useState('')

  const filtered = POLICIES_SEED.filter((p) =>
    !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.country.toLowerCase().includes(search.toLowerCase())
  )

  const selected = selectedIds
    .map((id, i) => {
      const p = POLICIES_SEED.find((x) => x.id === id)
      return p ? { title: p.country + ': ' + p.title.slice(0, 30) + '…', oecd: p.oecd, color: PALETTE[i % PALETTE.length], policy: p } : null
    })
    .filter(Boolean) as { title: string; oecd: number[]; color: string; policy: typeof POLICIES_SEED[0] }[]

  const togglePolicy = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 5 ? [...prev, id] : prev
    )
  }

  return (
    <div className="pb-10 fade-up">
      <PageHeader title="OECD Mapping" subtitle="Compare policies against the 5 OECD AI Principles dimensions." />

      <div className="grid grid-cols-[280px_1fr] gap-4 px-8 mt-5 items-start">
        {/* Left: policy selector */}
        <div className="flex flex-col gap-3">
          <div className="bg-card border border-border rounded-[10px] p-4">
            <div className="text-[13px] font-bold mb-2">Select Policies (max 5)</div>
            <input
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-border rounded-[7px] text-[12px] bg-app-bg outline-none focus:border-accent mb-3 font-[inherit]"
            />
            <div className="space-y-1.5 max-h-[480px] overflow-y-auto pr-1">
              {filtered.map((p) => {
                const idx = selectedIds.indexOf(p.id)
                const isSel = idx !== -1
                const avgScore = Math.round((p.oecd?.reduce((a, b) => a + b, 0) / (p.oecd?.length || 1)) * 100)
                return (
                  <div
                    key={p.id}
                    onClick={() => togglePolicy(p.id)}
                    className={cn(
                      'border rounded-[8px] p-2.5 cursor-pointer transition-all',
                      isSel ? 'border-primary bg-accent-bg' : 'border-border hover:border-accent'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {isSel && <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: PALETTE[idx % PALETTE.length] }} />}
                      <span className="text-[13px] font-bold flex-1 leading-snug line-clamp-1">{p.country}: {p.title.slice(0, 25)}…</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-text3">
                      <span>{p.year}</span>
                      <span>·</span>
                      <span>Avg: <strong className={avgScore >= 80 ? 'text-green-600' : avgScore >= 60 ? 'text-amber-600' : 'text-red-500'}>{avgScore}%</strong></span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right: radar + table */}
        <div className="flex flex-col gap-4">
          <div className="bg-card border border-border rounded-[10px] p-5">
            <div className="text-[16px] font-extrabold mb-0.5">OECD AI Principles Comparison</div>
            <div className="text-[12.5px] text-text3 mb-4">Scores normalised 0–100% per dimension</div>
            {selected.length > 0 ? (
              <OECDRadar policies={selected.map((s) => ({ title: s.title, oecd: s.oecd, color: s.color }))} />
            ) : (
              <div className="h-[200px] flex items-center justify-center text-text3 text-[13px]">
                Select at least one policy from the left panel.
              </div>
            )}
            {/* Legend */}
            <div className="flex gap-4 mt-3 flex-wrap">
              {selected.map((s) => (
                <div key={s.title} className="flex items-center gap-1.5 text-[12px]">
                  <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                  <span className="font-medium">{s.policy.country}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Score table */}
          {selected.length > 0 && (
            <div className="bg-card border border-border rounded-[10px] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div className="text-[14px] font-bold">Dimension Scores</div>
              </div>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-2.5 text-[10px] font-bold text-text3 uppercase tracking-wide border-b border-border">
                      OECD Principle
                    </th>
                    {selected.map((s) => (
                      <th key={s.title} className="text-left px-4 py-2.5 text-[10px] font-bold border-b border-border uppercase tracking-wide">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                          {s.policy.country}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {OECD_DIMENSIONS.map((dim, i) => (
                    <tr key={dim} className="hover:bg-app-bg">
                      <td className="px-4 py-3 text-[12.5px] font-semibold border-b border-border2">{dim}</td>
                      {selected.map((s) => {
                        const val = Math.round((s.oecd?.[i] ?? 0) * 100)
                        return (
                          <td key={s.title} className="px-4 py-3 border-b border-border2">
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-border2 rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${val}%`, background: s.color }} />
                              </div>
                              <span className={`text-[11px] font-bold ${val >= 80 ? 'text-green-600' : val >= 60 ? 'text-amber-600' : 'text-red-500'}`}>{val}%</span>
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
