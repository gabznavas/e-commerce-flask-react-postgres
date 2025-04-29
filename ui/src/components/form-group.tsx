import { HtmlHTMLAttributes, ReactNode } from "react"

type Props = {
  children: ReactNode | ReactNode[]
} & HtmlHTMLAttributes<HTMLDivElement>

const FormGroup = (props: Props) => {
  return (
    <div
      className="flex flex-col"
      {...props}>
      {props.children}
    </div>
  )
}

export default FormGroup