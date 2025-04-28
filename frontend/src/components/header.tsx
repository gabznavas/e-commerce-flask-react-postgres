import { Link, useNavigate } from "react-router"
import { routePaths } from "../routes"
import { useToken } from "../hooks/auths/use-token"

const Header = () => {
  const { isAuthenticated, logout } = useToken()

  const navigate = useNavigate()

  const logoutOnClick = () => {
    logout()
    navigate(routePaths.authLogin)
  }

  return (
    <header>
      <nav>
        <span>
          <Link to="/">Home</Link>
        </span>
        {isAuthenticated && (
          <>
            <span>{' | '}</span>
            <span>
              <Link to={routePaths.settings}>Configurações</Link>
            </span>
            <span>{' | '}</span>
            <span>
              <span style={{ cursor: 'pointer' }} onClick={() => logoutOnClick()}>Sair</span>
            </span>
          </>
        )}
        {!isAuthenticated && (
          <>
            <span>{' | '}</span>
            <span>
              <Link to={routePaths.authLogin}>Entrar</Link>
            </span>
          </>
        )}
      </nav>
    </header >
  )
}

export default Header
