import { Link } from "react-router";
import { routePaths } from "../../routes";
import { useEffect } from "react";

export default function SettingsPage() {

  useEffect(() => {
    document.title = "Configurações"
  })

  return (
    <div>
      <section>
        <div>
          <span>Opções</span>
        </div>
        <div><Link to={routePaths.listUsers}>Usuários</Link></div>
      </section>
    </div>
  )
}