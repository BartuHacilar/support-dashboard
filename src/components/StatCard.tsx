interface StatCardProps {
  label: string
  value: number
  tone: 'indigo' | 'teal' | 'orange'
  icon: 'users' | 'building' | 'pin'
}

const paths = {
  users: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87m0-12.26a4 4 0 0 1 0 7.75" />,
  building: <path d="M3 21h18M6 21V5l6-2v18m6 0V9l-6-2M9 8v.01M9 12v.01M9 16v.01M15 12v.01M15 16v.01" />,
  pin: <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Zm-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />,
}

export function StatCard({ label, value, tone, icon }: StatCardProps) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`} aria-hidden="true">
        <svg viewBox="0 0 24 24">{paths[icon]}</svg>
      </div>
      <div>
        <p>{label}</p>
        <strong aria-live="polite">{value}</strong>
      </div>
    </article>
  )
}
