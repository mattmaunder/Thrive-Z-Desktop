import { useState } from 'react'
import { Plus, Target, Users } from 'lucide-react'
import { CreateGoalForm } from '../components/CreateGoalForm'
import { PageHeader } from '../components/PageHeader'
import {
  createGoalFromForm,
  INITIAL_GOALS,
  type Goal,
} from '../lib/goalUtils'

function GoalCard({ goal }: { goal: Goal }) {
  const percent = goal.target > 0 ? ((goal.saved / goal.target) * 100).toFixed(1) : '0.0'

  return (
    <article className="rounded-none border border-[var(--color-border)] bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`flex size-9 items-center justify-center rounded-xl ${goal.color}`}>
            <Target className="size-5 text-navy" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-navy">{goal.title}</h2>
            <p className="text-sm text-muted">{goal.category}</p>
          </div>
        </div>
        <div className="text-right text-sm">
          <p className="text-muted">Target Date</p>
          <p className="font-medium text-navy">{goal.targetDate}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">{percent}% complete</span>
          <span className="font-medium text-navy">
            £{goal.saved.toLocaleString()} of £{goal.target.toLocaleString()}
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[rgba(236,236,240,0.5)]">
          <div
            className={`h-full rounded-full ${goal.progressColor}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-4 border-t border-[var(--color-border)] pt-6 sm:grid-cols-2">
        <div>
          <p className="text-xs text-muted">Monthly Required</p>
          <p className="mt-1 flex items-center gap-2 font-medium text-navy">
            <span className="text-teal">£</span>
            {goal.monthlyRequired}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted">Each Partner</p>
          <p className="mt-1 flex items-center gap-2 font-medium text-navy">
            <Users className="size-4 text-teal" />
            {goal.perPartner}
          </p>
        </div>
      </div>
    </article>
  )
}

export function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS)
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="mx-auto max-w-[1152px] px-6 py-8">
      <PageHeader
        title="Shared Goals"
        subtitle="Build your future together, one goal at a time"
        action={
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="gradient-primary flex items-center gap-2 rounded-xl px-4 py-2 text-base font-medium text-white"
          >
            <Plus className="size-4" />
            Add Goal
          </button>
        }
      />

      <div className="mt-8 space-y-6">
        {showForm && (
          <CreateGoalForm
            onSubmit={(data) => {
              setGoals((prev) => [createGoalFromForm(data), ...prev])
              setShowForm(false)
            }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  )
}
