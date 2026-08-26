import { describe, expect, it } from 'vitest'
import { createDashboardParams, readDashboardParams } from './dashboardParams'

describe('dashboard URL parameters', () => {
  it('reads filters, sorting, and pagination', () => {
    const state = readDashboardParams(
      '?q=leanne&company=Romaguera-Crona&city=Gwenborough&sort=email&direction=desc&page=2',
    )

    expect(state).toEqual({
      search: 'leanne',
      company: 'Romaguera-Crona',
      city: 'Gwenborough',
      page: 2,
      sort: { key: 'email', direction: 'desc' },
    })
  })

  it('uses safe defaults for invalid values', () => {
    const state = readDashboardParams('?sort=unknown&direction=sideways&page=-4')

    expect(state.page).toBe(1)
    expect(state.sort).toEqual({ key: 'name', direction: 'asc' })
  })

  it('only writes values that differ from the defaults', () => {
    const params = createDashboardParams({
      search: '  Graham  ',
      company: '',
      city: 'Gwenborough',
      page: 2,
      sort: { key: 'name', direction: 'desc' },
    })

    expect(params.toString()).toBe('q=Graham&city=Gwenborough&direction=desc&page=2')
  })
})
