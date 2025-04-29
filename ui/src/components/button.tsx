import { ButtonHTMLAttributes, ReactNode } from "react"

export type ButtonColors = "primary" | "info" | "danger" | undefined

type Props = {
  children: ReactNode,
  colors?: ButtonColors
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ children, className, disabled, colors, ...rest }: Props) => {
  let color = 'text-white'
  let bg = ''
  let cursor = "cursor-pointer"

  switch (colors) {
    case "primary": {
      bg = "bg-blue-500"
      break
    }
    case "info": {
      bg = "bg-yellow-500"
      break
    }
    case "danger": {
      bg = "bg-red-500"
      break
    }
    default: {
      bg = "bg-gray-400"
      break
    }
  }

  if (disabled) {
    bg = "bg-gray-200"
    color = "text-gray-300"
    cursor = "cursor-not-allowed"
  }

  return (
    <button
      className={`rounded-md font-normal ${bg} ${color} pt-1.5 pb-1.5 ${cursor} pl-3 pr-3 ${className}`}
      {...rest}>
      {children}
    </button>
  )
}

export default Button