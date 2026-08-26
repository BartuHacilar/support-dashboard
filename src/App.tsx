import { useMemo, useState } from 'react'
import { DashboardControls } from './components/DashboardControls'
import { Pagination } from './components/Pagination'
import { StatCard } from './components/StatCard'
import { UserTable } from './components/UserTable'
import { useUsers } from './hooks/useUsers'
import type { SortConfig, SortKey } from './types/user'
import { filterUsers, getCities, getCompanies, sortUsers } from './utils/dashboard'
import './App.css'

const PAGE_SIZE = 5

function App() {
  const { users, loading, error } = useUsers()
  const [search, setSearch] = useState('')
  const [company, setCompany] = useState('')
  const [city, setCity] = useState('')
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<SortConfig>({ key: 'name', direction: 'asc' })

  const companies = useMemo(() => getCompanies(users), [users])
  const cities = useMemo(() => getCities(users), [users])
  const filteredUsers = useMemo(
    () => filterUsers(users, { search, company, city }),
    [users, search, company, city],
  )
  const sortedUsers = useMemo(() => sortUsers(filteredUsers, sort), [filteredUsers, sort])

  const visibleUsers = sortedUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const distinctCompanies = new Set(filteredUsers.map((user) => user.company.name)).size
  const distinctCities = new Set(filteredUsers.map((user) => user.address.city)).size

  function updateSearch(value: string) {
    setSearch(value)
    setPage(1)
  }

  function updateCompany(value: string) {
    setCompany(value)
    setPage(1)
  }

  function updateCity(value: string) {
    setCity(value)
    setPage(1)
  }

  function updateSort(key: SortKey) {
    setSort((current) => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }))
    setPage(1)
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
          company={company}
          city={city}
          companies={companies}
          cities={cities}
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
                page={page}
                pageSize={PAGE_SIZE}
                total={filteredUsers.length}
                onPageChange={setPage}
              />
            </>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
