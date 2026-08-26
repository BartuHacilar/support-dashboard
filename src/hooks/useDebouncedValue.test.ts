import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useDebouncedValue } from './useDebouncedValue'

afterEach(() => vi.useRealTimers())

describe('useDebouncedValue', () => {
  it('updates after the requested delay', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      { initialProps: { value: 'first' } },
    )

    rerender({ value: 'second' })
    expect(result.current).toBe('first')

    act(() => vi.advanceTimersByTime(300))
    expect(result.current).toBe('second')
  })
})
