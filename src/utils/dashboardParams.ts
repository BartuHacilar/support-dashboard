import type { SortDirection, SortKey } from '../types/user'

export interface DashboardState {
  search: string
  company: string
  city: string
  page: number
  sort: {
    key: SortKey
    direction: SortDirection
  }
}

const sortKeys: SortKey[] = ['name', 'email', 'company', 'city']

function isSortKey(value: string | null): value is SortKey {
  return value !== null && sortKeys.includes(value as SortKey)
}

export function readDashboardParams(search = window.location.search): DashboardState {
  const params = new URLSearchParams(search)
  const pageValue = Number(params.get('page'))
  const sortValue = params.get('sort')
  const directionValue = params.get('direction')

  return {
    search: params.get('q') ?? '',
    company: params.get('company') ?? '',
    city: params.get('city') ?? '',
    page: Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1,
    sort: {
      key: isSortKey(sortValue) ? sortValue : 'name',
      direction: directionValue === 'desc' ? 'desc' : 'asc',
    },
  }
}

export function createDashboardParams(state: DashboardState) {
  const params = new URLSearchParams()
  const query = state.search.trim()

  if (query) params.set('q', query)
  if (state.company) params.set('company', state.company)
  if (state.city) params.set('city', state.city)
  if (state.sort.key !== 'name') params.set('sort', state.sort.key)
  if (state.sort.direction !== 'asc') params.set('direction', state.sort.direction)
  if (state.page > 1) params.set('page', String(state.page))

  return params
}
