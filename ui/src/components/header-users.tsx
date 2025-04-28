import { Link } from "react-router"
import { routePaths } from "../routes"

const HeaderUsers = () => {
  return (
    <header>
      <nav>
        <span>
          <Link to={routePaths.createUser}>Criar usuário</Link>
        </span>
        <span>{' | '}</span>
        <span>
          <Link to={routePaths.listUsers}>Listar usuários</Link>
        </span>
      </nav>
      <br />
    </header>
  )
}

export default HeaderUsers
