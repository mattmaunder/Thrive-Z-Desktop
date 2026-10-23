import type { ReactNode } from 'react'
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react'

type AlertVariant = 'success' | 'warning' | 'error' | 'info'

type AlertProps = {
  variant: AlertVariant
  title: string
  children?: ReactNode
}

const variantConfig: Record<
  AlertVariant,
  { icon: typeof CheckCircle2; container: string; iconColor: string }
> = {
  success: {
    icon: CheckCircle2,
    container: 'border border-teal/20 bg-teal/10',
    iconColor: 'text-teal',
  },
  warning: {
    icon: AlertTriangle,
    container: 'border border-warning/20 bg-warning/10',
    iconColor: 'text-warning',
  },
  error: {
    icon: AlertCircle,
    container: 'border border-[#d4183d]/20 bg-[#d4183d]/10',
    iconColor: 'text-[#d4183d]',
  },
  info: {
    icon: Info,
    container: 'border border-navy/10 bg-navy/5',
    iconColor: 'text-navy',
  },
}

export function Alert({ variant, title, children }: AlertProps) {
  const { icon: Icon, container, iconColor } = variantConfig[variant]

  return (
    <div className={`flex gap-3 rounded-none p-4 ${container}`}>
      <Icon className={`mt-0.5 size-5 shrink-0 ${iconColor}`} />
      <div>
        <p className="text-sm text-navy">{title}</p>
        {children ? <p className="mt-1 text-xs text-muted">{children}</p> : null}
      </div>
    </div>
  )
}
