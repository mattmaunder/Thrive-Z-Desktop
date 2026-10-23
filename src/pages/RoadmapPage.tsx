type RoadmapGoal = {
  title: string
  date: string
  targetAmount: string
  monthlySavings: string
  perPartner: string
  status: 'on-track' | 'at-risk'
  warning?: string
}

type RoadmapYear = {
  year: string
  goals: RoadmapGoal[]
}

const roadmap: RoadmapYear[] = [
  {
    year: '2027',
    goals: [
      {
        title: 'Emergency Fund (6 months)',
        date: '31/12/27',
        targetAmount: '£25,000',
        monthlySavings: '£850',
        perPartner: '£425',
        status: 'on-track',
      },
      {
        title: 'European Honeymoon',
        date: '01/08/27',
        targetAmount: '£8,000',
        monthlySavings: '£350',
        perPartner: '£175',
        status: 'on-track',
      },
    ],
  },
  {
    year: '2029',
    goals: [
      {
        title: 'House Down Payment',
        date: '01/06/29',
        targetAmount: '£80,000',
        monthlySavings: '£1,800',
        perPartner: '£900',
        status: 'on-track',
      },
    ],
  },
  {
    year: '2031',
    goals: [
      {
        title: 'MBA Program Fund',
        date: '01/08/31',
        targetAmount: '£45,000',
        monthlySavings: '£650',
        perPartner: '£325',
        status: 'at-risk',
        warning:
          'Current savings rate may not meet this goal on time. Consider adjusting the timeline or increasing monthly contributions.',
      },
    ],
  },
  {
    year: '2046',
    goals: [
      {
        title: 'Retirement Nest Egg Milestone',
        date: '01/01/46',
        targetAmount: '£500,000',
        monthlySavings: '£1,500',
        perPartner: '£750',
        status: 'on-track',
      },
    ],
  },
]

function StatusBadge({ status }: { status: RoadmapGoal['status'] }) {
  if (status === 'on-track') {
    return (
      <span className="rounded-full bg-teal/13 px-3 py-1 text-sm text-teal">On Track</span>
    )
  }
  return (
    <span className="rounded-full bg-warning/13 px-3 py-1 text-sm text-warning">At Risk</span>
  )
}

function GoalCard({ goal }: { goal: RoadmapGoal }) {
  return (
    <article className="flex-1 rounded-none border border-[var(--color-border)] bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-medium text-navy">{goal.title}</h3>
          <p className="mt-1 text-sm text-muted">{goal.date}</p>
        </div>
        <StatusBadge status={goal.status} />
      </div>

      <p className="mt-4 text-2xl font-normal text-navy">{goal.targetAmount}</p>
      <p className="text-sm text-muted">Target Amount</p>

      <div className="mt-6 grid gap-4 border-t border-[var(--color-border)] pt-6 sm:grid-cols-2">
        <div>
          <p className="text-xs text-muted">Monthly Savings</p>
          <p className="mt-1 font-medium text-navy">{goal.monthlySavings}</p>
        </div>
        <div>
          <p className="text-xs text-muted">Per Partner</p>
          <p className="mt-1 font-medium text-navy">{goal.perPartner}</p>
        </div>
      </div>

      {goal.warning && (
        <div className="mt-4 rounded-xl bg-warning/10 p-4 text-sm text-warning">{goal.warning}</div>
      )}
    </article>
  )
}

export function RoadmapPage() {
  return (
    <div className="mx-auto max-w-[1152px] px-6 py-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium tracking-tight text-navy">Goal-Based Roadmap</h1>
          <span className="rounded-full bg-[rgba(236,236,240,0.5)] px-2 py-1 text-xs text-muted">
            Thrive Compass
          </span>
        </div>
        <p className="mt-2 text-base text-muted">
          Your financial journey mapped out to achieve your shared dreams
        </p>
      </div>

      <div className="gradient-primary mt-8 rounded-none p-6 text-white">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-sm text-white/80">Total Monthly Savings Required</p>
            <p className="mt-1 text-4xl">£5,150</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/80">Per Partner</p>
            <p className="mt-1 text-2xl">£2,575</p>
          </div>
        </div>
        <div className="mt-4 border-t border-white/20 pt-4">
          <p className="text-sm text-white/80">
            Based on your current goals and timelines, this is what you need to save each month to
            build your shared future.
          </p>
        </div>
      </div>

      <div className="relative mt-8">
        <div className="absolute bottom-0 left-8 top-0 w-0.5 bg-navy/8" />

        <div className="space-y-8">
          {roadmap.map(({ year, goals }) => (
            <div key={year} className="relative flex gap-4">
              <div className="gradient-primary relative z-10 flex size-16 shrink-0 flex-col items-center justify-center rounded-full text-white">
                <span className="text-xs">Year</span>
                <span className="text-base font-medium">{year}</span>
              </div>
              <div className="flex flex-1 flex-col gap-4 pt-2">
                {goals.map((goal) => (
                  <GoalCard key={goal.title} goal={goal} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-none border border-[var(--color-border)] bg-white p-8 text-center">
        <h2 className="text-lg font-medium text-navy">Adjust Your Plan</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
          Life changes, and so should your plan. Thrive Compass automatically recalculates your
          roadmap when your income or goals shift.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            className="gradient-primary rounded-xl px-6 py-3 text-base font-medium text-white"
          >
            Update Income
          </button>
          <button
            type="button"
            className="rounded-xl border border-[var(--color-border)] bg-white px-6 py-3 text-base font-medium text-navy"
          >
            Adjust Timelines
          </button>
        </div>
      </div>
    </div>
  )
}
