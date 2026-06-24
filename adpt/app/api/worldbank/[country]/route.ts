import { NextResponse } from 'next/server'
import { ISO3_MAP } from '@/lib/utils'

export const revalidate = 3600

const INDICATORS = {
  internetPenetration: 'IT.NET.USER.ZS',
  mobileCoverage: 'IT.CEL.SETS.P2',
  broadband: 'IT.NET.BBND.P2',
  gdpPerCapita: 'NY.GDP.PCAP.CD',
}

async function fetchIndicator(iso3: string, indicator: string) {
  const url = `https://api.worldbank.org/v2/country/${iso3}/indicator/${indicator}?format=json&mrv=5`
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const json = await res.json()
    const rows: Array<{ date: string; value: number | null }> = json?.[1] ?? []
    return rows
      .filter((r) => r.value !== null)
      .map((r) => ({ year: r.date, value: r.value }))
  } catch {
    return []
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ country: string }> }
) {
  const { country } = await params
  const iso3 = ISO3_MAP[country]

  if (!iso3) {
    return NextResponse.json({
      internetPenetration: [],
      mobileCoverage: [],
      broadband: [],
      gdpPerCapita: [],
    })
  }

  const [internetPenetration, mobileCoverage, broadband, gdpPerCapita] =
    await Promise.all([
      fetchIndicator(iso3, INDICATORS.internetPenetration),
      fetchIndicator(iso3, INDICATORS.mobileCoverage),
      fetchIndicator(iso3, INDICATORS.broadband),
      fetchIndicator(iso3, INDICATORS.gdpPerCapita),
    ])

  return NextResponse.json({ internetPenetration, mobileCoverage, broadband, gdpPerCapita })
}
