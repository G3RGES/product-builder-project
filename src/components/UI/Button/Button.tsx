import React, { ReactNode } from "react";
interface IProps {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className }: IProps) => {
  return <button className={className}>{children}</button>;
};

export default Button;
