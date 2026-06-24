'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { AREA_COLORS } from '@/lib/utils'

interface TrendsChartProps {
  data: Array<Record<string, number | string>>
  areas: string[]
}

export function TrendsChart({ data, areas }: TrendsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e9e7" />
        <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#9ca3af' }} />
        <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} allowDecimals={false} />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 7, border: '1px solid #e5e9e7' }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {areas.map((area) => (
          <Line
            key={area}
            type="monotone"
            dataKey={area}
            stroke={AREA_COLORS[area] ?? '#9ca3af'}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
