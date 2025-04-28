
export const deleteUserById = async (id: number): Promise<{ message: string, ok: boolean }> => {
  const url = `${import.meta.env.VITE_API_URL}/user/${id}`
  const response = await fetch(url, {
    method: "DELETE",
  })

  if (response.status > 500 && response.status < 599) {
    return {
      message: "Algo deu problema, tente novamente mais tarde!",
      ok: false,
    }
  }

  try {
    if (response.status > 400 && response.status < 499) {
      const data = await response.json()
      return {
        message: data.message,
        ok: false,
      }
    }
    return {
      message: "Deletado com sucesso.",
      ok: true,
    }
  } catch (ex) {
    return {
      message: "Algo deu problema, tente novamente mais tarde!",
      ok: false,
    }
  }
}