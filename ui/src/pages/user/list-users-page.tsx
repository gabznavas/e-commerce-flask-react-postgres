import { useEffect } from "react"
import { useNavigate } from "react-router"
import { SubmitHandler, useForm } from "react-hook-form"

import { routePaths } from "../../routes"

import { useFindAllUsers } from "../../hooks/users/use-find-all-users.ts"
import useDeleteUser from "../../hooks/users/use-delete-user.ts"

import Header from "../../components/header.tsx"
import Input from "../../components/input.tsx"
import Button from "../../components/button.tsx"
import FormGroup from "../../components/form-group.tsx"
import Message from "../../components/message.tsx"
import { BiSearch, } from "react-icons/bi"
import { IoMdAdd } from "react-icons/io"
import ListUserTable from "../../components/users/list-user-page/list-user-table.tsx"

type SearchInput = {
  search: string
}

const ListUsersPage = () => {
  const navigate = useNavigate()

  const {
    error: findAllErrorMsg, findUsers, isLoading: isLoadingFindAll, paginatedUsers
  } = useFindAllUsers()
  const {
    deleteUserById, isLoading: isLoadingDelete, successMsg: deleteSuccessMsg, errorMsg: errorDeleteMsg,
  } = useDeleteUser()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<SearchInput>()

  useEffect(() => {
    document.title = "Listar usuários"
    findUsers()
  }, [])

  useEffect(() => {
    if (deleteSuccessMsg) findUsers()
  }, [deleteSuccessMsg])

  const editUserOnClick = (userId: number) => {
    navigate(`${routePaths.editUser}/${userId}`)
  }

  const removeUserOnClick = async (userId: number) => {
    if (confirm("Deseja remover esse usuário?")) {
      await deleteUserById(userId)
    }
  }
  const searchUsersOnSubmit: SubmitHandler<SearchInput> = async data => {
    await findUsers(data.search, 0)
  }

  const goToPage = async (page: number) => {
    await findUsers(getValues('search'), page)
  }

  const isLoading = isLoadingFindAll || isLoadingDelete

  return (
    <div className="flex flex-col items-center w-full">
      <Header />

      <div className="flex flex-col gap-3 mt-8 w-11/12">
        <form className="flex justify-center w-full" onSubmit={handleSubmit(searchUsersOnSubmit)}>
          <FormGroup className="flex w-full">
            <div className="flex w-full justify-between gap-2">
              <Input className="flex-1" type="text" placeholder="Nome ou E-mail..." {...register('search', {
                maxLength: {
                  message: 'máximo de 200 caracteres',
                  value: 200,
                }
              })} />
              <div className="flex gap-1">
                <Button type="submit" className="flex items-center gap-2" >
                  <BiSearch />
                  <span>Procurar</span>
                </Button>
                <Button className="flex items-center gap-2" colors="primary"
                  onClick={() => navigate(routePaths.createUser)}>
                  <IoMdAdd />
                  <span>Novo usuário</span>
                </Button>
              </div>
            </div>
            {errors.search && <Message >{errors.search.message}</Message>}
          </FormGroup>
        </form>

        <ListUserTable
          paginatedItems={paginatedUsers}
          editRowOnClick={editUserOnClick}
          removeRowOnClick={removeUserOnClick}
          goToPage={goToPage}
          isLoading={isLoading}
          findAllErrors={findAllErrorMsg ? findAllErrorMsg : ''}
          errorDelete={errorDeleteMsg ? errorDeleteMsg : ''}
          deleteSuccess={deleteSuccessMsg ? deleteSuccessMsg : ''}
        />

      </div>
    </div>
  )
}



export default ListUsersPage