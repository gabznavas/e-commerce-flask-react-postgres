import { HTMLAttributes, useEffect } from "react";
import { useNavigate } from "react-router";

import { routePaths } from "../../routes";
import Header from "../../components/header";

export default function SettingsPage() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Configurações"
  })

  return (
    <>
      <Header />
      <section className="flex justify-center w-full pt-20">

        <div className="flex flex-col w-80 gap-5">
          <div className="flex justify-center">
            <span className="text-orange-500 text-xl font-bold">Configurações</span>
          </div>
          <ul className="flex flex-col gap-1">
            <SettingsItem onClick={() => navigate(routePaths.listUsers)}>Usuários</SettingsItem>
            <SettingsItem onClick={() => navigate(routePaths.listUsers)}>Produtos</SettingsItem>
          </ul>

        </div>
      </section>
    </>
  )
}

type SettingsItemProps = {
  onClick: () => void
} & HTMLAttributes<HTMLElement>
const SettingsItem = ({ children, onClick, ...rest }: SettingsItemProps) => {
  return (
    <li {...rest} className="bg-gray-300 font-semibold text-gray-700 p-4 rounded-md cursor-pointer" onClick={onClick}>
      {children}
    </li>
  )
}