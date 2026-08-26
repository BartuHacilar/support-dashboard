export interface User {
  id: number
  name: string
  email: string
  address: {
    city: string
  }
  company: {
    name: string
  }
}

export type SortKey = 'name' | 'email' | 'company' | 'city'
export type SortDirection = 'asc' | 'desc'

export interface SortConfig {
  key: SortKey
  direction: SortDirection
}
