import { useEffect } from "react"
import { useNavigate, useParams } from 'react-router'
import { SubmitHandler, useForm } from "react-hook-form"

import { routePaths } from "../../routes"

import useCreateUser from "../../hooks/users/use-create-user"
import { UserForm } from "../../hooks/users/types"
import useUpdateUser from "../../hooks/users/use-update-user"
import useFindUserById from "../../hooks/users/use-find-user"
import Header from "../../components/header"
import Button from "../../components/button"
import Message from "../../components/message"
import Label from "../../components/label"
import Input from "../../components/input"
import FormGroup from "../../components/form-group"
import { IoMdAdd } from "react-icons/io"
import { ImCancelCircle } from "react-icons/im"

function FormUserPage() {
  const navigate = useNavigate()
  const { userId } = useParams()
  const {
    error: errorFindUser, findUserById, isLoading: isLoadingFindUser, ok: okFindUser, user
  } = useFindUserById()

  const {
    createUser, error: errorCreateUser, isLoading: isLoadingCreateUser, ok: okCreateUser, focusInput
  } = useCreateUser()

  const {
    error: errorUpdateUser, isLoading: isLoadingUpdateUser, ok: okUpdateUser, updateUser
  } = useUpdateUser()

  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    formState: { errors }
  } = useForm<UserForm>()

  useEffect(() => {
    document.title = "Criar usuário"
    const loadUser = async () => {
      if (userId) {
        await findUserById(userId)
      }
    }
    loadUser()
  }, [])

  useEffect(() => {
    if (okFindUser) {
      document.title = "Atualizar usuário"
      setValue("id", user.id.toString())
      setValue("email", user.email)
      setValue("name", user.name)
    }
  }, [okFindUser])

  useEffect(() => {
    if (okCreateUser || okUpdateUser) navigate(routePaths.listUsers)
    else if (focusInput) setFocus(focusInput as keyof UserForm)
  }, [okCreateUser, okUpdateUser, focusInput])

  const onSubmit: SubmitHandler<UserForm> = async data => {
    if (userId) {
      await updateUser(userId, {
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation
      })
    } else {
      await createUser({
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation
      })
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <Header />

      <div className="flex flex-col items-center gap-3 mt-10 w-11/12">
        {isLoadingFindUser && <Message>Carregando...</Message>}
        {errorFindUser && <Message>Carregando...</Message>}

        <form className="flex flex-col justify-center w-80 gap-2" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Nome</Label>
            <Input type="text" {
              ...register("name", {
                required: "Nome é requerido",
                maxLength: {
                  message: "Máximo de 2 caracteres",
                  value: 50
                }
              })} />
            {errors.name && <span>{errors.name.message}</span>}
          </FormGroup>
          <FormGroup>
            <Label>E-mail</Label>
            <Input type="email"           {...register("email", {
              required: "E-mail é requerido",
              maxLength: {
                message: "Máximo de 10 caracteres",
                value: 40,
              }
            })} />
            {errors.email && <span>{errors.email.message}</span>}
          </FormGroup>
          <FormGroup>
            <Label>Senha</Label>
            <Input type="password"  {...register("password", {
              required: "Senha é requerida", maxLength: {
                message: "Senha máxima de 10 caracteres",
                value: 10
              }
            })} />
            {errors.password && <span>{errors.password.message}</span>}
          </FormGroup>
          <FormGroup>
            <Label>Confirmação de senha</Label>
            <Input type="password"  {...register("passwordConfirmation", {
              required: "Confirmação de senha é requerida", maxLength: {
                message: "Senha máxima de 10 caracteres",
                value: 10
              }
            })} />
            {errors.passwordConfirmation && <span>{errors.passwordConfirmation.message}</span>}
            {isLoadingCreateUser || isLoadingUpdateUser && <span>Carregando...</span>}
            {errorCreateUser && <span>{errorCreateUser}</span>}
            {errorUpdateUser && <span>{errorUpdateUser}</span>}
          </FormGroup>
          <Button className="flex justify-center items-center gap-2" colors={userId ? "info" : "primary"} type="submit">
            <IoMdAdd />
            <span>{userId ? "Atualizar usuário" : "Criar usuário"}</span>
          </Button>
          <Button className="flex justify-center items-center gap-2"
            onClick={() => navigate(routePaths.listUsers)} type="button">
            <ImCancelCircle />
            <span>Cancelar</span>
          </Button>
        </form>

      </div>

    </div>
  )
}


export default FormUserPage
