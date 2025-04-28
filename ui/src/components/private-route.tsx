import { Navigate, Outlet } from "react-router";
import { useToken } from "../hooks/auths/use-token";
import { routePaths } from "../routes";

export default function PrivateRoute() {
  const { isAuthenticated } = useToken()

  return isAuthenticated ? <Outlet /> : <Navigate to={routePaths.authLogin} />
}