import { useCallback } from "react";

const TOKEN = "token"

export function useToken() {
  const token = localStorage.getItem(TOKEN)

  const setToken = useCallback((token: string) => {
    localStorage.setItem(TOKEN, token)
  }, [])

  const logout = useCallback(() => {
    localStorage.clear()
  }, [])

  return {
    isAuthenticated: !!token,
    token,
    setToken,
    logout
  }
}