import { InputHTMLAttributes } from "react";

type Props = {} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, ...rest }: Props) => {
  return (
    <input
      className={`border border-gray-400 rounded-sm h-10 p-2 font-normal
        focus:outline-none focus:border-orange-500 ${className}`}
      {...rest}
    />
  );
};

export default Input;
