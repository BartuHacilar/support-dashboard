import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { User } from '../types/user'
import { UserTable } from './UserTable'

const user: User = {
  id: 1,
  name: 'Leanne Graham',
  email: 'leanne@example.com',
  company: { name: 'Romaguera-Crona' },
  address: { city: 'Gwenborough' },
}

describe('UserTable', () => {
  it('renders customer fields and handles column sorting', () => {
    const onSort = vi.fn()
    render(
      <UserTable
        users={[user]}
        sort={{ key: 'name', direction: 'asc' }}
        onSort={onSort}
      />,
    )

    expect(screen.getByText('Leanne Graham')).toBeVisible()
    expect(screen.getByRole('link', { name: 'leanne@example.com' })).toHaveAttribute(
      'href',
      'mailto:leanne@example.com',
    )
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute(
      'aria-sort',
      'ascending',
    )

    fireEvent.click(screen.getByRole('button', { name: 'Company' }))
    expect(onSort).toHaveBeenCalledWith('company')
  })

  it('shows the empty state when no customers match', () => {
    render(
      <UserTable
        users={[]}
        sort={{ key: 'name', direction: 'asc' }}
        onSort={vi.fn()}
      />,
    )

    expect(screen.getByRole('status')).toHaveTextContent('No customers found')
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })
})
