import { HTMLAttributes } from "react"

type Props = {
  colors?: "danger" | "success"
} & HTMLAttributes<HTMLInputElement>

const Message = ({ className, colors, children, ...rest }: Props) => {
  let color = ""
  switch (colors) {
    case "danger": {
      color = "text-red-500"
      break
    }
    case "success": {
      color = "text-green-500"
      break
    }
    default: {
      color = "text-gray-500"
    }
  }

  return (
    <span className={` ${color} ${children}`} {...rest}>{children}</span>
  )
}

export default Message