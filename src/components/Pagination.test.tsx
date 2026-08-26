import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('shows the result range and changes page', () => {
    const onPageChange = vi.fn()
    render(<Pagination page={1} pageSize={5} total={10} onPageChange={onPageChange} />)

    expect(screen.getByText('Previous')).toBeDisabled()
    expect(screen.getByText('Showing', { exact: false })).toHaveTextContent('Showing 1-5 of 10')

    fireEvent.click(screen.getByText('Next'))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('handles an empty result set', () => {
    render(<Pagination page={1} pageSize={5} total={0} onPageChange={vi.fn()} />)

    expect(screen.getByText('Showing', { exact: false })).toHaveTextContent('Showing 0-0 of 0')
    expect(screen.getByText('Next')).toBeDisabled()
  })
})
