import { useState } from 'react'
import {
  BadgeCheck,
  Building2,
  CreditCard,
  EyeOff,
  Plus,
  Shield,
} from 'lucide-react'
import { PageHeader } from '../components/PageHeader'

type OwnerTag = 'Partner 1' | 'Partner 2' | 'Joint'

type Account = {
  bank: string
  type: string
  lastFour: string
  owner: OwnerTag
  balance: string
}

const accounts: Account[] = [
  {
    bank: 'Chase Bank',
    type: 'Checking',
    lastFour: '4521',
    owner: 'Partner 1',
    balance: '£12,450.32',
  },
  {
    bank: 'Bank of America',
    type: 'Savings',
    lastFour: '7832',
    owner: 'Partner 1',
    balance: '£8,234.67',
  },
  {
    bank: 'Wells Fargo',
    type: 'Checking',
    lastFour: '9104',
    owner: 'Partner 2',
    balance: '£6,789.21',
  },
  {
    bank: 'Ally Bank',
    type: 'Savings',
    lastFour: '3301',
    owner: 'Joint',
    balance: '£15,600.00',
  },
]

const ownerStyles: Record<OwnerTag, string> = {
  'Partner 1': 'bg-blue-100 text-blue-800',
  'Partner 2': 'bg-sky-100 text-sky-800',
  Joint: 'bg-teal/13 text-teal',
}

export function AccountsPage() {
  const [balanceVisible, setBalanceVisible] = useState(true)

  return (
    <div className="mx-auto max-w-[1152px] px-6 py-8">
      <PageHeader
        title="Connected Accounts"
        subtitle="Securely link your accounts for automatic tracking without merging finances"
      />

      <div className="gradient-teal-card mt-8 rounded-none p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-white/80">Total Household Balance</p>
            <p className="mt-1 text-4xl">
              {balanceVisible ? '£43,074.20' : '••••••••'}
            </p>
            <p className="mt-2 text-sm text-white/80">
              4 accounts connected across both partners
            </p>
          </div>
          <button
            type="button"
            onClick={() => setBalanceVisible(!balanceVisible)}
            className="rounded-xl bg-white/20 p-2"
            aria-label={balanceVisible ? 'Hide balance' : 'Show balance'}
          >
            <EyeOff className="size-5" />
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {accounts.map((account) => (
          <article
            key={`${account.bank}-${account.lastFour}`}
            className="flex flex-wrap items-center justify-between gap-4 rounded-none border border-[var(--color-border)] bg-white p-5"
          >
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-[rgba(236,236,240,0.5)]">
                <Building2 className="size-6 text-muted" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-medium text-navy">{account.bank}</h2>
                  <BadgeCheck className="size-4 text-teal" />
                </div>
                <p className="text-sm text-muted">
                  {account.type} ••••{account.lastFour}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${ownerStyles[account.owner]}`}
              >
                {account.owner}
              </span>
            </div>
            <div className="text-right">
              <p className="text-lg font-medium text-navy">
                {balanceVisible ? account.balance : '••••••'}
              </p>
              <p className="text-xs text-muted">Balance</p>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-none border-2 border-dashed border-[var(--color-border)] py-4 text-base font-medium text-muted hover:border-teal hover:text-teal"
      >
        <Plus className="size-5" />
        Connect Another Account
      </button>

      <div className="mt-8 rounded-none border border-[var(--color-border)] bg-white p-6">
        <h2 className="text-lg font-medium text-navy">Privacy & Control</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="flex gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal/13">
              <Shield className="size-5 text-teal" />
            </div>
            <div>
              <h3 className="font-medium text-navy">Granular Controls</h3>
              <p className="mt-1 text-sm text-muted">
                Choose what your partner can see. Keep personal accounts private or share everything.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-100">
              <CreditCard className="size-5 text-violet-600" />
            </div>
            <div>
              <h3 className="font-medium text-navy">Read-Only Access</h3>
              <p className="mt-1 text-sm text-muted">
                We can only view your transactions. We never move money or make changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
