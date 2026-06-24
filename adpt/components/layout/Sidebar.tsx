'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useGitHub } from '@/lib/queries'

const NAV = [
  {
    label: 'Overview',
    items: [{ href: '/dashboard', icon: '⊞', label: 'Dashboard' }],
  },
  {
    label: 'Explore',
    items: [
      { href: '/explorer',      icon: '◎', label: 'All Policies' },
      { href: '/countries',     icon: '🌍', label: 'Countries' },
      { href: '/policy-areas',  icon: '⊡', label: 'Policy Areas' },
      { href: '/trends',        icon: '↗', label: 'Trends' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { href: '/taxonomy',        icon: '⊞', label: 'Taxonomy Engine' },
      { href: '/oecd',            icon: '🌐', label: 'OECD Mapping' },
      { href: '/knowledge-graph', icon: '✦', label: 'Knowledge Graph' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { href: '/docs',    icon: '📄', label: 'Documentation' },
      { href: '/reports', icon: '📊', label: 'Reports' },
    ],
  },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { data: gh } = useGitHub()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen !== undefined && (
        <div
          className={cn(
            'fixed inset-0 bg-black/45 z-40 lg:hidden transition-opacity',
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          )}
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 h-full w-[220px] bg-card border-r border-border flex flex-col z-50',
          'transition-transform duration-[280ms] ease-[cubic-bezier(.4,0,.2,1)]',
          isOpen !== undefined
            ? isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            : 'translate-x-0'
        )}
      >
        {/* Close button (mobile) */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-md bg-app-bg border-none text-base flex items-center justify-center lg:hidden"
          >
            ✕
          </button>
        )}

        {/* Logo */}
        <div className="px-4 py-3.5 border-b border-border2 flex items-center gap-2.5 flex-shrink-0">
          <div className="w-[30px] h-[30px] rounded-[7px] bg-primary flex items-center justify-center flex-shrink-0">
            <svg width="17" height="17" viewBox="0 0 22 22" fill="none">
              <path d="M11 2L18 6.2V14.8L11 19L4 14.8V6.2L11 2Z" stroke="rgba(255,255,255,.85)" strokeWidth="1.5" fill="none" />
              <circle cx="11" cy="11" r="3" fill="rgba(255,255,255,.7)" />
            </svg>
          </div>
          <Link href="/" className="text-[11px] font-bold leading-[1.35] cursor-pointer hover:text-primary">
            Africa Digital<br />Policy Tracker
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-2 overflow-y-auto">
          {NAV.map((section) => (
            <div key={section.label} className="mb-1">
              <div className="px-4 pt-2 pb-0.5 text-[10px] font-bold text-text3 uppercase tracking-[.07em]">
                {section.label}
              </div>
              {section.items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-2 px-3 py-[7px] mx-2 rounded-[7px] text-[13px] font-medium transition-all',
                      active
                        ? 'bg-accent text-white font-semibold'
                        : 'text-text2 hover:bg-app-bg hover:text-text'
                    )}
                  >
                    <span className="text-[14px] w-[18px] text-center flex-shrink-0">{item.icon}</span>
                    {item.label}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-3.5 border-t border-border2 flex-shrink-0">
          <a
            href="https://github.com/cercuit-ola/Okediji-Africa-Digital-Policy-Tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2.5 border border-border rounded-[8px] text-[13px] font-semibold text-text w-full bg-card hover:bg-app-bg transition-all mb-2"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.2 11.39.6.1.82-.26.82-.57v-2.23c-3.01.55-3.79-.73-4.04-1.41-.13-.34-.72-1.41-1.23-1.7-.42-.22-1.02-.77-.01-.79.94-.01 1.62.87 1.84 1.23 1.08 1.81 2.8 1.3 3.5.99.1-.78.42-1.3.76-1.6-2.67-.3-5.46-1.33-5.46-5.92 0-1.3.46-2.38 1.23-3.22-.12-.3-.54-1.53.12-3.18 0 0 1.01-.31 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.44.38.81 1.1.81 2.22v3.29c0 .32.22.69.82.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Contribute on GitHub
          </a>
          <div className="text-[11px] text-text3 px-1 flex items-center gap-1">
            ⊙ MIT Licensed
            {gh && gh.stars > 0 && (
              <span className="ml-auto font-semibold">★ {gh.stars}</span>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
