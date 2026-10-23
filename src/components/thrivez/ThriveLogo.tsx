import { ThriveMark } from './ThriveMark'

type ThriveLogoProps = {
  size?: 'default' | 'small'
}

export function ThriveLogo({ size = 'default' }: ThriveLogoProps) {
  const markSize = size === 'small' ? 24 : 30
  const wordSize = size === 'small' ? 'text-[20px] leading-[30px] tracking-[-0.6px]' : 'text-[24.6px] leading-[24.6px]'

  return (
    <div className="flex items-center gap-2" data-node-id="90:12475">
      <ThriveMark size={markSize} className="shrink-0" />
      <span
        className={`font-sans font-semibold tracking-[-0.04em] text-[#1d6fe8] ${wordSize}`}
      >
        thrive
      </span>
    </div>
  )
}
