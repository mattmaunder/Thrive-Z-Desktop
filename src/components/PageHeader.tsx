type PageHeaderProps = {
  title: string
  subtitle: string
  action?: React.ReactNode
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-display text-[28px] font-semibold leading-9 tracking-[-0.02em] text-maroon">{title}</h1>
          <span className="rounded-full bg-pink/20 px-3 py-1 text-xs font-medium leading-[18px] text-maroon">Thrive Compass</span>
        </div>
        <p className="mt-1 text-[13px] font-normal leading-[19.5px] text-black/55">{subtitle}</p>
      </div>
      {action}
    </div>
  )
}
