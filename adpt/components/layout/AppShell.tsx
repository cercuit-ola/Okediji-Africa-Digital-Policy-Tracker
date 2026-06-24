'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area — offset by sidebar width on desktop */}
      <div className="flex flex-col flex-1 lg:ml-[220px] min-w-0">
        <TopBar onMenuOpen={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-app-bg">
          {children}
        </main>
      </div>
    </div>
  )
}
