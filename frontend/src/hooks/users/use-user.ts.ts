export type User = {
  id: number
  name: string
  email: string
}

const USER = "user"

export const useUser = () => {
  const setUser = (user: User) => {
    const payload = JSON.stringify(user)
    localStorage.setItem(USER, payload)
  }

  return { setUser }
}