import { HTMLAttributes } from "react"

type Props = {} & HTMLAttributes<HTMLInputElement>

const InfoTable = ({ className, children, ...rest }: Props) => {
  return (
    <span className={`text-gray-500 ${className}`} {...rest}>{children}</span>
  )
}

export default InfoTable