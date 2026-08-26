import type { SortConfig, SortKey, User } from '../types/user'

interface UserTableProps {
  users: User[]
  sort: SortConfig
  onSort: (key: SortKey) => void
}

const columns: { label: string; key: SortKey }[] = [
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Company', key: 'company' },
  { label: 'City', key: 'city' },
]

export function UserTable({ users, sort, onSort }: UserTableProps) {
  if (users.length === 0) {
    return (
      <div className="empty-state">
        <strong>No customers found</strong>
        <p>Try changing your search or filters.</p>
      </div>
    )
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                aria-sort={sort.key === column.key ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                <button type="button" className="sort-button" onClick={() => onSort(column.key)}>
                  {column.label}
                  <span className={sort.key === column.key ? 'sort-icon active' : 'sort-icon'} aria-hidden="true">
                    {sort.key === column.key && sort.direction === 'desc' ? '↓' : '↑'}
                  </span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="customer-name">{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>{user.company.name}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
