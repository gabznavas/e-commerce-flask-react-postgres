import { useState } from "react"

import { messageErrorDefault } from "../constants"
import { User } from "./use-user.ts"
import { useToken } from "../auths/use-token.ts"

const url = `${import.meta.env.VITE_API_URL}/user/:id`

export default function useFindUserById() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const { token } = useToken()

  const fetchUserById = async (id: string): Promise<User | null> => {
    try {
      const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      const response = await fetch(url.replace(":id", id), { method: "GET", headers })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || messageErrorDefault)
      }

      const data = await response.json()
      return data.user || null
    } catch (ex: any) {
      throw new Error(ex?.message || messageErrorDefault)
    }
  }

  const findUserById = async (id: string) => {
    setIsLoading(true)
    setError(null)
    setOk(false)
    try {
      const userData = await fetchUserById(id)
      setUser(userData)
      setOk(true)
    } catch (ex: any) {
      setError(ex.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, error, ok, findUserById, user: user! }
}
