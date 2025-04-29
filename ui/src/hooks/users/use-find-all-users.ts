import { useState } from "react"
import { User } from "./use-user.ts"
import { messageErrorDefault } from "../constants.ts"
import { useToken } from "../auths/use-token.ts"

export type PaginatedList<T> = {
  page: number
  limit: number
  total: number
  pages: number
  data: T[]
}

const defaultPaginetedUsers = {
  data: [],
  limit: 8,
  page: 0,
  pages: 0,
  total: 0
}

export const useFindAllUsers = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState(false)
  const [paginatedUsers, setPaginetedUsers] = useState<PaginatedList<User>>({ ...defaultPaginetedUsers })

  const { token } = useToken()

  const findUsers = async (searchQuery: string = '', page = paginatedUsers.page, limit = paginatedUsers.limit): Promise<void> => {
    setIsLoading(true)

    const url = `${import.meta.env.VITE_API_URL}/user?q=${searchQuery}&page=${page}&limit=${limit}`
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    const response = await fetch(url, { method: "GET", headers })

    if (response.status >= 500 && response.status < 599) {
      setError(messageErrorDefault)
      return
    }

    try {
      const data = await response.json()
      if (response.status >= 400 && response.status < 499 && data.message) {
        setError(data.message)
        return
      }

      setOk(true)
      setPaginetedUsers({
        page: data.page,
        limit: data.limit,
        total: data.total,
        pages: data.pages,
        data: data.users,
      })

    } catch (ex) {
      setError(messageErrorDefault)
    } finally {
      setIsLoading(false)

    }
  }


  return { isLoading, error, ok, paginatedUsers, findUsers }
}