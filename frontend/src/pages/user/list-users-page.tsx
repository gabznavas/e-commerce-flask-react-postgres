import { useEffect } from "react"
import { useNavigate } from "react-router"
import { routePaths } from "../../routes"
import { SubmitHandler, useForm } from "react-hook-form"
import HeaderUsers from "../../components/header-users"
import { User } from "../../hooks/users/use-user.ts"
import { PaginatedList, useFindAllUsers } from "../../hooks/users/use-find-all-users.ts"
import useDeleteUser from "../../hooks/users/use-delete-user.ts"

type SearchInput = {
  search: string
}

const ListUsersPage = () => {

  const navigate = useNavigate()
  const {
    error: findAllErrors, findUsers, isLoading: isLoadingFindAll, paginatedUsers
  } = useFindAllUsers()
  const {
    deleteUserById, error: errorDelete, isLoading: isLoadingDelete, ok: deleteOk, success: deleteSuccess
  } = useDeleteUser()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SearchInput>()

  useEffect(() => {
    document.title = "Listar usuários"
    findUsers()
  }, [])

  useEffect(() => {
    if (deleteOk) {
      debugger
      findUsers()
    }
  }, [deleteOk])

  const editUserOnClick = (userId: number) => {
    navigate(`${routePaths.editUser}/${userId}`)
  }

  const removeUserOnClick = async (userId: number) => {
    if (confirm("Deseja remover esse usuário?")) {
      await deleteUserById(userId)
    }
  }

  const searchUsersOnSubmit: SubmitHandler<SearchInput> = async data => {
    await findUsers(data.search)
  }

  return (
    <div>
      <HeaderUsers />

      {isLoadingFindAll && <span>Carregando usuários, aguarde... <br /></span>}
      {isLoadingDelete && <span>Deletando, aguarde... <br /></span>}
      {findAllErrors && <span>{findAllErrors} <br /></span>}
      {errorDelete && <span>{errorDelete} <br /></span>}
      {deleteSuccess && <span>{deleteSuccess} <br /></span>}

      <form onSubmit={handleSubmit(searchUsersOnSubmit)}>
        <input type="text" placeholder="Nome ou e-email..." {...register('search', {
          maxLength: {
            message: 'máximo de 200 caracteres',
            value: 200,
          }
        })} />
        {errors.search && <span>{errors.search.message}</span>}
        <button type="submit">Procurar</button>
      </form>
      <br />
      <ListUserTable
        paginatedUsers={paginatedUsers}
        editUserOnClick={editUserOnClick}
        removeUserOnClick={removeUserOnClick} />

      {deleteOk && <span>{deleteOk}</span>}
    </div>
  )
}

type PropsListUserTable = {
  paginatedUsers: PaginatedList<User>
  editUserOnClick: (userId: number) => void
  removeUserOnClick: (userId: number) => void
}

const ListUserTable = ({ paginatedUsers, editUserOnClick, removeUserOnClick }: PropsListUserTable) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.data.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <div>
                  <button type="button" onClick={() => editUserOnClick(user.id)}>Editar</button>
                  <button type="button" onClick={() => removeUserOnClick(user.id)}>Remover</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {paginatedUsers.data.length === 0 && <span>Nenhum usuário encontrado.</span>}

    </div>
  )
}

export default ListUsersPage