import { Link, useNavigate } from "react-router"
import { routePaths } from "../routes"
import { useToken } from "../hooks/auths/use-token"

import { FaShopify } from "react-icons/fa";


const Header = () => {
  return (
    <header className="flex bg-blue-600 w-full h-20 justify-between">
      <Logo />
      <MenuLeftList />
    </header >
  )
}


const MenuLeftList = () => {
  const { isAuthenticated } = useToken()

  return (
    <div className="flex p-4">
      {isAuthenticated && <MenuLeftListPrivate />}
      {!isAuthenticated && <MenuLeftListPublic />}
    </div>
  )
}

const MenuLeftListPublic = () => {
  const navigate = useNavigate()
  return (
    <>
      <MenuLeftItem onClick={() => navigate(routePaths.authLogin)} text="Login" />
    </>
  )
}

const MenuLeftListPrivate = () => {
  const navigate = useNavigate()

  const { logout } = useToken()

  const logoutOnClick = () => {
    logout()
    navigate(routePaths.authLogin)
  }

  return (
    <>
      <MenuLeftItem onClick={() => navigate(routePaths.settings)} text="Configurações" />
      <MenuLeftItem onClick={() => logoutOnClick()} text="Sair" />
    </>
  )
}


type MenuLeftItemProps = { onClick: () => void, text: string }
const MenuLeftItem = ({ text, onClick }: MenuLeftItemProps) => {
  return (
    <div className="flex gap-1.5 items-center p-4 cursor-pointer">
      <span onClick={onClick} className="text-white font-bold text-md" >{text}</span>
    </div>
  )
}

const Logo = () => {
  return (
    <div className="flex gap-1.5 items-center p-4">
      <FaShopify className="fill-white size-10" />
      <Link className="text-white font-bold text-lg" to="/">Navashop</Link>
    </div>
  )
}


export default Header
