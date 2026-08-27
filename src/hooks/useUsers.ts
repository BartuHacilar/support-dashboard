import { useEffect, useState } from 'react'
import type { User } from '../types/user'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchUsers() {
      try {
        const response = await fetch(USERS_URL, { signal: controller.signal })

        if (!response.ok) {
          throw new Error('Request failed')
        }

        const data: User[] = await response.json()
        setUsers(data)
      } catch (requestError) {
        if (requestError instanceof Error && requestError.name !== 'AbortError') {
          setError('We could not load the customers. Please try again later.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchUsers()
    // Cancel the request when the component unmounts
    return () => controller.abort()
  }, [])

  return { users, loading, error }
}
