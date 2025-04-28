import { useState } from "react"
import { UserForm } from "./types"
import { messageErrorDefault } from "../constants"
import { useToken } from "../auths/use-token"

const url = `${import.meta.env.VITE_API_URL}/user`
const passwordNotEquals = "Senha diferente da confirmação de senha."


const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [focusInput, setFocusInput] = useState('')
  const [ok, setOk] = useState(false)

  const { token } = useToken()

  const createUser = async (data: UserForm): Promise<void> => {
    if (data.password !== data.passwordConfirmation) {
      setError(passwordNotEquals)
      setFocusInput("password")
      return
    }

    setIsLoading(true)

    const payload = JSON.stringify(data)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    const response = await fetch(url, { method: "POST", headers: headers, body: payload })
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
      }
    } catch {
      setError(messageErrorDefault)
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, error, ok, createUser, focusInput }
}


export default useCreateUser