import { NextResponse } from 'next/server'
import { fetchPolicies } from '@/lib/supabase'
import { POLICIES_SEED } from '@/lib/policies-seed'
import { computeInsights } from '@/lib/insights'

export const revalidate = 3600

export async function GET() {
  try {
    const policies = await fetchPolicies()
    return NextResponse.json(computeInsights(policies))
  } catch {
    return NextResponse.json(computeInsights(POLICIES_SEED))
  }
}
