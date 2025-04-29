import { HtmlHTMLAttributes } from "react"

type Props = {
  children: string
} & HtmlHTMLAttributes<HTMLLabelElement>

const Label = (props: Props) => {
  return (
    <label
      className="font-normal text-gray-500"
      {...props}>
      {props.children}
    </label>
  )
}

export default Label