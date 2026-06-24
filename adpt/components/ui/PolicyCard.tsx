import { cn, AREA_COLORS } from '@/lib/utils'
import { StatusBadge } from './StatusBadge'
import type { Policy } from '@/types'

interface PolicyCardProps {
  policy: Policy
  selected?: boolean
  onClick?: () => void
}

export function PolicyCard({ policy, selected, onClick }: PolicyCardProps) {
  const accentColor = AREA_COLORS[policy.area] ?? '#0d3b2c'

  return (
    <div
      onClick={onClick}
      className={cn(
        'px-4 py-3.5 border-b border-border2 cursor-pointer transition-colors border-l-[3px]',
        selected
          ? 'bg-accent-bg border-l-accent'
          : 'border-l-transparent hover:bg-[#fafcfb]'
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <span className="text-[17px] flex-shrink-0">{policy.flag}</span>
        <span className={cn('text-[13.5px] font-bold flex-1 leading-snug', selected && 'text-primary')}>
          {policy.title}
        </span>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <StatusBadge status={policy.status} />
        <span className="text-[11.5px] text-text3">
          <span className="text-text2 font-medium">{policy.country}</span>
          {' · '}
          <span style={{ color: accentColor }} className="font-medium">{policy.area}</span>
          {' · '}
          {policy.year}
        </span>
      </div>
    </div>
  )
}
