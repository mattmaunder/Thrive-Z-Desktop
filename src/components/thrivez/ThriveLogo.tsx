import { ThriveMark } from './ThriveMark'

type ThriveLogoProps = {
  size?: 'default' | 'small' | 'toolbar'
}

export function ThriveLogo({ size = 'default' }: ThriveLogoProps) {
  const markSize = size === 'toolbar' ? 43 : size === 'small' ? 24 : 30
  const wordSize =
    size === 'toolbar'
      ? 'font-display text-lg leading-none tracking-[-0.02em] text-pink'
      : size === 'small'
        ? 'text-[20px] leading-[30px] tracking-[-0.6px]'
        : 'text-[24.6px] leading-[24.6px]'

  return (
    <div className="flex items-center gap-2" data-node-id="90:12475">
      <ThriveMark size={markSize} className="shrink-0" variant={size === 'toolbar' ? 'toolbar' : 'default'} />
      <span
        className={`font-semibold ${size === 'toolbar' ? '' : 'font-sans tracking-[-0.04em] text-[#1d6fe8]'} ${wordSize}`}
      >
        {size === 'toolbar' ? 'Thrive' : 'thrive'}
      </span>
    </div>
  )
}
