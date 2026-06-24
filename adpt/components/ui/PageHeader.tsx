export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="px-8 pt-7 pb-0">
      <h1 className="text-[28px] font-extrabold tracking-tight leading-tight mb-1.5">{title}</h1>
      {subtitle && <p className="text-sm text-text2 leading-relaxed max-w-2xl">{subtitle}</p>}
    </div>
  )
}
