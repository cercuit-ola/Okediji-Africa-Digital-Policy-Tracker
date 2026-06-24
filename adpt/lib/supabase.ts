import { createClient } from '@supabase/supabase-js'
import type { Policy } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ── Server-side admin client (for API routes) ─────────────────────────────
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
export const supabaseAdmin = serviceKey
  ? createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })
  : supabase

// ── Typed helpers ──────────────────────────────────────────────────────────
export async function fetchPolicies(): Promise<Policy[]> {
  const { data, error } = await supabaseAdmin
    .from('policies')
    .select('*')
    .order('year', { ascending: false })

  if (error) throw new Error(error.message)
  return (data ?? []) as Policy[]
}

export async function fetchPolicyById(id: number): Promise<Policy | null> {
  const { data, error } = await supabaseAdmin
    .from('policies')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data as Policy
}

export async function searchPolicies(query: string): Promise<Policy[]> {
  const { data, error } = await supabaseAdmin
    .from('policies')
    .select('*')
    .or(
      `title.ilike.%${query}%,country.ilike.%${query}%,area.ilike.%${query}%,summary.ilike.%${query}%`
    )
    .order('year', { ascending: false })

  if (error) throw new Error(error.message)
  return (data ?? []) as Policy[]
}
