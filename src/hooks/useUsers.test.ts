import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { User } from '../types/user'
import { useUsers } from './useUsers'

const user: User = {
  id: 1,
  name: 'Leanne Graham',
  email: 'leanne@example.com',
  company: { name: 'Romaguera-Crona' },
  address: { city: 'Gwenborough' },
}

afterEach(() => vi.unstubAllGlobals())

describe('useUsers', () => {
  it('loads users from the API', async () => {
    const response = {
      ok: true,
      json: vi.fn().mockResolvedValue([user]),
    } as unknown as Response
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response))

    const { result } = renderHook(() => useUsers())

    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.users).toEqual([user])
    expect(result.current.error).toBeNull()
  })

  it('returns a visible error when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))

    const { result } = renderHook(() => useUsers())

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.users).toEqual([])
    expect(result.current.error).toBe('We could not load the customers. Please try again later.')
  })
})
