interface DashboardControlsProps {
  search: string
  company: string
  city: string
  companies: string[]
  cities: string[]
  onSearchChange: (value: string) => void
  onCompanyChange: (value: string) => void
  onCityChange: (value: string) => void
}

export function DashboardControls({
  search,
  company,
  city,
  companies,
  cities,
  onSearchChange,
  onCompanyChange,
  onCityChange,
}: DashboardControlsProps) {
  return (
    <div className="controls">
      <label className="search-box">
        <span className="sr-only">Search by name or email</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
        <input
          type="search"
          value={search}
          placeholder="Search by name or email..."
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className="select-group">
        <label>
          <span>Company</span>
          <select value={company} onChange={(event) => onCompanyChange(event.target.value)}>
            <option value="">All companies</option>
            {companies.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>

        <label>
          <span>City</span>
          <select value={city} onChange={(event) => onCityChange(event.target.value)}>
            <option value="">All cities</option>
            {cities.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
    </div>
  )
}
