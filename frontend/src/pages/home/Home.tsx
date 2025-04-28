import { useEffect } from "react"

function HomePage() {

  useEffect(() => {
    document.title = "Home"
  }, [])
  return (
    <div>bem vindo</div>
  )
}

export default HomePage
