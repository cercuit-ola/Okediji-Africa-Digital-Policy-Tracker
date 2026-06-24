import { useQuery } from '@tanstack/react-query'
import type { Policy, Insights, GitHubStats, WBCountryData } from '@/types'

const fetcher = <T>(url: string): Promise<T> =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`Fetch error ${r.status}: ${url}`)
    return r.json() as Promise<T>
  })

export const usePolicies = () =>
  useQuery<Policy[]>({
    queryKey: ['policies'],
    queryFn: () => fetcher<Policy[]>('/api/policies'),
  })

export const useInsights = () =>
  useQuery<Insights>({
    queryKey: ['insights'],
    queryFn: () => fetcher<Insights>('/api/insights'),
  })

export const useCountries = () =>
  useQuery<unknown[]>({
    queryKey: ['countries'],
    queryFn: () => fetcher<unknown[]>('/api/countries'),
  })

export const useGitHub = () =>
  useQuery<GitHubStats>({
    queryKey: ['github'],
    queryFn: () => fetcher<GitHubStats>('/api/github'),
    staleTime: 5 * 60_000,
  })

export const useWorldBank = (country: string) =>
  useQuery<WBCountryData>({
    queryKey: ['worldbank', country],
    queryFn: () => fetcher<WBCountryData>(`/api/worldbank/${encodeURIComponent(country)}`),
    enabled: !!country,
  })
