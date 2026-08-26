import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useTheme } from './useTheme'

function mockSystemTheme(prefersDark: boolean) {
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: prefersDark }))
}

beforeEach(() => {
  window.localStorage.clear()
  delete document.documentElement.dataset.theme
})

afterEach(() => vi.unstubAllGlobals())

describe('useTheme', () => {
  it('uses the system theme and saves changes', () => {
    mockSystemTheme(true)
    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')

    act(() => result.current.toggleTheme())

    expect(result.current.theme).toBe('light')
    expect(window.localStorage.getItem('support-dashboard-theme')).toBe('light')
  })

  it('prefers a saved theme over the system setting', () => {
    window.localStorage.setItem('support-dashboard-theme', 'light')
    mockSystemTheme(true)

    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
  })
})
