import { useState } from "react"
import { UserForm } from "./types"
import { messageErrorDefault } from "../constants"
import { useToken } from "../auths/use-token"


const url = `${import.meta.env.VITE_API_URL}/user/:userId`

const userUpdateUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [ok, setOk] = useState(false)

  const { token } = useToken()

  const updateUser = async (userId: string, data: UserForm): Promise<void> => {
    setIsLoading(true)
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }

    const response = await fetch(url.replace(":userId", userId.toString()), {
      method: "PUT", headers, body: JSON.stringify(data)
    })


    if (response.status >= 500 && response.status < 599) {
      setError(messageErrorDefault)
      return
    }

    try {
      if (response.status >= 400 && response.status < 499) {
        const { message } = await response.json()
        setError(message)
      } else {
        setOk(true)
      }
    } catch {
      setError(messageErrorDefault)
    } finally {
      setIsLoading(false)
    }
  }


  return { isLoading, error, ok, updateUser }
}


export default userUpdateUser