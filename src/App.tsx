import { useEffect, useMemo, useState } from 'react'
import { DashboardControls } from './components/DashboardControls'
import { Pagination } from './components/Pagination'
import { StatCard } from './components/StatCard'
import { UserTable } from './components/UserTable'
import { useDebouncedValue } from './hooks/useDebouncedValue'
import { useUsers } from './hooks/useUsers'
import type { SortKey } from './types/user'
import { filterUsers, getCities, getCompanies, sortUsers } from './utils/dashboard'
import { createDashboardParams, readDashboardParams } from './utils/dashboardParams'
import './App.css'

const PAGE_SIZE = 5

function App() {
  const { users, loading, error } = useUsers()
  const [dashboardState, setDashboardState] = useState(readDashboardParams)
  const { search, company, city, page, sort } = dashboardState
  const debouncedSearch = useDebouncedValue(search, 300)
  const searching = search !== debouncedSearch

  const companies = useMemo(() => getCompanies(users), [users])
  const cities = useMemo(() => getCities(users), [users])
  const activeCompany = !loading && company && !companies.includes(company) ? '' : company
  const activeCity = !loading && city && !cities.includes(city) ? '' : city
  const filteredUsers = useMemo(
    () => filterUsers(users, { search: debouncedSearch, company: activeCompany, city: activeCity }),
    [users, debouncedSearch, activeCompany, activeCity],
  )
  const sortedUsers = useMemo(() => sortUsers(filteredUsers, sort), [filteredUsers, sort])

  const distinctCompanies = new Set(filteredUsers.map((user) => user.company.name)).size
  const distinctCities = new Set(filteredUsers.map((user) => user.address.city)).size
  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE))
  const activePage = loading ? page : Math.min(page, pageCount)
  const visibleUsers = sortedUsers.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE)

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
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Customer records</p>
          <h1>Support Dashboard</h1>
        </div>
        <div className="avatar" aria-label="Signed in as Bartu Hacilar">
          BH
        </div>
      </header>

      <main>
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

        <section className="table-panel" aria-labelledby="customer-heading">
          <div className="panel-heading">
            <div>
              <h2 id="customer-heading">Customers</h2>
              <p>Review customer contact and company details.</p>
            </div>
          </div>

          {loading && <div className="status-message">Loading customers...</div>}
          {error && <div className="status-message error-message">{error}</div>}
          {!loading && !error && (
            <>
              <UserTable users={visibleUsers} sort={sort} onSort={updateSort} />
              <Pagination
                page={activePage}
                pageSize={PAGE_SIZE}
                total={filteredUsers.length}
                onPageChange={updatePage}
              />
            </>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
