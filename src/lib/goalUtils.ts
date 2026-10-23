export type Goal = {
  id: string
  title: string
  category: string
  targetDate: string
  saved: number
  target: number
  monthlyRequired: string
  perPartner: string
  color: string
  progressColor: string
}

export const GOAL_CATEGORIES = [
  'Home',
  'Travel',
  'Safety Net',
  'Education',
  'Retirement',
  'Other',
] as const

const categoryStyles: Record<string, { color: string; progressColor: string }> = {
  Home: { color: 'bg-teal/13', progressColor: 'bg-teal' },
  Travel: { color: 'bg-navy/13', progressColor: 'bg-navy' },
  'Safety Net': { color: 'bg-sky-100', progressColor: 'bg-sky-400' },
  Education: { color: 'bg-teal/13', progressColor: 'bg-teal' },
  Retirement: { color: 'bg-navy/13', progressColor: 'bg-navy' },
  Other: { color: 'bg-teal/13', progressColor: 'bg-teal' },
}

export function formatCurrency(amount: number): string {
  return `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function formatDisplayDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear()).slice(-2)
  return `${day}/${month}/${year}`
}

export function monthsUntil(targetDate: Date): number {
  const now = new Date()
  const months =
    (targetDate.getFullYear() - now.getFullYear()) * 12 +
    (targetDate.getMonth() - now.getMonth())
  return Math.max(months, 1)
}

export function calculateMonthlySavings(target: number, saved: number, targetDate: Date) {
  const remaining = Math.max(target - saved, 0)
  const months = monthsUntil(targetDate)
  const monthly = remaining / months
  const perPartner = monthly / 2

  return {
    monthlyRequired: `${formatCurrency(monthly)}/mo`,
    perPartner: `${formatCurrency(perPartner)}/mo`,
  }
}

export function createGoalFromForm(data: {
  title: string
  category: string
  target: number
  targetDate: Date
}): Goal {
  const styles = categoryStyles[data.category] ?? categoryStyles.Other
  const { monthlyRequired, perPartner } = calculateMonthlySavings(
    data.target,
    0,
    data.targetDate,
  )

  return {
    id: crypto.randomUUID(),
    title: data.title.trim(),
    category: data.category,
    targetDate: formatDisplayDate(data.targetDate),
    saved: 0,
    target: data.target,
    monthlyRequired,
    perPartner,
    color: styles.color,
    progressColor: styles.progressColor,
  }
}

export const INITIAL_GOALS: Goal[] = [
  {
    id: '1',
    title: 'Down Payment for House',
    category: 'Home',
    targetDate: '01/06/29',
    saved: 12000,
    target: 80000,
    monthlyRequired: '£1,888.89/mo',
    perPartner: '£944.44/mo',
    color: 'bg-teal/13',
    progressColor: 'bg-teal',
  },
  {
    id: '2',
    title: 'European Honeymoon',
    category: 'Travel',
    targetDate: '01/09/27',
    saved: 2400,
    target: 8000,
    monthlyRequired: '£373.33/mo',
    perPartner: '£186.67/mo',
    color: 'bg-navy/13',
    progressColor: 'bg-navy',
  },
  {
    id: '3',
    title: 'Emergency Fund',
    category: 'Safety Net',
    targetDate: '31/12/27',
    saved: 8500,
    target: 25000,
    monthlyRequired: '£916.67/mo',
    perPartner: '£458.33/mo',
    color: 'bg-sky-100',
    progressColor: 'bg-sky-400',
  },
]
