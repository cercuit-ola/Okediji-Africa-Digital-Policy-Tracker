import { NextResponse } from 'next/server'

export const revalidate = 3600

const REPO = 'cercuit-ola/Okediji-Africa-Digital-Policy-Tracker'

export async function GET() {
  const token = process.env.GITHUB_TOKEN
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  try {
    const [repoRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${REPO}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/repos/${REPO}/contributors?per_page=100`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ])

    const repo = await repoRes.json()
    const contributors = contribRes.ok ? await contribRes.json() : []

    return NextResponse.json({
      stars: repo.stargazers_count ?? 0,
      forks: repo.forks_count ?? 0,
      openIssues: repo.open_issues_count ?? 0,
      updatedAt: repo.updated_at ?? null,
      contributors: Array.isArray(contributors) ? contributors.length : 0,
    })
  } catch {
    return NextResponse.json({ stars: 0, forks: 0, openIssues: 0, updatedAt: null, contributors: 0 })
  }
}
