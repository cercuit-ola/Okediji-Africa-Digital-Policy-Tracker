import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  icon?: ReactNode
  iconBg?: string
  change?: string
  changeDir?: 'up' | 'down'
  className?: string
}

export function StatCard({ label, value, icon, iconBg = 'bg-accent-bg', change, changeDir, className }: StatCardProps) {
  return (
    <div className={cn('bg-card border border-border rounded-[10px] p-[18px] flex items-start justify-between transition-all hover:border-accent hover:shadow-sm', className)}>
      <div>
        <div className="text-[28px] font-extrabold leading-none mb-1">{value}</div>
        <div className="text-[12px] text-text3 font-medium">{label}</div>
        {change && (
          <div className={cn('text-[11.5px] font-semibold mt-1', changeDir === 'up' ? 'text-green-600' : 'text-red-500')}>
            {changeDir === 'up' ? '↑' : '↓'} {change}
          </div>
        )}
      </div>
      {icon && (
        <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', iconBg)}>
          {icon}
        </div>
      )}
    </div>
  )
}
