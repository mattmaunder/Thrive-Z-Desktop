import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { Badge } from './Badge'
import { Button } from './Button'

type CardProps = {
  title: string
  body?: string
  children?: ReactNode
}

export function Card({ title, body, children }: CardProps) {
  return (
    <div className="rounded-none border border-[var(--color-border)] bg-white p-6">
      <h2 className="text-lg font-medium text-navy">{title}</h2>
      {body ? <p className="mt-2 text-sm text-muted">{body}</p> : null}
      {children}
    </div>
  )
}

type GoalSummaryCardProps = {
  icon: LucideIcon
  name: string
  amount: string
  target: string
  percent: number
  status?: 'on-track' | 'goal-neutral' | 'worth-discussing' | 'over-budget' | 'inactive'
  statusLabel?: string
}

export function GoalSummaryCard({
  icon: Icon,
  name,
  amount,
  target,
  percent,
  status = 'on-track',
  statusLabel = 'On track',
}: GoalSummaryCardProps) {
  return (
    <div className="rounded-none border border-[var(--color-border)] bg-white p-6">
      <div className="flex items-start justify-between">
        <div className="rounded-xl bg-teal/10 p-2.5">
          <Icon className="size-5 text-teal" />
        </div>
        <Badge status={status}>{statusLabel}</Badge>
      </div>
      <p className="mt-4 text-xs text-muted">{name}</p>
      <p className="mt-1 text-2xl text-navy">{amount}</p>
      <p className="mt-1 text-xs text-muted">{target}</p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#ececf0]">
        <div className="h-full rounded-full bg-teal" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-1 text-xs text-muted">{percent}% complete</p>
    </div>
  )
}

type ActionCardProps = {
  avatar: string
  title: string
  subtitle: string
  body: string
  actionLabel: string
  onAction?: () => void
}

export function ActionCard({
  avatar,
  title,
  subtitle,
  body,
  actionLabel,
  onAction,
}: ActionCardProps) {
  return (
    <div className="flex h-full flex-col rounded-none border border-[var(--color-border)] bg-white p-6">
      <div className="flex items-center gap-3 pb-3">
        <div className="gradient-primary flex size-9 items-center justify-center rounded-full text-sm text-white">
          {avatar}
        </div>
        <div>
          <p className="text-sm text-navy">{title}</p>
          <p className="text-xs text-muted">{subtitle}</p>
        </div>
      </div>
      <p className="flex-1 text-sm text-muted">{body}</p>
      <button
        type="button"
        onClick={onAction}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal/10 px-4 py-2 text-sm font-medium text-teal hover:bg-teal/15"
      >
        {actionLabel}
        <ArrowRight className="size-4" />
      </button>
    </div>
  )
}

type ChartCardProps = {
  label: string
  title: string
  description: string
  actionLabel: string
  onAction?: () => void
}

export function ChartCard({
  label,
  title,
  description,
  actionLabel,
  onAction,
}: ChartCardProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-none bg-navy p-6 text-white">
      <div>
        <p className="text-xs text-white/60">{label}</p>
        <h3 className="mt-1 text-lg font-medium">{title}</h3>
        <p className="mt-2 text-sm text-white/70">{description}</p>
      </div>
      <Button size="small" onClick={onAction} className="mt-6 w-fit">
        {actionLabel}
      </Button>
    </div>
  )
}
