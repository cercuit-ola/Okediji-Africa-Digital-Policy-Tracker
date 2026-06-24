'use client'

interface TopBarProps {
  onMenuOpen?: () => void
  onSearch?: (q: string) => void
}

export function TopBar({ onMenuOpen, onSearch }: TopBarProps) {
  return (
    <header className="h-[58px] bg-card border-b border-border flex items-center px-6 gap-3 flex-shrink-0 sticky top-0 z-30">
      {/* Hamburger — mobile only */}
      <button
        className="w-[34px] h-[34px] rounded-[7px] border border-border bg-card flex items-center justify-center text-base flex-shrink-0 lg:hidden"
        onClick={onMenuOpen}
      >
        ☰
      </button>

      {/* Search */}
      <div className="flex-1 max-w-[420px] relative">
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text3 text-[13px] pointer-events-none">🔍</span>
        <input
          type="text"
          placeholder="Search policies, countries, keywords..."
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full pl-8 pr-10 py-[7px] border border-border rounded-[7px] text-[13px] bg-app-bg text-text outline-none font-[inherit] focus:border-accent focus:bg-card placeholder:text-text3"
        />
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10.5px] text-text3 bg-border2 px-1.5 py-0.5 rounded pointer-events-none">
          ⌘K
        </span>
      </div>

      <div className="flex-1" />

      {/* Right actions */}
      <div className="relative">
        <div className="w-[34px] h-[34px] rounded-[7px] border border-border bg-card flex items-center justify-center text-[14px] cursor-pointer hover:bg-app-bg">
          🔔
        </div>
        <div className="absolute top-[6px] right-[7px] w-1.5 h-1.5 bg-red-500 rounded-full border-[1.5px] border-card" />
      </div>
      <div className="w-[34px] h-[34px] rounded-[7px] border border-border bg-card flex items-center justify-center text-[14px] cursor-pointer hover:bg-app-bg">
        ?
      </div>
      <div className="w-[34px] h-[34px] rounded-full bg-primary text-white flex items-center justify-center text-[12px] font-bold flex-shrink-0 cursor-pointer">
        AA
      </div>
    </header>
  )
}
