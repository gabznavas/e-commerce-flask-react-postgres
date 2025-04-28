import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { routePaths } from "../../routes"
import { useEffect } from "react"
import { useLogin } from "../../hooks/auths/use-login"

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>E-mail</label>
          <input type="email" {...register('email', {
            required: "E-mail é requerido",
            maxLength: {
              message: "Máximo de 10 caracteres",
              value: 40,
            }
          })} />
        </div>
        {errors.email && <span>{errors.email.message}</span>}
        <div>
          <label>Senha</label>
          <input type="password" {...register('password', {
            required: "Senha é requerida", maxLength: {
              message: "Senha máxima de 10 caracteres",
              value: 10
            }
          })} />
        </div>
        {errors.password && <span>{errors.password.message}</span>}
        {error && <span>{error}</span>}
        {isLoading && <span>Carregando...</span>}
        <button>Entrar</button>
        <button type="button">Voltar</button>
      </form>
    </div>
  )
}

export default LoginPage