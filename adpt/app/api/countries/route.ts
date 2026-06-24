import { NextResponse } from 'next/server'

export const revalidate = 3600

export async function GET() {
  try {
    const res = await fetch('https://restcountries.com/v3.1/region/africa', {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('REST countries fetch failed')
    const raw = await res.json()
    const data = raw.map((c: Record<string, unknown>) => ({
      name: (c.name as Record<string, string>),
      flags: (c.flags as Record<string, string>),
      population: c.population,
      capital: c.capital,
      languages: c.languages,
      subregion: c.subregion,
      cca2: c.cca2,
      cca3: c.cca3,
    }))
    return NextResponse.json(data)
  } catch {
    return NextResponse.json([])
  }
}
