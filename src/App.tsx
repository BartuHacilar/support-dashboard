import { UserTable } from './components/UserTable'
import { useUsers } from './hooks/useUsers'
import './App.css'

function App() {
  const { users, loading, error } = useUsers()

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
        <section className="table-panel" aria-labelledby="customer-heading">
          <div className="panel-heading">
            <div>
              <h2 id="customer-heading">Customers</h2>
              <p>Review customer contact and company details.</p>
            </div>
          </div>

          {loading && <div className="status-message">Loading customers...</div>}
          {error && <div className="status-message error-message">{error}</div>}
          {!loading && !error && <UserTable users={users} />}
        </section>
      </main>
    </div>
  )
}

export default App
