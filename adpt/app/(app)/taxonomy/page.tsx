'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { POLICIES_SEED } from '@/lib/policies-seed'

interface TaxNode { id: string; name: string; count: number; area?: string; children?: TaxNode[] }

const TAXONOMY: TaxNode[] = [
  { id: 'dg', name: 'Digital Governance', count: 28, children: [
    { id: 'dp', name: 'Data Protection', count: 34, area: 'Data Protection', children: [
      { id: 'pdp', name: 'Personal Data Processing', count: 28 },
      { id: 'dsr', name: 'Data Subject Rights', count: 22 },
      { id: 'cbt', name: 'Cross-Border Transfers', count: 14 },
    ]},
    { id: 'cy', name: 'Cybersecurity', count: 18, area: 'Cybersecurity', children: [
      { id: 'cii', name: 'Critical Infrastructure', count: 12 },
      { id: 'cc',  name: 'Cybercrime', count: 15 },
    ]},
    { id: 'ai', name: 'AI Governance', count: 8, area: 'Artificial Intelligence', children: [
      { id: 'aie', name: 'AI Ethics', count: 6 },
      { id: 'aa',  name: 'Algorithmic Accountability', count: 4 },
    ]},
  ]},
  { id: 'conn', name: 'Connectivity', count: 14, children: [
    { id: 'bb', name: 'Broadband', count: 8 },
    { id: '5g', name: '5G Networks', count: 5 },
  ]},
  { id: 'df', name: 'Digital Finance', count: 10, area: 'Digital Finance', children: [
    { id: 'cbdc', name: 'CBDC', count: 3 },
    { id: 'mm',   name: 'Mobile Money', count: 7 },
  ]},
]

function TreeItem({ node, depth = 0, selected, onSelect, expanded, onToggle }: {
  node: TaxNode; depth?: number; selected: string; onSelect: (id: string) => void
  expanded: Set<string>; onToggle: (id: string) => void
}) {
  const hasChildren = !!node.children?.length
  const isSelected = selected === node.id
  const isExpanded = expanded.has(node.id)

  return (
    <>
      <div
        className={`flex items-center gap-0.5 py-[7px] px-2.5 cursor-pointer transition-colors ${isSelected ? 'bg-accent-bg' : 'hover:bg-app-bg'}`}
        style={{ paddingLeft: `${10 + depth * 16}px` }}
        onClick={() => { onSelect(node.id); if (hasChildren) onToggle(node.id) }}
      >
        <span className="w-4 h-4 flex items-center justify-center text-[10px] text-text3 flex-shrink-0">
          {hasChildren ? (isExpanded ? '▾' : '▸') : ''}
        </span>
        <span className={`flex-1 text-[13px] ${isSelected ? 'text-primary font-bold' : 'text-text2'}`}>{node.name}</span>
        <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-accent text-white' : 'bg-app-bg text-text3'}`}>{node.count}</span>
      </div>
      {hasChildren && isExpanded && node.children!.map((child) => (
        <TreeItem key={child.id} node={child} depth={depth + 1} selected={selected} onSelect={onSelect} expanded={expanded} onToggle={onToggle} />
      ))}
    </>
  )
}

function findNode(nodes: TaxNode[], id: string): TaxNode | undefined {
  for (const n of nodes) {
    if (n.id === id) return n
    if (n.children) { const f = findNode(n.children, id); if (f) return f }
  }
}

export default function TaxonomyPage() {
  const [selected, setSelected] = useState('dp')
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['dg', 'conn', 'df']))

  const toggle = (id: string) => setExpanded((prev) => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  const node = findNode(TAXONOMY, selected)
  const relatedPolicies = node?.area
    ? POLICIES_SEED.filter((p) => p.area === node.area).slice(0, 5)
    : []

  return (
    <div className="pb-10 fade-up">
      <PageHeader title="Taxonomy Engine" subtitle="Hierarchical classification of Africa's digital policy landscape." />

      <div className="mx-8 mt-5 border border-border rounded-[10px] overflow-hidden bg-card flex" style={{ height: 'calc(100vh - 200px)' }}>
        {/* Tree */}
        <div className="w-[260px] flex-shrink-0 border-r border-border overflow-y-auto">
          <div className="px-3.5 py-3 border-b border-border2 text-[12px] font-semibold text-text2">Policy Taxonomy</div>
          {TAXONOMY.map((node) => (
            <TreeItem key={node.id} node={node} selected={selected} onSelect={setSelected} expanded={expanded} onToggle={toggle} />
          ))}
        </div>

        {/* Detail */}
        <div className="flex-1 overflow-y-auto p-6">
          {node ? (
            <>
              <div className="text-[22px] font-extrabold mb-1">{node.name}</div>
              <p className="text-[13.5px] text-text2 leading-relaxed mb-5">
                This taxonomy category covers {node.count} classified policies across Africa&apos;s digital governance landscape.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-app-bg border border-border2 rounded-[8px] p-4">
                  <div className="text-[10px] font-bold text-text3 uppercase tracking-widest mb-1">Policies Tagged</div>
                  <div className="text-[32px] font-extrabold">{node.count}</div>
                  <div className="text-[12px] text-text3 mt-0.5">across {node.count > 5 ? 15 : 5}+ countries</div>
                </div>
                <div className="bg-app-bg border border-border2 rounded-[8px] p-4">
                  <div className="text-[10px] font-bold text-text3 uppercase tracking-widest mb-2">Coverage by Status</div>
                  {[
                    { label: 'In Force', pct: 70 },
                    { label: 'Under Review', pct: 20 },
                    { label: 'Proposed', pct: 10 },
                  ].map((r) => (
                    <div key={r.label} className="mb-1.5">
                      <div className="flex justify-between text-[11px] mb-0.5">
                        <span className="text-text2">{r.label}</span>
                        <span className="font-bold">{r.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-border2 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${r.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {relatedPolicies.length > 0 && (
                <>
                  <div className="text-[13px] font-bold mb-3">Policies in this category</div>
                  <div className="space-y-2">
                    {relatedPolicies.map((p) => (
                      <div key={p.id} className="flex items-center gap-3 p-3 border border-border2 rounded-[8px]">
                        <div className="w-8 h-8 rounded-[7px] bg-app-bg border border-border flex items-center justify-center text-[11px] font-bold text-primary flex-shrink-0">
                          {p.country.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13.5px] font-semibold truncate">{p.title}</div>
                          <div className="text-[12px] text-text3 mt-0.5 flex items-center gap-2">
                            <span>{p.country}</span>
                            <span>·</span>
                            <span>{p.year}</span>
                          </div>
                        </div>
                        <StatusBadge status={p.status} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="text-text3 text-[13px]">Select a taxonomy node to view details.</div>
          )}
        </div>
      </div>
    </div>
  )
}
