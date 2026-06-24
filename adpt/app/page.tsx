import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#e5e9e7] h-16 flex items-center px-8 gap-0">
        <Link href="/" className="flex items-center gap-2.5 mr-9 flex-shrink-0 cursor-pointer">
          <div className="w-[34px] h-[34px] rounded-[7px] bg-primary flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
              <path d="M11 2L18 6.2V14.8L11 19L4 14.8V6.2L11 2Z" stroke="rgba(255,255,255,.85)" strokeWidth="1.5" fill="none" />
              <circle cx="11" cy="11" r="3" fill="rgba(255,255,255,.7)" />
            </svg>
          </div>
          <div className="text-[11.5px] font-bold leading-[1.3]">Africa Digital<br />Policy Tracker</div>
        </Link>
        <div className="flex items-center gap-0.5 flex-1">
          {[['Explore', '/explorer'], ['Countries', '/countries'], ['Policy Areas', '/policy-areas'], ['Taxonomy', '/taxonomy'], ['API', '/docs'], ['About', '/']].map(([label, href]) => (
            <Link key={label} href={href} className="px-3 py-[7px] rounded-[6px] text-[14px] font-medium text-[#4b5563] hover:text-[#111827] hover:bg-[#f4f7f5] transition-all">
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href="https://github.com/cercuit-ola/Okediji-Africa-Digital-Policy-Tracker" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 border border-[#e5e9e7] rounded-[7px] bg-white text-[13.5px] font-medium hover:bg-[#f4f7f5] transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.2 11.39.6.1.82-.26.82-.57v-2.23c-3.01.55-3.79-.73-4.04-1.41-.13-.34-.72-1.41-1.23-1.7-.42-.22-1.02-.77-.01-.79.94-.01 1.62.87 1.84 1.23 1.08 1.81 2.8 1.3 3.5.99.1-.78.42-1.3.76-1.6-2.67-.3-5.46-1.33-5.46-5.92 0-1.3.46-2.38 1.23-3.22-.12-.3-.54-1.53.12-3.18 0 0 1.01-.31 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.44.38.81 1.1.81 2.22v3.29c0 .32.22.69.82.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            Star on GitHub
          </a>
          <Link href="/explorer" className="flex items-center px-[18px] py-2 border-none rounded-[7px] bg-primary text-[13.5px] font-semibold text-white hover:bg-primary-dark transition-colors">
            Open Source
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-[1180px] mx-auto px-8 py-[52px] grid grid-cols-[1fr_460px] gap-8 items-center">
        <div>
          {/* Live badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#f0faf5] border border-[#c6ead8] text-[12.5px] mb-5 cursor-pointer">
            <div className="w-1.5 h-1.5 bg-accent2 rounded-full blink flex-shrink-0" />
            <strong className="text-[12px] font-bold tracking-wide text-primary">LIVE</strong>
            <span className="text-[#1a5c3e]">&nbsp;Monitoring digital policy across all <span className="underline font-medium">55 African Union member states</span></span>
          </div>

          <h1 className="text-[52px] font-extrabold leading-[1.07] tracking-[-0.02em] text-[#111827] mb-5">
            Africa&apos;s Digital<br />Policy Intelligence<br />
            <span className="text-accent2">Infrastructure</span>
          </h1>

          <p className="text-[15px] text-[#4b5563] leading-[1.7] mb-7 max-w-[460px]">
            We track, classify and analyse laws, regulations and policy initiatives on AI, data protection, cybersecurity, digital finance and more — across Africa.
          </p>

          {/* Stats */}
          <div className="flex border border-[#e5e9e7] rounded-[10px] overflow-hidden w-fit mb-7">
            {[
              { n: '2,451', l: 'Policies\nTracked' },
              { n: '55',    l: 'AU Member\nStates' },
              { n: '28',    l: 'Policy\nAreas' },
              { n: '7',     l: 'Data\nSources' },
            ].map((s, i) => (
              <div key={i} className={`flex items-center gap-2.5 px-5 py-3.5 bg-white ${i < 3 ? 'border-r border-[#e5e9e7]' : ''}`}>
                <div>
                  <div className="text-[20px] font-extrabold leading-none">{s.n}</div>
                  <div className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-[.07em] mt-0.5 whitespace-pre-line leading-[1.2]">{s.l}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-2.5 mb-8 flex-wrap">
            <Link href="/explorer" className="flex items-center gap-1 px-[22px] py-[11px] bg-primary text-white border-none rounded-[8px] text-[14.5px] font-bold hover:bg-primary-dark transition-colors">
              Explore Policies &nbsp;→
            </Link>
            <Link href="/dashboard" className="flex items-center gap-1 px-[18px] py-[10px] border-[1.5px] border-[#e5e9e7] rounded-[8px] bg-white text-[14px] font-semibold hover:border-primary hover:text-primary hover:bg-[#f0faf5] transition-all">
              View Dashboard
            </Link>
            <button className="flex items-center gap-1 px-[18px] py-[10px] border-[1.5px] border-[#e5e9e7] rounded-[8px] bg-white text-[14px] font-semibold hover:border-primary hover:text-primary transition-all">
              &lt;/&gt;&nbsp; API Documentation
            </button>
          </div>

          {/* Built for */}
          <div className="flex items-center gap-4 flex-wrap pt-2.5 border-t border-[#e5e9e7]">
            <span className="text-[13px] text-[#9ca3af] font-medium">Built for:</span>
            <div className="flex gap-4 flex-wrap">
              {['🔬 Researchers', '🏛️ Policymakers', '📰 Journalists', '🤝 Civil Society', '🏢 Businesses'].map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-[13px] font-medium text-[#4b5563]">{b}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Globe */}
        <div className="w-[460px] h-[460px] flex-shrink-0">
          <div className="w-[460px] h-[460px] rounded-full overflow-hidden relative shadow-[0_28px_80px_rgba(0,0,0,.3)]"
            style={{ background: 'radial-gradient(ellipse at 38% 40%,#2a4a3e 0%,#182f28 30%,#0e1e19 60%,#080e0c 100%)' }}>
            <svg viewBox="0 0 460 460" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
              <defs>
                <filter id="ng"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>
              <path d="M170,58 C182,52 196,47 215,44 C232,41 252,42 268,46 C282,49 296,54 308,62 C318,68 326,76 332,86 C338,97 340,110 339,123 C338,134 336,143 338,153 C341,165 348,176 355,188 C361,200 365,213 364,226 C363,238 358,248 352,258 C348,265 345,272 347,280 C349,289 355,297 360,306 C364,315 366,325 364,335 C362,345 356,354 349,362 C341,371 332,378 322,385 C312,392 302,399 292,407 C282,415 272,424 264,434 C257,443 252,453 248,462 C244,471 242,479 238,482 C234,484 229,481 224,475 C218,467 212,456 204,445 C195,433 183,421 170,409 C157,397 142,384 129,370 C116,356 104,340 96,323 C89,308 86,291 87,275 C88,261 93,248 96,234 C98,222 97,210 92,199 C87,188 79,179 75,168 C71,158 70,147 72,135 C74,123 79,111 85,100 C92,88 102,78 113,70 C124,62 138,57 152,55 C161,53 166,58 170,58 Z"
                fill="none" stroke="#00d4a0" strokeWidth="1.6" opacity=".7"/>
              <g stroke="#1d6e50" strokeWidth=".7" fill="none" opacity=".5">
                <path d="M88,145 Q150,138 215,135 Q270,132 335,140"/>
                <path d="M90,190 Q155,183 220,180 Q285,177 360,192"/>
                <path d="M90,235 Q160,228 230,225 Q300,222 362,232"/>
              </g>
              <g stroke="#00c97a" strokeWidth=".8" opacity=".25">
                <line x1="185" y1="253" x2="302" y2="240"/>
                <line x1="185" y1="253" x2="218" y2="388"/>
                <line x1="302" y1="240" x2="315" y2="196"/>
              </g>
              <circle cx="185" cy="253" r="9" fill="rgba(0,201,122,.18)" filter="url(#ng)"/>
              <circle cx="185" cy="253" r="5.5" fill="#00c97a" opacity=".95" filter="url(#ng)"/>
              <circle cx="185" cy="253" r="2.4" fill="white"/>
              <circle cx="302" cy="240" r="8" fill="rgba(0,201,122,.16)" filter="url(#ng)"/>
              <circle cx="302" cy="240" r="5" fill="#00c97a" opacity=".92" filter="url(#ng)"/>
              <circle cx="302" cy="240" r="2" fill="white"/>
              <circle cx="270" cy="88" r="6" fill="rgba(100,180,255,.18)"/>
              <circle cx="270" cy="88" r="4" fill="#5bc8ff" opacity=".9"/>
              <circle cx="218" cy="388" r="7" fill="rgba(0,201,122,.16)"/>
              <circle cx="218" cy="388" r="4.2" fill="#00c97a" opacity=".88"/>
              <circle cx="230" cy="230" r="226" fill="none" stroke="rgba(0,0,0,.45)" strokeWidth="8"/>
            </svg>
          </div>
        </div>
      </div>

      <hr className="border-[#e5e9e7]" />

      {/* Info sections */}
      <div className="bg-[#f4f7f5] py-10">
        <div className="max-w-[1180px] mx-auto px-8 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Pipeline */}
            <div className="bg-white rounded-[10px] border border-[#e5e9e7] p-7">
              <div className="text-[17px] font-extrabold mb-5">From Document to Intelligence</div>
              <div className="flex items-start gap-0">
                {['Document\nIngestion', 'AI Parsing &\nExtraction', 'Taxonomy\nClassification', 'Policy\nIntelligence', 'Insights &\nComparisons'].map((step, i, arr) => (
                  <div key={step} className="flex items-center">
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-[52px] h-[52px] rounded-full bg-[#f0f5f3] border-[1.5px] border-[#dbe8e2] flex items-center justify-center">
                        <div className="w-5 h-5 rounded bg-accent2/30" />
                      </div>
                      <div className="text-[11px] font-semibold text-[#4b5563] text-center leading-[1.35] whitespace-pre-line">{step}</div>
                    </div>
                    {i < arr.length - 1 && <div className="text-[#c0cfc8] text-base mx-1 pb-6">→</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Open source */}
            <div className="bg-white rounded-[10px] border border-[#e5e9e7] p-7 flex flex-col">
              <div className="text-[17px] font-extrabold mb-4">Open. Transparent. Collaborative.</div>
              <p className="text-[14px] text-[#4b5563] leading-[1.65] mb-5 flex-1">
                An open-source public good to promote transparent and evidence-based digital governance in Africa.
              </p>
              <a href="https://github.com/cercuit-ola/Okediji-Africa-Digital-Policy-Tracker" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-accent2 font-semibold text-[14px] hover:underline">
                View on GitHub &nbsp;→
              </a>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_2fr] gap-4">
            {/* Why */}
            <div className="bg-white rounded-[10px] border border-[#e5e9e7] p-7 flex flex-col">
              <div className="text-[17px] font-extrabold mb-4">Why This Matters</div>
              <p className="text-[13.5px] text-[#4b5563] leading-[1.7] flex-1">
                Africa&apos;s digital future is being shaped by policy. Access to reliable, structured policy intelligence is essential for informed decisions, innovation, and protecting fundamental rights.
              </p>
              <Link href="/dashboard" className="mt-auto pt-4 inline-flex items-center gap-1 text-accent2 font-semibold text-[14px] hover:underline">
                Learn more →
              </Link>
            </div>

            {/* Live updates */}
            <div className="bg-white rounded-[10px] border border-[#e5e9e7] p-7">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[17px] font-extrabold">Live Policy Updates</div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#f0faf5] border border-[#c6ead8] text-[12px]">
                  <div className="w-1.5 h-1.5 bg-accent2 rounded-full blink" />
                  <strong className="text-primary text-[11px]">Live</strong>
                </div>
              </div>
              {[
                { flag: '🇰🇪', name: 'Kenya AI Strategy (Draft)', status: 'Draft', time: '2h ago' },
                { flag: '🇳🇬', name: 'Nigeria Data Protection Act', status: 'In Force', time: '5h ago' },
                { flag: '🇬🇭', name: 'Ghana Cybersecurity Act', status: 'In Force', time: '1d ago' },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3 py-3 border-b border-[#f0f4f2] last:border-0">
                  <span className="text-xl">{item.flag}</span>
                  <div className="flex-1">
                    <div className="text-[13.5px] font-bold">{item.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[11px] font-semibold ${item.status === 'In Force' ? 'text-accent2' : 'text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded'}`}>{item.status}</span>
                    </div>
                  </div>
                  <span className="text-[12px] text-[#9ca3af] flex-shrink-0">{item.time}</span>
                </div>
              ))}
              <div className="mt-3 flex justify-end">
                <Link href="/explorer" className="text-accent2 text-[14px] font-semibold hover:underline">View all updates →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary py-14 px-8">
        <div className="max-w-[1180px] mx-auto">
          <div className="grid grid-cols-[1.1fr_1fr_1fr_1fr] gap-10 mb-11">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-[6px] bg-white/10 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 22 22" fill="none"><path d="M11 2L18 6.2V14.8L11 19L4 14.8V6.2L11 2Z" stroke="rgba(255,255,255,.7)" strokeWidth="1.4" fill="none"/><circle cx="11" cy="11" r="2.5" fill="rgba(255,255,255,.65)"/></svg>
                </div>
                <div className="text-[11px] font-bold leading-[1.3] text-white">Africa Digital<br />Policy Tracker</div>
              </div>
              <p className="text-[12.5px] text-white/45 leading-[1.7] mb-4 max-w-[210px]">
                Empowering Africa&apos;s digital future through transparent and accessible policy intelligence.
              </p>
            </div>
            {[
              { title: 'Product', links: ['Explore Policies', 'Dashboard', 'API', 'Taxonomy', 'Roadmap'] },
              { title: 'Resources', links: ['Documentation', 'Blog', 'Case Studies', 'FAQs', 'Community'] },
              { title: 'Company', links: ['About Us', 'Team', 'Careers', 'Contact', 'Privacy Policy'] },
            ].map((col) => (
              <div key={col.title}>
                <div className="text-[13px] font-bold text-white mb-3.5">{col.title}</div>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => <li key={l}><a href="#" className="text-[13px] text-white/50 hover:text-white/90 transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-end">
            <span className="text-[12px] text-white/30">© 2025 Africa Digital Policy Tracker. Open Source. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
