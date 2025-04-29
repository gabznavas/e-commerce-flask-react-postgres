import { BiTrash } from "react-icons/bi"
import { PaginatedList } from "../../hooks/users/use-find-all-users"
import Button, { ButtonColors } from "../button"
import InfoTable from "../info-table"
import { GrUpdate } from "react-icons/gr"
import { User } from "../../hooks/users/use-user.ts"

type Props = {
  paginatedItems: PaginatedList<User>
  editRowOnClick: (userId: number) => void
  removeRowOnClick: (userId: number) => void
  goToPage: (page: number) => void
  isLoading: boolean

  findAllErrors: string
  errorDelete: string
  deleteSuccess: string
}

const ListUserTable = ({
  paginatedItems,
  editRowOnClick,
  removeRowOnClick,
  goToPage,
  isLoading,
  findAllErrors,
  errorDelete,
  deleteSuccess,

}: Props) => {

  const pages: number[] = new Array(paginatedItems.pages)
    .fill('')
    .map((_, index) => index)

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-start border-b">Nome</th>
            <th className="p-3 text-start border-b">E-mail</th>
            <th className="p-3 text-start border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.data.map((user, index) => (
            <tr className="even:bg-gray-100 odd:bg-white" key={index}>
              <td className="p-3 text-start border-b">{user.name}</td>
              <td className="p-3 text-start border-b">{user.email}</td>
              <td className="p-3 text-start border-b">
                <div className="flex items-center gap-2">
                  <Button
                    disabled={isLoading}
                    className="flex items-center gap-2"
                    colors="info"
                    type="button" onClick={() => editRowOnClick(user.id)}>
                    <GrUpdate />
                    <span>Editar</span>
                  </Button>
                  <Button
                    disabled={isLoading}
                    className="flex items-center gap-2" colors="danger" type="button"
                    onClick={() => removeRowOnClick(user.id)}>
                    <BiTrash className="size-5" />
                    <span>Remover</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          {paginatedItems.data.length === 0 && (
            <tr>
              <td colSpan={3}>
                <InfoTable>Nenhum usuário encontrado.</InfoTable>
              </td>
            </tr>
          )}
          {findAllErrors.length > 0 && (
            <tr>
              <td colSpan={3}>
                <InfoTable>{findAllErrors} </InfoTable>
              </td>
            </tr>
          )}
          {errorDelete.length > 0 && (
            <tr>
              <td colSpan={3}>
                <InfoTable>{errorDelete} </InfoTable>
              </td>
            </tr>
          )}
          {deleteSuccess.length > 0 && (
            <tr>
              <td colSpan={3}>
                <InfoTable>{deleteSuccess}</InfoTable>
              </td>
            </tr>
          )}

          {paginatedItems.pages > 1 && (
            <tr>
              <td colSpan={3}>
                <ul className="flex justify-center pt-3 gap-1 w-full">
                  <Button
                    disabled={isLoading || paginatedItems.page === 1}
                    colors="primary"
                    onClick={() => goToPage(paginatedItems.page - 1)}>
                    Anterior
                  </Button>

                  {pages.map((indexPage) => {
                    const pageNumber = indexPage + 1
                    let colors = undefined as ButtonColors
                    if (paginatedItems.page === indexPage) {
                      colors = "primary"
                    }
                    return (
                      <Button
                        disabled={isLoading} key={pageNumber} colors={colors} onClick={() => goToPage(indexPage)}>
                        {pageNumber}
                      </Button>
                    )
                  })}
                  <Button
                    disabled={isLoading || paginatedItems.page === paginatedItems.pages}
                    colors="primary"
                    onClick={() => goToPage(paginatedItems.page + 1)}>
                    Próximo
                  </Button>
                </ul>
              </td>
            </tr>
          )}
        </tfoot>
      </table>
    </div>
  )
}


export default ListUserTable