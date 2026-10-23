import { useState } from 'react'
import { Calendar, ChevronDown } from 'lucide-react'
import { GOAL_CATEGORIES } from '../lib/goalUtils'

export type CreateGoalFormData = {
  title: string
  target: number
  targetDate: Date
  category: string
}

type CreateGoalFormProps = {
  onSubmit: (data: CreateGoalFormData) => void
  onCancel: () => void
}

const inputClassName =
  'w-full rounded-xl border border-[var(--color-border)] bg-[#f3f3f5] px-4 py-2.5 text-base text-navy placeholder:text-navy/50 outline-none focus:border-teal'

export function CreateGoalForm({ onSubmit, onCancel }: CreateGoalFormProps) {
  const [title, setTitle] = useState('')
  const [target, setTarget] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const parsedTarget = Number(target.replace(/,/g, ''))
    const parsedDate = new Date(targetDate)

    if (!title.trim() || !parsedTarget || !targetDate || !category) {
      return
    }

    onSubmit({
      title: title.trim(),
      target: parsedTarget,
      targetDate: parsedDate,
      category,
    })
  }

  return (
    <article className="rounded-none border border-[var(--color-border)] bg-white p-6">
      <h2 className="text-lg font-medium text-navy">Create New Goal</h2>

      <form onSubmit={handleSubmit} className="mt-4 space-y-6">
        <div>
          <label htmlFor="goal-name" className="text-base font-medium text-navy">
            Goal Name
          </label>
          <input
            id="goal-name"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Down Payment for House"
            className={`${inputClassName} mt-2`}
            required
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="target-amount" className="text-base font-medium text-navy">
              Target Amount
            </label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-muted">
                £
              </span>
              <input
                id="target-amount"
                type="number"
                min="1"
                step="1"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="50000"
                className={`${inputClassName} pl-8`}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="target-date" className="text-base font-medium text-navy">
              Target Date
            </label>
            <div className="relative mt-2">
              <Calendar className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                id="target-date"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className={`${inputClassName} pl-10`}
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="category" className="text-base font-medium text-navy">
            Category
          </label>
          <div className="relative mt-2">
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`${inputClassName} appearance-none pr-10`}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {GOAL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="gradient-primary rounded-xl px-6 py-2 text-base font-medium text-white"
          >
            Create Goal
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl bg-[#ececf0] px-6 py-2 text-base font-medium text-navy"
          >
            Cancel
          </button>
        </div>
      </form>
    </article>
  )
}
