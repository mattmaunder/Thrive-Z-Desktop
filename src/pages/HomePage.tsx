import { useNavigate } from 'react-router-dom'
import { Check, Map, Target, TrendingUp } from 'lucide-react'
import { THRIVE_CARD, THRIVE_LOGO } from '../lib/constants'

const featureCards = [
  {
    icon: Map,
    iconBg: 'bg-teal/13',
    title: 'Vision Alignment',
    description:
      'Share your 5, 10, and 20-year dreams. See where they overlap and start conversations that matter.',
  },
  {
    icon: Target,
    iconBg: 'bg-navy/13',
    title: 'Shared Goals',
    description:
      'Turn aligned visions into concrete goals with timelines and target amounts that work for both of you.',
  },
  {
    icon: TrendingUp,
    iconBg: 'bg-teal/13',
    title: 'Goal-Based Roadmap',
    description:
      'See exactly how much to save each month to achieve your dreams without the overwhelm.',
  },
]

const whyItems = [
  {
    title: 'Household visibility without merging accounts',
    description: 'Keep your financial independence while building together',
  },
  {
    title: 'Goals first, budgeting second',
    description: 'Focus on dreams, not restrictions',
  },
  {
    title: 'Automatic transaction insights',
    description: 'Understand how spending impacts your shared future',
  },
  {
    title: "Backed by Thrive's trusted platform",
    description: 'Banking that helps you thrive together',
  },
]

const introBullets = [
  'Vision alignment tools designed with relationship experts',
  'Goal-first approach that focuses on dreams, not restrictions',
  'Secure account syncing powered by Plaid technology',
  'Banking that helps you thrive together',
]

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-[1152px] px-6 py-8">
      <section className="grid items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-center">
          <img
            src={THRIVE_CARD}
            alt="Thrive Bank debit card"
            className="h-auto w-full max-w-[384px] [filter:drop-shadow(0_25px_50px_rgba(15,40,71,0.35))]"
          />
          <p className="mt-4 text-sm text-muted">Your Thrive card - built for couples</p>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-gradient-to-r from-teal/10 to-navy/10 px-4 py-2">
            <img src={THRIVE_LOGO} alt="" className="h-4 w-auto" />
            <span className="text-sm text-navy">Compass - Banking for couples</span>
          </div>
          <h1 className="mt-6 text-5xl font-medium leading-tight tracking-tight text-navy">
            Get on the same page.
            <br />
            Build the same future.
          </h1>
          <p className="mt-6 text-lg leading-7 text-muted">
            Thrive Compass helps couples align their visions, set shared goals, and make financial
            decisions that bring you closer together. Banking that helps you thrive.
          </p>
          <button
            type="button"
            onClick={() => navigate('/vision-map')}
            className="gradient-primary mt-8 rounded-xl px-6 py-4 text-base font-medium text-white"
          >
            Start Your Journey
          </button>
        </div>
      </section>

      <section className="relative mt-16 overflow-hidden rounded-none gradient-primary p-12">
        <div className="pointer-events-none absolute -right-16 top-0 size-64 rounded-full bg-teal/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-12 bottom-0 size-48 rounded-full bg-teal/10 blur-3xl" />
        <div className="relative max-w-3xl">
          <img
            src={THRIVE_LOGO}
            alt="Thrive Bank"
            className="h-10 w-auto max-w-[83px] object-contain object-left"
          />
          <h2 className="mt-4 text-xl font-medium text-white">Introducing Thrive Compass</h2>
          <p className="mt-4 text-lg leading-7 text-white/80">
            Thrive is more than a bank—it&apos;s your partner in building a better financial future.
            Compass is our dedicated service for couples, helping you navigate your shared financial
            journey with tools designed to bring you closer together.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {introBullets.map((bullet) => (
              <div key={bullet} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" />
                <p className="text-sm text-white/70">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        {featureCards.map(({ icon: Icon, iconBg, title, description }) => (
          <div
            key={title}
            className="rounded-none border border-[var(--color-border)] bg-white p-6"
          >
            <div className={`mb-6 flex size-12 items-center justify-center rounded-xl ${iconBg}`}>
              <Icon className="size-6 text-teal" />
            </div>
            <h3 className="text-lg font-medium text-navy">{title}</h3>
            <p className="mt-2 text-sm leading-5 text-muted">{description}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 rounded-none border border-teal/20 bg-gradient-to-r from-teal/10 to-teal/5 p-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-medium text-navy">Why Thrive Compass?</h2>
          <p className="mt-4 text-base leading-6 text-muted">
            Money conversations don&apos;t have to be stressful. Thrive Compass frames spending through
            the lens of your joint future, not restrictive budgets. See transactions labeled
            &quot;on-track&quot;, &quot;goal-neutral&quot;, or &quot;worth discussing&quot; instead of
            feeling judged for every purchase.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {whyItems.map(({ title, description }) => (
              <div key={title} className="bg-surface p-6 text-left">
                <p className="text-base text-teal">
                  <Check className="mr-1 inline size-4" />
                  {title}
                </p>
                <p className="mt-2 text-sm text-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
