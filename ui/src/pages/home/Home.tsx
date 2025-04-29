import { useEffect } from "react"
import Header from "../../components/header"

function HomePage() {

  useEffect(() => {
    document.title = "Home"
  }, [])
  return (
    <>
      <Header />
      <div>bem vindo</div>
    </>
  )
}

export default HomePage
