import type { SortConfig, SortKey, User } from '../types/user'

interface UserFilters {
  search: string
  company: string
  city: string
}

function getSortValue(user: User, key: SortKey) {
  if (key === 'company') return user.company.name
  if (key === 'city') return user.address.city
  return user[key]
}

export function filterUsers(users: User[], filters: UserFilters) {
  const query = filters.search.trim().toLowerCase()

  return users.filter((user) => {
    const matchesSearch = !query
      || user.name.toLowerCase().includes(query)
      || user.email.toLowerCase().includes(query)
    const matchesCompany = !filters.company || user.company.name === filters.company
    const matchesCity = !filters.city || user.address.city === filters.city

    return matchesSearch && matchesCompany && matchesCity
  })
}

export function sortUsers(users: User[], sort: SortConfig) {
  // Sort a copy to keep the original list unchanged
  return [...users].sort((first, second) => {
    const result = getSortValue(first, sort.key).localeCompare(getSortValue(second, sort.key))
    return sort.direction === 'asc' ? result : -result
  })
}

export function getCompanies(users: User[]) {
  return [...new Set(users.map((user) => user.company.name))].sort()
}

export function getCities(users: User[]) {
  return [...new Set(users.map((user) => user.address.city))].sort()
}
