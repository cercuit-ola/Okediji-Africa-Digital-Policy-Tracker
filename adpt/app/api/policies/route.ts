import { NextResponse } from 'next/server'
import { fetchPolicies } from '@/lib/supabase'
import { POLICIES_SEED } from '@/lib/policies-seed'

export const revalidate = 3600

export async function GET() {
  try {
    const data = await fetchPolicies()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(POLICIES_SEED)
  }
}
