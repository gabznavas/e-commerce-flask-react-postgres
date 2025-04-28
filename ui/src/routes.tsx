import { Route, Routes, Navigate } from 'react-router'

import ListUsersPage from './pages/user/list-users-page'
import FormUserPage from './pages/user/form-user-page'
import LoginPage from './pages/auth/login-page'
import PrivateRoute from './components/private-route'
import SettingsPage from './pages/settings/settings-page'
import HomePage from './pages/home/Home'

export const routePaths = {
  home: "/",

  listUsers: "/user/list",
  createUser: "/user/form",
  settings: "/settings",

  editUser: "/user/form",
  authLogin: "/auth/login"
}

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path={routePaths.home} element={<HomePage />} />
      <Route path={routePaths.authLogin} element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route path={routePaths.settings} element={<SettingsPage />} />
        <Route path={routePaths.listUsers} element={<ListUsersPage />} />
        <Route path={routePaths.createUser} element={<FormUserPage />} />
        <Route path={`${routePaths.editUser}/:userId`} element={<FormUserPage />} />
        <Route path="*" element={<Navigate to={routePaths.home} replace />} />
      </Route>
    </Routes>
  )
}

export default RoutesComponent