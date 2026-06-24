import { cn } from '@/lib/utils'
import type { PolicyStatus } from '@/types'

const MAP: Record<PolicyStatus, { label: string; cls: string }> = {
  'in-force':             { label: 'In Force',             cls: 'bg-green-100 text-green-700' },
  'under-review':         { label: 'Under Review',         cls: 'bg-yellow-100 text-yellow-700' },
  'under-consultation':   { label: 'Under Consultation',   cls: 'bg-orange-100 text-orange-700' },
  'proposed':             { label: 'Proposed',             cls: 'bg-blue-100 text-blue-700' },
}

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const cfg = MAP[status as PolicyStatus] ?? { label: status, cls: 'bg-gray-100 text-gray-600' }
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold whitespace-nowrap', cfg.cls, className)}>
      {cfg.label}
    </span>
  )
}
