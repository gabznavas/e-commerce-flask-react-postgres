import Message from "../../message"

type StatusRowProps = {
  message: string
}

const TableMessage = ({ message }: StatusRowProps) => {
  return (
    <tr>
      <td colSpan={3}>
        <Message>{message}</Message>
      </td>
    </tr>
  )
}

export default TableMessage