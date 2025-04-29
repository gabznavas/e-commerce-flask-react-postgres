import { GrUpdate } from "react-icons/gr"
import { User } from "../../../hooks/users/use-user.ts"
import Button from "../../button.tsx"
import { BiTrash } from "react-icons/bi"

type ListUserRowsProps = {
  user: User
  isLoading: boolean
  editRowOnClick: (userId: number) => void
  removeRowOnClick: (userId: number) => void
}

const ListUserRows = ({
  user,
  isLoading,
  editRowOnClick,
  removeRowOnClick
}: ListUserRowsProps) => {
  return (
    <tr className="even:bg-gray-100 odd:bg-white">
      <td className="p-3 border-b">{user.name}</td>
      <td className="p-3 border-b">{user.email}</td>
      <td className="p-3 border-b">
        <div className="flex gap-2 justify-end">
          <Button
            disabled={isLoading}
            className="flex items-center gap-2"
            colors="info"
            onClick={() => editRowOnClick(user.id)}
          >
            <GrUpdate />
            <span>Editar</span>
          </Button>
          <Button
            disabled={isLoading}
            className="flex items-center gap-2"
            colors="danger"
            onClick={() => removeRowOnClick(user.id)}
          >
            <BiTrash className="size-5" />
            <span>Remover</span>
          </Button>
        </div>
      </td>
    </tr>
  )
}

export default ListUserRows