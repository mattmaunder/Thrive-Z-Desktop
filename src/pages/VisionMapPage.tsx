import { Heart, Home, Plane, GraduationCap, Target, TrendingUp } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'

type AlignmentStatus = 'discussion' | 'aligned'

type VisionCategory = {
  title: string
  icon: typeof Home
  iconBg: string
  status: AlignmentStatus
  partner1: string
  partner2: string
}

const categories: VisionCategory[] = [
  {
    title: 'Home & Family',
    icon: Home,
    iconBg: 'bg-warning/13',
    status: 'discussion',
    partner1: 'Own a house with a garden in the suburbs',
    partner2: 'Buy a cozy home, prefer city apartment',
  },
  {
    title: 'Travel & Adventure',
    icon: Plane,
    iconBg: 'bg-teal/13',
    status: 'aligned',
    partner1: 'Visit 3 new countries every year',
    partner2: 'Travel internationally 2-3 times per year',
  },
  {
    title: 'Career Growth',
    icon: TrendingUp,
    iconBg: 'bg-warning/13',
    status: 'discussion',
    partner1: 'Start own consulting business',
    partner2: 'Continue corporate career with promotions',
  },
  {
    title: 'Education',
    icon: GraduationCap,
    iconBg: 'bg-teal/13',
    status: 'aligned',
    partner1: 'Consider MBA program',
    partner2: "Support partner's education goals",
  },
  {
    title: 'Retirement',
    icon: Target,
    iconBg: 'bg-teal/13',
    status: 'aligned',
    partner1: 'Retire by 55, focus on passive income',
    partner2: 'Retire by 60, maximize retirement savings',
  },
]

function StatusBadge({ status }: { status: AlignmentStatus }) {
  if (status === 'aligned') {
    return (
      <span className="rounded-full bg-teal/13 px-3 py-1 text-sm text-teal">Strong Alignment</span>
    )
  }
  return (
    <span className="rounded-full bg-warning/13 px-3 py-1 text-sm text-warning">
      Room for Discussion
    </span>
  )
}

export function VisionMapPage() {
  return (
    <div className="mx-auto max-w-[1152px] px-6 py-8">
      <PageHeader
        title="Vision Alignment Map"
        subtitle="See where your dreams overlap and where conversations can bring you closer together"
      />

      <div className="mt-8 space-y-4">
        {categories.map(({ title, icon: Icon, iconBg, status, partner1, partner2 }) => (
          <article
            key={title}
            className="rounded-none border border-[var(--color-border)] bg-white p-5"
          >
            <div className="flex gap-4">
              <div className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
                <Icon className="size-6 text-navy" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-lg font-medium text-navy">{title}</h2>
                  <StatusBadge status={status} />
                </div>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl bg-[rgba(236,236,240,0.5)] p-3">
                    <p className="text-sm text-muted">Partner 1</p>
                    <p className="mt-1 text-sm text-navy">{partner1}</p>
                  </div>
                  <div className="rounded-xl bg-[rgba(236,236,240,0.5)] p-3">
                    <p className="text-sm text-muted">Partner 2</p>
                    <p className="mt-1 text-sm text-navy">{partner2}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-none border border-teal/20 bg-gradient-to-r from-teal/10 to-teal/5 p-6">
        <div className="flex gap-3">
          <Heart className="mt-1 size-5 shrink-0 text-teal" />
          <div>
            <h3 className="font-medium text-navy">Growing Together with Thrive Compass</h3>
            <p className="mt-2 text-sm leading-5 text-muted">
              Different perspectives are opportunities for growth. Use these insights to start
              meaningful conversations about your shared future. Thrive Compass is designed with input
              from relationship experts to help you thrive together.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
