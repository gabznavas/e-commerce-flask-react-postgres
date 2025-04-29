import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { routePaths } from "../../routes"
import { useEffect } from "react"
import { useLogin } from "../../hooks/auths/use-login"
import Input from "../../components/input"
import Label from "../../components/label"
import FormGroup from "../../components/form-group"
import Button from "../../components/button"
import { BiLogIn } from "react-icons/bi"
import FormError from "../../components/message"
import Header from "../../components/header"

type Inputs = {
  email: string
  password: string
}

const LoginPage = () => {

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const { error, isLoading, login, loginSuccess } = useLogin()

  const onSubmit: SubmitHandler<Inputs> = async data => {
    await login(data.email, data.password)
  }

  useEffect(() => {
    if (loginSuccess) {
      navigate(routePaths.home)
    }
  }, [loginSuccess])

  return (
    <>
      <Header />
      <div className="flex flex-col items-center gap-5 w-full pt-20 rounded-md font">
        <div>
          <span className="text-orange-600 font-bold text-xl2 md:text-xl">ACESSE SUA CONTA</span>
        </div>
        <form className="flex flex-col gap-2 w-full pr-5 pl-5 md:w-80 lg:w-96" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>E-mail</Label>
            <Input placeholder="mario@email.com" type="email" {...register('email', {
              required: "E-mail é requerido",
              maxLength: {
                message: "Máximo de 10 caracteres",
                value: 40,
              }
            })} />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </FormGroup>
          <FormGroup>
            <Label>Senha</Label>
            <Input placeholder="******" type="password" {...register('password', {
              required: "Senha é requerida", maxLength: {
                message: "Senha máxima de 10 caracteres",
                value: 10
              }
            })} />
            {errors.password && <FormError>{errors.password.message}</FormError>}
          </FormGroup>
          {error && <FormError>{error}</FormError>}
          {isLoading && <span>Carregando...</span>}
          <Button colors="primary" className="flex items-center justify-center gap-2">
            <BiLogIn className="size-5" />
            <span>Entrar</span>
          </Button>
        </form>
      </div>
    </>
  )
}

export default LoginPage