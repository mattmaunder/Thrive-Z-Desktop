import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Coins,
  House,
  Plane,
  PiggyBank,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Button } from '../components/ui'
import {
  GOAL_PROGRESS,
  RECENT_TRANSACTIONS,
  SAVINGS_GROWTH_DATA,
  SPENDING_ALIGNMENT,
  STATUS_STYLES,
} from '../lib/dashboardData'

function SavingsGrowthChart() {
  const max = 30000
  const width = 506
  const height = 253
  const padding = { top: 14, right: 14, bottom: 30, left: 50 }
  const chartW = width - padding.left - padding.right
  const chartH = height - padding.top - padding.bottom

  const points = SAVINGS_GROWTH_DATA.map((d, i) => {
    const x = padding.left + (i / (SAVINGS_GROWTH_DATA.length - 1)) * chartW
    const y = padding.top + chartH - (d.value / max) * chartH
    return { x, y, ...d }
  })

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const yLabels = [30000, 22500, 15000, 7500]

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" aria-hidden>
      {yLabels.map((label) => {
        const y = padding.top + chartH - (label / max) * chartH
        return (
          <g key={label}>
            <line
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="rgba(0,0,0,0.08)"
              strokeWidth="1"
            />
            <text
              x={padding.left - 8}
              y={y + 4}
              textAnchor="end"
              className="fill-black/40 text-[12px]"
            >
              {label.toLocaleString()}
            </text>
          </g>
        )
      })}
      <path
        d={linePath}
        fill="none"
        stroke="#9a0062"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((p) => (
        <circle
          key={p.month}
          cx={p.x}
          cy={p.y}
          r="4.5"
          fill="#ffffff"
          stroke="#9a0062"
          strokeWidth="1.5"
        />
      ))}
      {points.map((p) => (
        <text
          key={`label-${p.month}`}
          x={p.x}
          y={height - 8}
          textAnchor="middle"
          className="fill-black/40 text-[12px]"
        >
          {p.month}
        </text>
      ))}
    </svg>
  )
}

function SpendingDonutChart() {
  const size = 150
  const strokeWidth = 24
  const radius = (size - strokeWidth) / 2
  const center = size / 2
  const circumference = 2 * Math.PI * radius

  return (
    <>
      <div className="flex h-[162px] items-start justify-center pt-3">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
          {SPENDING_ALIGNMENT.map((segment, index) => {
            const segmentLength = (segment.percent / 100) * circumference
            const offset = SPENDING_ALIGNMENT.slice(0, index).reduce(
              (total, item) => total + (item.percent / 100) * circumference,
              0,
            )

            return (
              <circle
                key={segment.label}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${segmentLength} ${circumference}`}
                strokeDashoffset={-offset}
                transform={`rotate(-90 ${center} ${center})`}
              />
            )
          })}
        </svg>
      </div>
      <div className="flex h-[65px] justify-center gap-6 pt-4">
        {SPENDING_ALIGNMENT.map((segment) => (
          <div key={segment.label} className="text-center">
            <div className={`mx-auto size-2.5 rounded-full ${
              segment.label === 'On-Track'
                ? 'bg-link'
                : segment.label === 'Goal-Neutral'
                  ? 'bg-warning'
                  : 'bg-maroon'
            }`} />
            <p className="pt-1 text-[11px] font-medium leading-[16.5px] text-black/55">{segment.label}</p>
            <p className="text-[12px] font-semibold leading-[18px] text-navy">{segment.percent}%</p>
          </div>
        ))}
      </div>
    </>
  )
}

const goalBarClasses: Record<string, string> = {
  'bg-pink': 'bg-pink',
  'bg-warning': 'bg-warning',
  'bg-lime': 'bg-lime',
}

const goalIconClasses: Record<string, string> = {
  'bg-pink': 'bg-pink/50',
  'bg-warning': 'bg-warning/35',
  'bg-lime': 'bg-lime',
}

const goalWidthClasses: Record<number, string> = {
  15: 'w-[15%]',
  30: 'w-[30%]',
  34: 'w-[34%]',
}

function formatAmount(amount: number) {
  const abs = Math.abs(amount)
  const formatted = abs.toLocaleString('en-GB', {
    minimumFractionDigits: amount % 1 ? 2 : 0,
    maximumFractionDigits: 2,
  })
  return amount > 0 ? `+£${formatted}` : `-£${formatted}`
}

export function ConsumerBankingHomePage() {
  return (
    <div className="mx-auto max-w-[1160px] px-4 py-8 sm:px-8" data-node-id="426:1732">
      <PageHeader
        title="Household Dashboard"
        subtitle="Your combined financial snapshot for 28/04/26"
      />

      <div className="mt-6 grid gap-4 md:grid-cols-3" data-node-id="426:4209">
        <div className="gradient-income min-h-48 overflow-hidden rounded-3xl p-6" data-node-id="426:4210">
          <div className="flex items-start justify-between">
            <div className="flex size-9 items-center justify-center rounded-xl bg-white/20">
              <Coins className="size-[18px] text-white" strokeWidth={2} />
            </div>
            <TrendingUp className="size-5 text-white" strokeWidth={2} />
          </div>
          <p className="mt-10 font-display text-[40px] font-semibold leading-10 tracking-[-0.8px] text-text-brand">
            £12,450
          </p>
          <p className="mt-2 text-[13px] font-medium leading-[19.5px] text-white/85">
            Combined Monthly Income
          </p>
        </div>

        <div className="min-h-48 rounded-3xl bg-white p-6" data-node-id="426:4227">
          <div className="flex size-9 items-center justify-center rounded-xl bg-pink/15">
            <TrendingDown className="size-[18px] text-maroon" strokeWidth={2} />
          </div>
          <p className="mt-10 font-display text-[40px] font-semibold leading-10 tracking-[-0.8px] text-navy">
            £8,234
          </p>
          <p className="mt-2 text-[13px] font-medium leading-[19.5px] text-black/55">
            Total Spend This Month
          </p>
        </div>

        <div className="min-h-48 rounded-3xl bg-white p-6" data-node-id="426:4239">
          <div className="flex size-9 items-center justify-center rounded-xl bg-pink/15">
            <PiggyBank className="size-[18px] text-maroon" strokeWidth={2} />
          </div>
          <p className="mt-10 font-display text-[40px] font-semibold leading-10 tracking-[-0.8px] text-navy">
            34%
          </p>
          <p className="mt-2 text-[13px] font-medium leading-[19.5px] text-black/55">
            Savings Rate
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2" data-node-id="426:4252">
        <div
          className="min-h-[330px] rounded-3xl bg-white p-4"
          data-node-id="426:4253"
        >
          <h2 className="text-[15px] font-semibold leading-[22.5px] text-navy">Savings Growth</h2>
          <div className="mt-3 h-[253px]">
            <SavingsGrowthChart />
          </div>
        </div>

        <div
          className="min-h-[330px] rounded-3xl bg-white p-4"
          data-node-id="426:4287"
        >
          <h2 className="text-[15px] font-semibold leading-[22.5px] text-navy">Spending Alignment</h2>
          <SpendingDonutChart />
        </div>
      </div>

      <div
        className="mt-6 rounded-3xl bg-white p-4"
        data-node-id="426:4331"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-semibold leading-[22.5px] text-navy">Goal Progress Overview</h2>
          <Link
            to="/goals"
            className="flex items-center gap-1 text-[13px] font-medium leading-[19.5px] text-link hover:underline"
          >
            View All
            <ChevronRight className="size-3" strokeWidth={2} />
          </Link>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3" data-node-id="426:4341">
          {GOAL_PROGRESS.map((goal) => (
            <div key={goal.name} className="flex items-center gap-3 rounded-3xl border border-border p-3">
              <div className={`flex size-14 shrink-0 items-center justify-center rounded-xl ${goalIconClasses[goal.color]}`}>
                {goal.icon === 'home' && <House className="size-7 text-maroon" />}
                {goal.icon === 'plane' && <Plane className="size-7 text-maroon" />}
                {goal.icon === 'piggy-bank' && <PiggyBank className="size-7 text-maroon" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-maroon">{goal.name}</p>
                  <p className="text-sm font-medium text-maroon">{goal.target}</p>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-black/10">
                  <div className={`h-full rounded-full ${goalBarClasses[goal.color]} ${goalWidthClasses[goal.percent]}`} />
                </div>
                <div className="mt-1 flex justify-between text-xs text-black/55">
                  <span>{goal.saved}</span>
                  <span>{`£${(Number(goal.target.replace(/[£,]/g, '')) - Number(goal.saved.replace(/[£,]/g, ''))).toLocaleString('en-GB')}`}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-6 rounded-3xl bg-white p-4"
        data-node-id="426:4377"
      >
        <h2 className="text-[15px] font-semibold leading-[22.5px] text-navy">Recent Transactions</h2>
        <div className="mt-3 flex flex-col" data-node-id="426:4381">
          {RECENT_TRANSACTIONS.map((tx, index) => {
            const status = STATUS_STYLES[tx.status]
            const isIncome = tx.amount > 0
            return (
              <div
                key={`${tx.name}-${tx.date}`}
                className={`flex items-center justify-between p-3 ${
                  index % 2 === 0 ? 'bg-pink/15' : ''
                }`}
              >
                <div>
                  <p className="text-[13px] font-medium leading-[19.5px] text-navy">{tx.name}</p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[11px] leading-[16.5px] text-black/40">{tx.date}</span>
                    <span
                      className={`rounded-full px-[10px] py-[2px] text-[11px] font-medium leading-[16.5px] ${status.badge}`}
                    >
                      {status.text}
                    </span>
                  </div>
                </div>
                <p
                  className={`text-[14px] font-semibold leading-[21px] ${
                    isIncome ? 'text-teal' : 'text-navy'
                  }`}
                >
                  {formatAmount(tx.amount)}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        <Button className="min-w-44 rounded-3xl bg-maroon text-white hover:bg-maroon/90">
          Add Transaction
        </Button>
        <Button variant="ghost" className="min-w-40 rounded-3xl border-maroon bg-transparent text-maroon hover:bg-white/50">
          View Reports
        </Button>
      </div>
    </div>
  )
}
