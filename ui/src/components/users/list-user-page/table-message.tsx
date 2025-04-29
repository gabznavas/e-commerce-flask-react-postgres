import InfoTable from "../../info-table"

type StatusRowProps = {
  message: string
}

const TableMessage = ({ message }: StatusRowProps) => {
  return (
    <tr>
      <td colSpan={3}>
        <InfoTable>{message}</InfoTable>
      </td>
    </tr>
  )
}

export default TableMessage