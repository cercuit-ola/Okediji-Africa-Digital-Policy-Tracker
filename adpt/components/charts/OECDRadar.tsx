'use client'

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { OECD_DIMENSIONS } from '@/lib/utils'

interface OECDRadarProps {
  policies: Array<{ title: string; oecd: number[]; color: string }>
}

export function OECDRadar({ policies }: OECDRadarProps) {
  const data = OECD_DIMENSIONS.map((dim, i) => {
    const row: Record<string, string | number> = { dimension: dim }
    policies.forEach((p) => {
      row[p.title] = Math.round((p.oecd[i] ?? 0) * 100)
    })
    return row
  })

  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
        <PolarGrid stroke="#e5e9e7" />
        <PolarAngleAxis
          dataKey="dimension"
          tick={{ fontSize: 11, fill: '#4b5563' }}
        />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#9ca3af' }} />
        {policies.map((p) => (
          <Radar
            key={p.title}
            name={p.title}
            dataKey={p.title}
            stroke={p.color}
            fill={p.color}
            fillOpacity={0.15}
            strokeWidth={2}
          />
        ))}
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Tooltip formatter={(v) => [`${v}%`]} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
