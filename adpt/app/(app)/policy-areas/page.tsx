import { PageHeader } from '@/components/ui/PageHeader'
import { POLICIES_SEED } from '@/lib/policies-seed'
import { AREA_COLORS } from '@/lib/utils'

const AREA_META: Record<string, { icon: string; desc: string }> = {
  'Data Protection':      { icon: '🛡️', desc: 'Laws, regulations and policies governing the collection, processing, storage and transfer of personal data.' },
  'Artificial Intelligence': { icon: '🤖', desc: 'National AI strategies, ethics frameworks and governance policies for responsible AI development.' },
  'Cybersecurity':        { icon: '🔒', desc: 'Legislation and frameworks protecting digital infrastructure and combating cybercrime.' },
  'Digital Finance':      { icon: '💳', desc: 'Mobile money, CBDC, fintech regulations and digital payment frameworks.' },
  'Digital Economy':      { icon: '📊', desc: 'Strategies and laws enabling e-commerce, digital transformation and internet governance.' },
  'Digital Infrastructure': { icon: '🌐', desc: 'Broadband plans, spectrum policies and telecoms regulation enabling connectivity.' },
}

export default function PolicyAreasPage() {
  const areaStats = Object.keys(AREA_META).map((area) => {
    const policies = POLICIES_SEED.filter((p) => p.area === area)
    const enacted = policies.filter((p) => p.status === 'in-force').length
    const draft = policies.filter((p) => p.status !== 'in-force').length
    const countries = [...new Set(policies.map((p) => p.country))].filter(
      (c) => c !== 'ECOWAS' && c !== 'African Union'
    )
    const topCountries = Object.entries(
      policies.reduce<Record<string, number>>((acc, p) => {
        acc[p.country] = (acc[p.country] ?? 0) + 1
        return acc
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)

    const tags = [...new Set(policies.flatMap((p) => p.tags ?? []))].slice(0, 5)

    return { area, policies, enacted, draft, countries: countries.length, topCountries, tags }
  })

  return (
    <div className="pb-10 fade-up">
      <PageHeader title="Policy Areas" subtitle="Explore digital policy themes tracked across Africa." />

      <div className="grid grid-cols-3 gap-4 px-8 mt-6">
        {areaStats.map(({ area, enacted, draft, countries, topCountries, tags }) => {
          const meta = AREA_META[area] ?? { icon: '📋', desc: '' }
          const color = AREA_COLORS[area] ?? '#0d3b2c'

          return (
            <div
              key={area}
              className="bg-card border border-border rounded-[10px] p-5 cursor-pointer transition-all hover:border-accent hover:shadow-md"
              style={{ borderTop: `3px solid ${color}` }}
            >
              <div className="flex items-start justify-between mb-3.5">
                <div className="w-[42px] h-[42px] rounded-[9px] bg-app-bg border border-border flex items-center justify-center text-[20px] flex-shrink-0">
                  {meta.icon}
                </div>
                <span className="text-[11px] font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>
              </div>

              <div className="text-[16px] font-extrabold mb-2">{area}</div>
              <p className="text-[12.5px] text-text2 leading-relaxed mb-4">{meta.desc}</p>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-app-bg border border-border2 rounded-[7px] p-2.5">
                  <div className="text-[9.5px] font-bold text-text3 uppercase tracking-widest mb-1">Enacted</div>
                  <div className="text-[20px] font-extrabold">{enacted}</div>
                </div>
                <div className="bg-app-bg border border-border2 rounded-[7px] p-2.5">
                  <div className="text-[9.5px] font-bold text-text3 uppercase tracking-widest mb-1">In Review</div>
                  <div className="text-[20px] font-extrabold">{draft}</div>
                </div>
              </div>

              <div className="border-t border-border2 pt-3 mb-3">
                <div className="text-[11px] font-bold text-text3 mb-2">Top Countries</div>
                <div className="flex flex-col gap-1">
                  {topCountries.map(([c, n]) => (
                    <div key={c} className="flex justify-between text-[12px]">
                      <span className="text-text2 font-medium">{c}</span>
                      <span className="font-bold">{n}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-app-bg border border-border rounded text-[11.5px] font-medium text-text2">{t}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
