import React, { ButtonHTMLAttributes, ReactNode } from "react";
interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className, ...rest }: IProps) => {
  return (
    <button
      className={`${className} text-white p-2 w-full
         rounded-md font-semibold cursor-pointer`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
