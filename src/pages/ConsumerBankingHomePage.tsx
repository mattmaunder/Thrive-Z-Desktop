import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Coins,
  PiggyBank,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import {
  GOAL_PROGRESS,
  RECENT_TRANSACTIONS,
  SAVINGS_GROWTH_DATA,
  SPENDING_ALIGNMENT,
  STATUS_STYLES,
} from '../lib/dashboardData'

function useChartReady() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      setReady(true)
      return
    }

    const frame = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return ready
}

function SavingsGrowthChart() {
  const ready = useChartReady()
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(0)

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

  useLayoutEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [linePath])

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
        ref={pathRef}
        d={linePath}
        fill="none"
        stroke="#1d6fe8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: pathLength || undefined,
          strokeDashoffset: ready ? 0 : pathLength,
          transition: ready ? 'stroke-dashoffset 1.2s ease-out' : 'none',
        }}
      />
      {points.map((p, i) => (
        <circle
          key={p.month}
          cx={p.x}
          cy={p.y}
          r="4.5"
          fill="#ffffff"
          stroke="#1d6fe8"
          strokeWidth="1.5"
          style={{
            opacity: ready ? 1 : 0,
            transition: ready ? `opacity 0.25s ease-out ${0.75 + i * 0.08}s` : 'none',
          }}
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
  const ready = useChartReady()
  const size = 150
  const strokeWidth = 24
  const radius = (size - strokeWidth) / 2
  const center = size / 2
  const circumference = 2 * Math.PI * radius

  let cumulativeOffset = 0

  return (
    <>
      <div className="flex h-[162px] items-start justify-center pt-3">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
          {SPENDING_ALIGNMENT.map((segment, i) => {
            const segmentLength = (segment.percent / 100) * circumference
            const offset = cumulativeOffset
            cumulativeOffset += segmentLength

            return (
              <circle
                key={segment.label}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${ready ? segmentLength : 0} ${circumference}`}
                strokeDashoffset={-offset}
                transform={`rotate(-90 ${center} ${center})`}
                style={{
                  transition: ready ? `stroke-dasharray 0.7s ease-out ${i * 0.2}s` : 'none',
                }}
              />
            )
          })}
        </svg>
      </div>
      <div className="flex h-[65px] justify-center gap-6 pt-4">
        {SPENDING_ALIGNMENT.map((segment, i) => (
          <div
            key={segment.label}
            className="text-center"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? 'translateY(0)' : 'translateY(6px)',
              transition: ready
                ? `opacity 0.4s ease-out ${0.5 + i * 0.12}s, transform 0.4s ease-out ${0.5 + i * 0.12}s`
                : 'none',
            }}
          >
            <div
              className="mx-auto size-2.5 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <p className="pt-1 text-[11px] font-medium leading-[16.5px] text-black/55">{segment.label}</p>
            <p className="text-[12px] font-semibold leading-[18px] text-navy">{segment.percent}%</p>
          </div>
        ))}
      </div>
    </>
  )
}

const goalBarColors: Record<string, string> = {
  'bg-lime': '#1d6fe8',
  'bg-maroon': '#5b9def',
  'bg-warning': '#93c5fd',
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
    <div className="mx-auto max-w-[1160px] px-6 py-8" data-node-id="426:1732">
      <PageHeader
        title="Household Dashboard"
        subtitle="Your combined financial snapshot for 28/04/26"
      />

      <div className="mt-6 grid gap-4 md:grid-cols-3" data-node-id="426:4209">
        <div className="gradient-income overflow-hidden rounded-none p-5" data-node-id="426:4210">
          <div className="flex items-start justify-between">
            <div className="flex size-9 items-center justify-center rounded-xl bg-white/20">
              <Coins className="size-[18px] text-white" strokeWidth={2} />
            </div>
            <TrendingUp className="size-5 text-white" strokeWidth={2} />
          </div>
          <p className="mt-6 font-display text-[40px] font-semibold leading-10 tracking-[-0.8px] text-text-brand">
            £12,450
          </p>
          <p className="mt-2 text-[13px] font-medium leading-[19.5px] text-white/85">
            Combined Monthly Income
          </p>
        </div>

        <div className="rounded-none border border-border bg-white p-[21px]" data-node-id="426:4227">
          <div className="flex size-9 items-center justify-center rounded-xl bg-black/5">
            <TrendingDown className="size-[18px] text-black/55" strokeWidth={2} />
          </div>
          <p className="mt-6 font-display text-[40px] font-semibold leading-10 tracking-[-0.8px] text-navy">
            £8,234
          </p>
          <p className="mt-2 text-[13px] font-medium leading-[19.5px] text-black/55">
            Total Spend This Month
          </p>
        </div>

        <div className="rounded-none border border-border bg-white p-[21px]" data-node-id="426:4239">
          <div className="flex size-9 items-center justify-center rounded-xl bg-black/5">
            <PiggyBank className="size-[18px] text-black/55" strokeWidth={2} />
          </div>
          <p className="mt-6 font-display text-[40px] font-semibold leading-10 tracking-[-0.8px] text-navy">
            34%
          </p>
          <p className="mt-2 text-[13px] font-medium leading-[19.5px] text-black/55">
            Savings Rate
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2" data-node-id="426:4252">
        <div
          className="min-h-[330px] rounded-none border border-border bg-white p-[21px]"
          data-node-id="426:4253"
        >
          <h2 className="text-[15px] font-semibold leading-[22.5px] text-navy">Savings Growth</h2>
          <div className="mt-3 h-[253px]">
            <SavingsGrowthChart />
          </div>
        </div>

        <div
          className="min-h-[330px] rounded-none border border-border bg-white p-[21px]"
          data-node-id="426:4287"
        >
          <h2 className="text-[15px] font-semibold leading-[22.5px] text-navy">Spending Alignment</h2>
          <SpendingDonutChart />
        </div>
      </div>

      <div
        className="mt-4 rounded-none border border-border bg-white p-[21px]"
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
            <div key={goal.name} className="rounded-none bg-black/[0.03] p-4">
              <p className="text-[13px] font-medium leading-[19.5px] text-navy">{goal.name}</p>
              <p className="pt-0.5 text-xs leading-[18px] text-black/55">{goal.percent}% complete</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/8">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${goal.percent}%`,
                    backgroundColor: goalBarColors[goal.color],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-4 rounded-none border border-border bg-white p-[21px]"
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
                  index % 2 === 0 ? 'bg-black/[0.02]' : ''
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
    </div>
  )
}
