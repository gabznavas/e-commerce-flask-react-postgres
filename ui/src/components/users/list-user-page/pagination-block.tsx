import { PaginatedList } from "../../../hooks/users/use-find-all-users.ts"
import { User } from "../../../hooks/users/use-user.ts"
import Button from "../../button.tsx"


type PaginationBlockProps = {
  isLoading: boolean
  maxBlockPages: number
  pageBlockStart: number
  setPageBlockStart: (page: number) => void
  goToPage: (page: number) => void
  pages: number[]
  paginatedItems: PaginatedList<User>
}

const PaginationBlock = ({
  isLoading,
  maxBlockPages,
  pageBlockStart,
  setPageBlockStart,
  goToPage,
  pages,
  paginatedItems
}: PaginationBlockProps) => {
  return (
    <tr>
      <td colSpan={3}>
        <ul className="flex justify-center pt-3 gap-1 w-full">
          <Button
            disabled={isLoading || pageBlockStart === 0}
            colors="primary"
            onClick={() => {
              const newStart = Math.max(0, pageBlockStart - maxBlockPages)
              setPageBlockStart(newStart)
              goToPage(newStart)
            }}
          >
            Anterior
          </Button>

          {pages.map((indexPage) => {
            const isCurrent = paginatedItems.page === indexPage
            return (
              <Button
                key={indexPage}
                disabled={isLoading}
                colors={isCurrent ? "primary" : undefined}
                onClick={!isCurrent ? () => goToPage(indexPage) : undefined}
              >
                {indexPage + 1}
              </Button>
            )
          })}

          <Button
            disabled={isLoading || pageBlockStart + maxBlockPages >= paginatedItems.pages}
            colors="primary"
            onClick={() => {
              const newStart = pageBlockStart + maxBlockPages
              setPageBlockStart(newStart)
              goToPage(newStart)
            }}
          >
            Próximo
          </Button>
        </ul>
      </td>
    </tr>
  )
}

export default PaginationBlock