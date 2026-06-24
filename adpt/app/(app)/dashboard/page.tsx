import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { POLICIES_SEED } from '@/lib/policies-seed'
import { computeInsights } from '@/lib/insights'
import { AREA_COLORS } from '@/lib/utils'

const ins = computeInsights(POLICIES_SEED)

const LANDMARK_IDS = [11, 17, 20, 3, 5, 38]
const landmarks = LANDMARK_IDS.map((id) => POLICIES_SEED.find((p) => p.id === id)!).filter(Boolean)

const areaEntries = Object.entries(ins.byArea).sort((a, b) => b[1] - a[1])
const topCountries = Object.entries(ins.byCountry)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)

export default function DashboardPage() {
  const recent = [...POLICIES_SEED].sort((a, b) => b.year - a.year).slice(0, 6)

  return (
    <div className="pb-10 fade-up">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of digital policy activity across all 55 African Union member states."
      />

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3.5 px-8 mt-6 mb-5">
        <StatCard label="Policies Tracked" value={ins.total} iconBg="bg-green-50"
          icon={<svg viewBox="0 0 24 24" width="18" fill="none" stroke="#16a34a" strokeWidth="2"><path d="M4 20V12M8 20V8M12 20V14M16 20V6"/></svg>} />
        <StatCard label="In Force" value={ins.inForce} iconBg="bg-accent-bg"
          icon={<svg viewBox="0 0 24 24" width="18" fill="none" stroke="#17c9a4" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>} />
        <StatCard label="Countries Covered" value={ins.countries} iconBg="bg-blue-50"
          icon={<svg viewBox="0 0 24 24" width="18" fill="none" stroke="#2563eb" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20"/></svg>} />
        <StatCard label="Policy Areas" value={ins.areas} iconBg="bg-purple-50"
          icon={<svg viewBox="0 0 24 24" width="18" fill="none" stroke="#9333ea" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>} />
      </div>

      {/* Insights callout */}
      <div className="mx-8 mb-5 rounded-[10px] overflow-hidden" style={{ background: 'linear-gradient(135deg,#0d3b2c 0%,#1a5c3e 100%)' }}>
        <div className="grid grid-cols-4">
          {[
            { num: ins.total,             lbl: 'Policies Tracked',   delta: `+${ins.recentCount} since 2022` },
            { num: `${ins.inForce}`,      lbl: 'In Force',           delta: `${Math.round(ins.inForce/ins.total*100)}% of total` },
            { num: ins.countries,         lbl: 'Countries',          delta: `Across ${Object.keys(ins.byRegion).length} regions` },
            { num: ins.avgOecd.toFixed(2),lbl: 'Avg OECD Score',     delta: 'Inclusive Growth dim.' },
          ].map((item, i) => (
            <div key={i} className={`px-5 py-4 flex flex-col gap-1 ${i < 3 ? 'border-r border-white/10' : ''}`}>
              <div className="text-[28px] font-extrabold text-white leading-none">{item.num}</div>
              <div className="text-[11px] text-white/55 font-medium">{item.lbl}</div>
              <div className="text-[11px] text-accent font-semibold">{item.delta}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Landmark policies */}
      <div className="px-8 mb-5">
        <h2 className="text-[16px] font-extrabold mb-3">Landmark Policies</h2>
        <div className="grid grid-cols-3 gap-3">
          {landmarks.map((p) => {
            const color = AREA_COLORS[p.area] ?? '#0d3b2c'
            return (
              <div key={p.id} className="bg-card border border-border rounded-[10px] p-4 relative overflow-hidden cursor-pointer hover:border-accent hover:shadow-md transition-all"
                style={{ borderTop: `3px solid ${color}` }}>
                <span className="text-[18px] mb-2 block">{p.flag}</span>
                <div className="text-[11px] font-bold text-text3 uppercase tracking-widest mb-1.5">
                  {p.year} · <span style={{ color }}>{p.area}</span>
                </div>
                <div className="text-[13.5px] font-bold leading-snug mb-1.5">{p.title}</div>
                <p className="text-[12px] text-text2 leading-relaxed line-clamp-2">{p.summary}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent + Coverage */}
      <div className="grid grid-cols-[1.5fr_1fr] gap-3.5 px-8 mb-5">
        <div className="bg-card border border-border rounded-[10px] p-5">
          <div className="flex items-center justify-between mb-3.5">
            <div className="text-[14px] font-bold">Recent Policies</div>
            <span className="text-[12px] text-accent2 font-semibold cursor-pointer">View all →</span>
          </div>
          {recent.map((p) => (
            <div key={p.id} className="flex items-center gap-3 py-2.5 border-b border-border2 last:border-0">
              <span className="text-xl">{p.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold truncate">{p.title}</div>
                <div className="text-[12px] text-text3 mt-0.5">{p.country} · {p.year}</div>
              </div>
              <StatusBadge status={p.status} />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3.5">
          <div className="bg-card border border-border rounded-[10px] p-5 flex flex-col items-center justify-center text-center flex-1">
            <div className="text-[52px] font-extrabold text-primary leading-none">{ins.gdprAlignedPct}%</div>
            <div className="text-[13px] text-text2 mt-1.5">GDPR-Aligned Policies</div>
            <div className="w-full h-2 bg-border2 rounded-full overflow-hidden mt-3.5">
              <div className="h-full bg-accent rounded-full" style={{ width: `${ins.gdprAlignedPct}%` }} />
            </div>
          </div>

          <div className="bg-card border border-border rounded-[10px] p-5">
            <div className="text-[14px] font-bold mb-3">Top Countries</div>
            {topCountries.map(([country, count]) => (
              <div key={country} className="mb-2.5">
                <div className="flex justify-between mb-1">
                  <span className="text-[12.5px] font-semibold">{country}</span>
                  <span className="text-[12px] font-bold">{count}</span>
                </div>
                <div className="h-1.5 bg-border2 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${(count / topCountries[0][1]) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Area Breakdown */}
      <div className="px-8">
        <div className="bg-card border border-border rounded-[10px] p-5">
          <div className="text-[14px] font-bold mb-4">Policy Area Breakdown</div>
          <div className="flex flex-col gap-3">
            {areaEntries.map(([area, count]) => {
              const color = AREA_COLORS[area] ?? '#94a3b8'
              const pct = Math.round((count / ins.total) * 100)
              return (
                <div key={area} className="flex items-center gap-3">
                  <div className="w-[140px] text-[12.5px] font-semibold flex-shrink-0 truncate">{area}</div>
                  <div className="flex-1 h-2 bg-border2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                  </div>
                  <div className="text-[12px] font-bold text-text2 w-8 text-right">{count}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
