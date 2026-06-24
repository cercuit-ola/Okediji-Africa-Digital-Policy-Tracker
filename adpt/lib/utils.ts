import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { PolicyStatus, PolicyArea } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const STATUS_LABELS: Record<PolicyStatus, string> = {
  'in-force': 'In Force',
  'under-review': 'Under Review',
  'under-consultation': 'Under Consultation',
  'proposed': 'Proposed',
}

export const STATUS_COLORS: Record<PolicyStatus, string> = {
  'in-force': 'bg-green-100 text-green-700',
  'under-review': 'bg-yellow-100 text-yellow-700',
  'under-consultation': 'bg-orange-100 text-orange-700',
  'proposed': 'bg-blue-100 text-blue-700',
}

export const AREA_COLORS: Record<string, string> = {
  'Data Protection': '#0d3b2c',
  'Artificial Intelligence': '#17c9a4',
  'Cybersecurity': '#f59e0b',
  'Digital Finance': '#6366f1',
  'Digital Economy': '#ec4899',
  'Digital Infrastructure': '#94a3b8',
  'Telecommunications': '#0ea5e9',
  'Digital Identity': '#8b5cf6',
}

export const AREA_BG: Record<string, string> = {
  'Data Protection': 'bg-emerald-50 text-emerald-800 border-emerald-200',
  'Artificial Intelligence': 'bg-teal-50 text-teal-800 border-teal-200',
  'Cybersecurity': 'bg-amber-50 text-amber-800 border-amber-200',
  'Digital Finance': 'bg-indigo-50 text-indigo-800 border-indigo-200',
  'Digital Economy': 'bg-pink-50 text-pink-800 border-pink-200',
  'Digital Infrastructure': 'bg-slate-50 text-slate-700 border-slate-200',
}

export const OECD_DIMENSIONS = [
  'Inclusive Growth',
  'Fairness & Non-Discrimination',
  'Transparency & Explainability',
  'Robustness & Safety',
  'Accountability',
]

export const ISO3_MAP: Record<string, string> = {
  Nigeria: 'NGA',
  Kenya: 'KEN',
  Ghana: 'GHA',
  Rwanda: 'RWA',
  'South Africa': 'ZAF',
  Ethiopia: 'ETH',
  Tanzania: 'TZA',
  Uganda: 'UGA',
  Senegal: 'SEN',
  Mauritius: 'MUS',
  Egypt: 'EGY',
  Morocco: 'MAR',
  Tunisia: 'TUN',
  Cameroon: 'CMR',
  'Côte d\'Ivoire': 'CIV',
  Mozambique: 'MOZ',
  Zambia: 'ZMB',
  Zimbabwe: 'ZWE',
  Botswana: 'BWA',
  Namibia: 'NAM',
  'Burkina Faso': 'BFA',
  Mali: 'MLI',
  Niger: 'NER',
  Chad: 'TCD',
  Benin: 'BEN',
  Togo: 'TGO',
  'Guinea-Bissau': 'GNB',
  'Sierra Leone': 'SLE',
  Liberia: 'LBR',
  Malawi: 'MWI',
  Somalia: 'SOM',
  Sudan: 'SDN',
  Angola: 'AGO',
  'Democratic Republic of Congo': 'COD',
  'Republic of Congo': 'COG',
  Gabon: 'GAB',
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K'
  return n.toString()
}

export function pctColor(pct: number): string {
  if (pct >= 70) return 'text-green-600'
  if (pct >= 40) return 'text-amber-600'
  return 'text-red-500'
}
