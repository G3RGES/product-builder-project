import React, { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}
const Input = ({ ...rest }: IProps) => {
  return (
    <input
      className="border-[1px] border-gray-300 shadow-md focus:border-[#034694] focus:outline-none
      focus:ring-1 focus:ring-[#034694] rounded-md px-3 py-3 text-md "
      {...rest}
    />
  );
};

export default Input;
