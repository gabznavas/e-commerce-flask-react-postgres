import { useEffect, useState } from "react"
import { useToken } from "./use-token"
import { useNavigate } from "react-router"
import { routePaths } from "../../routes"

const messageErrorDefault = "Algo deu problema, tente novamente mais tarde!"
const url = `${import.meta.env.VITE_API_URL}/auth/login`
const headers = {
  'Content-Type': 'application/json',
}

export function useLogin() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [ok, setOk] = useState(false)

  const navigate = useNavigate()
  const { isAuthenticated, setToken } = useToken()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routePaths.home)
    }
  }, [])

  const login = async (email: string, password: string): Promise<void> => {
    setError('')
    setIsLoading(true)

    const payload = JSON.stringify({ email, password })
    const response = await fetch(url, { method: "POST", headers: headers, body: payload })

    if (response.status >= 500 && response.status < 599) setError(messageErrorDefault)

    try {
      const data = await response.json()
      if (response.status >= 400 && response.status < 499) {
        setError(data.message ? data.message : messageErrorDefault)
        return
      } else {
        setOk(true)
        setToken(data.token)
      }
    } catch (ex) {
      setError(messageErrorDefault)
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading, error, loginSuccess: ok, }
}