import { describe, expect, it } from 'vitest'
import type { User } from '../types/user'
import { filterUsers, getCities, getCompanies, sortUsers } from './dashboard'

const users: User[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    email: 'leanne@example.com',
    company: { name: 'Beta Group' },
    address: { city: 'London' },
  },
  {
    id: 2,
    name: 'Ervin Howell',
    email: 'ervin@example.com',
    company: { name: 'Alpha LLC' },
    address: { city: 'Berlin' },
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    email: 'clementine@example.com',
    company: { name: 'Beta Group' },
    address: { city: 'Berlin' },
  },
]

describe('filterUsers', () => {
  it('searches names and emails without matching case', () => {
    expect(filterUsers(users, { search: 'LEANNE', company: '', city: '' })).toEqual([users[0]])
    expect(filterUsers(users, { search: 'ervin@', company: '', city: '' })).toEqual([users[1]])
  })

  it('combines search, company, and city filters', () => {
    const result = filterUsers(users, {
      search: 'clementine',
      company: 'Beta Group',
      city: 'Berlin',
    })

    expect(result).toEqual([users[2]])
  })
})

describe('sortUsers', () => {
  it('sorts nested fields in both directions without changing the source', () => {
    const source = [...users]
    const ascending = sortUsers(users, { key: 'company', direction: 'asc' })
    const descending = sortUsers(users, { key: 'city', direction: 'desc' })

    expect(ascending.map((user) => user.name)).toEqual([
      'Ervin Howell',
      'Leanne Graham',
      'Clementine Bauch',
    ])
    expect(descending[0].address.city).toBe('London')
    expect(users).toEqual(source)
  })
})

it('returns sorted unique filter options', () => {
  expect(getCompanies(users)).toEqual(['Alpha LLC', 'Beta Group'])
  expect(getCities(users)).toEqual(['Berlin', 'London'])
})
