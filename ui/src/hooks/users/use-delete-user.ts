import { useState } from "react"
import { messageErrorDefault } from "../constants"
import { useToken } from "../auths/use-token"

export default function useDeleteUser() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const { token } = useToken()


  const deleteUserById = async (id: number): Promise<void> => {
    setIsLoading(true)
    setSuccessMsg('')
    setErrorMsg('')

    const url = `${import.meta.env.VITE_API_URL}/user/${id}`
    const headers = { Authorization: `Bearer ${token}` }
    const response = await fetch(url, {
      method: "DELETE",
      headers
    })

    if (response.status >= 500 && response.status < 599) {
      setErrorMsg(messageErrorDefault)
      return
    }

    try {
      if (response.status >= 400 && response.status < 499) {
        const data = await response.json()
        setErrorMsg(data.message ? data.message : messageErrorDefault)
      } else {
        setSuccessMsg('Usuário deletado.')
        setErrorMsg('')
      }
    } catch (ex) {
      setSuccessMsg('')
      setErrorMsg(messageErrorDefault)
    } finally {
      setIsLoading(false)
    }
  }


  return { isLoading, errorMsg, successMsg, deleteUserById }
}