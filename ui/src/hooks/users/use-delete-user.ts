import { useState } from "react"
import { messageErrorDefault } from "../constants"
import { useToken } from "../auths/use-token"

export default function useDeleteUser() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [ok, setOk] = useState(false)

  const { token } = useToken()


  const deleteUserById = async (id: number): Promise<void> => {
    setIsLoading(true)

    const url = `${import.meta.env.VITE_API_URL}/user/${id}`
    const headers = { Authorization: `Bearer ${token}` }
    const response = await fetch(url, {
      method: "DELETE",
      headers
    })

    if (response.status >= 500 && response.status < 599) {
      setError(messageErrorDefault)
      return
    }

    try {
      if (response.status >= 400 && response.status < 499) {
        const data = await response.json()
        setError(data.message ? data.message : messageErrorDefault)
      } else {
        setOk(true)
        setSuccess('Usuário deletado.')
        setError('')
      }
    } catch (ex) {
      setError(messageErrorDefault)
    } finally {
      setIsLoading(false)
    }
  }


  return { isLoading, error, ok, success, deleteUserById }
}