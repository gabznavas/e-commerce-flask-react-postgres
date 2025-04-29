import { useEffect, useState } from "react"
import { PaginatedList } from "../../../hooks/users/use-find-all-users.ts"
import { User } from "../../../hooks/users/use-user.ts.ts"
import TableMessage from "./table-message.tsx"
import ListUserRows from "./list-user-rows.tsx"
import PaginationBlock from "./pagination-block.tsx"

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

const MAX_BLOCK_PAGES = 10

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
  const [pageBlockStart, setPageBlockStart] = useState(0)

  useEffect(() => {
    const currentBlock = Math.floor(paginatedItems.page / MAX_BLOCK_PAGES)
    setPageBlockStart(currentBlock * MAX_BLOCK_PAGES)
  }, [paginatedItems.page])

  const getPages = () => {
    const end = Math.min(pageBlockStart + MAX_BLOCK_PAGES, paginatedItems.pages)
    return Array.from({ length: end - pageBlockStart }, (_, i) => pageBlockStart + i)
  }

  const pages = getPages()

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 ps-5 text-start border-b">Nome</th>
            <th className="p-3 text-start border-b">E-mail</th>
            <th className="p-3 pe-5 text-end border-b ">Ações</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.data.map((user) => <ListUserRows
            isLoading={isLoading}
            user={user}
            editRowOnClick={editRowOnClick}
            removeRowOnClick={removeRowOnClick}
          />)}
        </tbody>
        <tfoot>
          {paginatedItems.data.length === 0 && <TableMessage message="Nenhum usuário encontrado." />}
          {findAllErrors && <TableMessage message={findAllErrors} />}
          {errorDelete && <TableMessage message={errorDelete} />}
          {deleteSuccess && <TableMessage message={deleteSuccess} />}

          {paginatedItems.pages > 1 && (
            <PaginationBlock
              goToPage={goToPage}
              isLoading={isLoading}
              maxBlockPages={MAX_BLOCK_PAGES}
              pageBlockStart={pageBlockStart}
              pages={pages}
              paginatedItems={paginatedItems}
              setPageBlockStart={setPageBlockStart}
            />
          )}
        </tfoot>
      </table>
    </div>
  )
}


export default ListUserTable
