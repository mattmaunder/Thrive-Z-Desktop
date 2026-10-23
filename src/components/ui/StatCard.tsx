type StatCardProps = {
  value: string
  label: string
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="gradient-primary rounded-none p-6 text-white">
      <p className="text-3xl">{value}</p>
      <p className="mt-1 text-sm text-white/80">{label}</p>
    </div>
  )
}
