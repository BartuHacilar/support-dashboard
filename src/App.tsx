import { useEffect, useMemo, useState } from 'react'
import { DashboardControls } from './components/DashboardControls'
import { Pagination } from './components/Pagination'
import { StatCard } from './components/StatCard'
import { ThemeToggle } from './components/ThemeToggle'
import { UserTable } from './components/UserTable'
import { useDebouncedValue } from './hooks/useDebouncedValue'
import { useTheme } from './hooks/useTheme'
import { useUsers } from './hooks/useUsers'
import type { SortKey } from './types/user'
import { filterUsers, getCities, getCompanies, sortUsers } from './utils/dashboard'
import { createDashboardParams, readDashboardParams } from './utils/dashboardParams'
import './App.css'

const PAGE_SIZE = 5

function App() {
  const { users, loading, error } = useUsers()
  const { theme, toggleTheme } = useTheme()
  const [dashboardState, setDashboardState] = useState(readDashboardParams)
  const { search, company, city, page, sort } = dashboardState
  const debouncedSearch = useDebouncedValue(search, 300)
  const searching = search !== debouncedSearch

  const companies = useMemo(() => getCompanies(users), [users])
  const cities = useMemo(() => getCities(users), [users])
  // Ignore filters that are no longer available
  const activeCompany = !loading && company && !companies.includes(company) ? '' : company
  const activeCity = !loading && city && !cities.includes(city) ? '' : city
  const filteredUsers = useMemo(
    () => filterUsers(users, { search: debouncedSearch, company: activeCompany, city: activeCity }),
    [users, debouncedSearch, activeCompany, activeCity],
  )
  const sortedUsers = useMemo(() => sortUsers(filteredUsers, sort), [filteredUsers, sort])

  const distinctCompanies = new Set(filteredUsers.map((user) => user.company.name)).size
  const distinctCities = new Set(filteredUsers.map((user) => user.address.city)).size
  // Keep the current page within the filtered results
  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE))
  const activePage = loading ? page : Math.min(page, pageCount)
  const visibleUsers = sortedUsers.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE)

  // Keep the dashboard state in the URL
  useEffect(() => {
    const params = createDashboardParams({
      search: debouncedSearch,
      company: activeCompany,
      city: activeCity,
      page: activePage,
      sort,
    })
    const query = params.size > 0 ? `?${params.toString()}` : ''
    window.history.replaceState(null, '', `${window.location.pathname}${query}${window.location.hash}`)
  }, [debouncedSearch, activeCompany, activeCity, activePage, sort])

  function updateSearch(value: string) {
    setDashboardState((current) => ({ ...current, search: value, page: 1 }))
  }

  function updateCompany(value: string) {
    setDashboardState((current) => ({ ...current, company: value, page: 1 }))
  }

  function updateCity(value: string) {
    setDashboardState((current) => ({ ...current, city: value, page: 1 }))
  }

  function updateSort(key: SortKey) {
    setDashboardState((current) => ({
      ...current,
      sort: {
        key,
        direction: current.sort.key === key && current.sort.direction === 'asc' ? 'desc' : 'asc',
      },
      page: 1,
    }))
  }

  function updatePage(nextPage: number) {
    setDashboardState((current) => ({ ...current, page: nextPage }))
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="app-shell">
        <header className="topbar">
          <div>
            <p className="eyebrow">Customer records</p>
            <h1>Support Dashboard</h1>
          </div>
          <div className="header-actions">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <div className="avatar" aria-label="Signed in as Bartu Hacilar">
              BH
            </div>
          </div>
        </header>

        <main id="main-content" tabIndex={-1}>
          <section className="stats-grid" aria-label="Customer summary">
            <StatCard label="Total records" value={filteredUsers.length} tone="indigo" icon="users" />
            <StatCard label="Companies" value={distinctCompanies} tone="teal" icon="building" />
            <StatCard label="Cities" value={distinctCities} tone="orange" icon="pin" />
          </section>

          <DashboardControls
            search={search}
            company={activeCompany}
            city={activeCity}
            companies={companies}
            cities={cities}
            searching={searching}
            onSearchChange={updateSearch}
            onCompanyChange={updateCompany}
            onCityChange={updateCity}
          />

          <section
            className="table-panel"
            aria-labelledby="customer-heading"
            aria-busy={loading || searching}
          >
            <div className="panel-heading">
              <div>
                <h2 id="customer-heading">Customers</h2>
                <p>Review customer contact and company details.</p>
              </div>
            </div>

            {loading && (
              <div className="status-message" role="status" aria-live="polite">
                <span className="loading-indicator" aria-hidden="true" />
                Loading customers...
              </div>
            )}
            {error && <div className="status-message error-message" role="alert">{error}</div>}
            {!loading && !error && (
              <>
                <p className="sr-only" role="status" aria-live="polite">
                  {filteredUsers.length} customers found
                </p>
                <UserTable users={visibleUsers} sort={sort} onSort={updateSort} />
                {filteredUsers.length > 0 && (
                  <Pagination
                    page={activePage}
                    pageSize={PAGE_SIZE}
                    total={filteredUsers.length}
                    onPageChange={updatePage}
                  />
                )}
              </>
            )}
          </section>
        </main>
      </div>
    </>
  )
}

export default App
