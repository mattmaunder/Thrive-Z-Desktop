import { useState } from 'react'
import {
  ArrowDownCircle,
  ChevronRight,
  Gift,
  Send,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react'
import { AnimatedBalance } from '../components/thrivez/AnimatedBalance'
import { BottomNav } from '../components/thrivez/BottomNav'
import { CoinRain } from '../components/thrivez/CoinRain'
import { DecorativeBlob, ThriveMark } from '../components/thrivez/ThriveMark'
import { ThriveLogo } from '../components/thrivez/ThriveLogo'
import {
  GOALS,
  SPENDING_CATEGORIES,
  THRIVE_Z_ASSETS,
} from '../lib/thrivez/constants'

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-7 pt-4">
      <span className="text-[13px] font-semibold leading-[19.5px] text-black">9:41</span>
      <div className="flex items-center gap-1">
        <span className="h-2.5 w-4 rounded bg-black/80" />
        <span className="size-2.5 rounded-full bg-black/80" />
        <span className="h-2.5 w-6 rounded border border-black/80" />
      </div>
    </div>
  )
}

export function ThriveZHomePage() {
  const [showCoins, setShowCoins] = useState(true)

  return (
    <div className="flex min-h-screen justify-center bg-[#1a1a1a]">
      <div
        className="relative flex min-h-screen w-full max-w-[402px] flex-col overflow-hidden bg-[#f2ffd1]"
        data-node-id="90:12462"
      >
        <CoinRain active={showCoins} />

        <StatusBar />

        <main className="flex-1 overflow-y-auto pb-28 pt-2">
          <div className="flex flex-col gap-6 px-5">
            <div className="flex items-center justify-between">
              <ThriveLogo />
              <div className="size-9 shrink-0 rounded-full bg-[#0f5d00] shadow-[0_0_0_2px_#b0fe00]">
                <div className="size-full overflow-hidden rounded-full">
                  <img
                    src={THRIVE_Z_ASSETS.profile}
                    alt="Jamie's profile"
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </div>

            <h1 className="font-thrive text-2xl font-medium leading-9 text-black">Hi, Matt</h1>

            <div
              className="relative h-[119px] w-full overflow-hidden rounded-3xl bg-blue text-left"
              data-node-id="90:12485"
            >
              <DecorativeBlob
                variant="reward"
                className="pointer-events-none absolute right-4 top-12 size-24"
              />
              <div className="relative flex items-center gap-3 p-4">
                <button
                  type="button"
                  onClick={() => setShowCoins((active) => !active)}
                  aria-label={showCoins ? 'Stop coin animation' : 'Start coin animation'}
                  aria-pressed={showCoins}
                  className="flex size-12 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-full border-0 bg-navy p-0 outline-none hover:bg-navy active:bg-navy"
                >
                  <Gift className="size-6 text-blue" strokeWidth={2} />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold leading-[22.5px] text-navy">
                    🎉 Sneakers goal reached!
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-sm font-medium text-navy/80">
                    <Star className="size-3.5 shrink-0 fill-navy/80 text-navy/80" />
                    620 points · claim 6 prizes
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-blue">
                  Claim
                </span>
              </div>
            </div>

            <section
              className="relative h-[201px] overflow-hidden rounded-3xl bg-[#0a3c00] p-4"
              data-node-id="90:12504"
            >
              <p className="text-base font-medium text-[#b0fe00]">Total balance</p>
              <AnimatedBalance />
              <DecorativeBlob
                variant="balance"
                className="pointer-events-none absolute right-4 top-[-16px] size-[90px]"
              />
              <ThriveMark
                size={36}
                className="pointer-events-none absolute right-14 top-4 opacity-90"
              />
              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-3xl border border-[#b0fe00] px-6 py-[15px] text-base font-medium text-[#b0fe00]"
                >
                  <ArrowDownCircle className="size-5" strokeWidth={2} />
                  Deposit
                </button>
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-3xl border border-[#b0fe00] px-6 py-[15px] text-base font-medium text-[#b0fe00]"
                >
                  <Send className="size-[18px]" strokeWidth={2} />
                  Transfer
                </button>
              </div>
            </section>

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-3xl bg-[#64002d] p-4 text-left"
              data-node-id="90:12531"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#ff91f2]">
                <Sparkles className="size-[22px] text-[#64002d]" strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-base font-semibold text-[#ff91f2]">Ask Thrive AI</p>
                <p className="text-sm text-white/80">
                  &ldquo;Can I afford this?&rdquo; · budgeting · balances
                </p>
              </div>
              <ChevronRight className="size-5 shrink-0 text-[#ff91f2]" strokeWidth={2} />
            </button>

            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-medium text-black">Recent spending</h2>
                <button
                  type="button"
                  className="flex items-center gap-1 text-base font-medium text-[#850056]"
                >
                  View all
                  <ChevronRight className="size-4" strokeWidth={2} />
                </button>
              </div>
              <div className="rounded-3xl border border-black/10 bg-white p-[17px]">
                <div className="mb-3 flex h-[104px] gap-1">
                  {SPENDING_CATEGORIES.map((category) => (
                    <div
                      key={category.label}
                      className="flex min-w-0 flex-col justify-end rounded-2xl p-2"
                      style={{ backgroundColor: category.color, flex: category.width }}
                    >
                      <span className="text-sm font-medium text-black/80">{category.amount}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {SPENDING_CATEGORIES.map((category) => (
                    <div key={category.label} className="flex items-center gap-1.5">
                      <span
                        className="size-3 rounded-[3px]"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm font-medium text-black">{category.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-medium text-black">Goals</h2>
                <button
                  type="button"
                  className="flex items-center gap-1 text-base font-medium text-[#850056]"
                >
                  View all
                  <ChevronRight className="size-4" strokeWidth={2} />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {GOALS.map((goal) => (
                  <article
                    key={goal.name}
                    className="flex items-center gap-3 rounded-3xl border border-black/10 bg-white p-[17px]"
                  >
                    <span
                      className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-black/10"
                      style={{ backgroundColor: goal.iconBg }}
                    >
                      <TrendingUp className="size-[26px] text-[#64002d]/70" strokeWidth={2} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-base font-medium text-black">{goal.name}</p>
                        <p className="text-base font-medium text-black">{goal.target}</p>
                      </div>
                      <div className="mt-1 h-2 overflow-hidden rounded-full bg-black">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${goal.progress}%`,
                            backgroundColor: goal.progressColor,
                          }}
                        />
                      </div>
                      <div className="mt-1 flex items-center justify-between text-sm font-medium text-black/56">
                        <span>{goal.saved}</span>
                        <span>{goal.remaining}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-3xl border border-black/10 bg-[#f2ffd1] p-[17px] text-left"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#b0fe00]">
                <TrendingUp className="size-[22px] text-black" strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-base font-semibold text-black">Build your credit</p>
                <p className="text-sm text-black/56">Score 712 · +18 this month</p>
              </div>
              <ChevronRight className="size-5 shrink-0 text-black/40" strokeWidth={2} />
            </button>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  )
}
