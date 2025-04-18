import React from "react";

interface IProps extends React.HTMLAttributes<HTMLSpanElement> {
  color: string;
  onClick?: () => void;
}

const CircleColor = ({ color, onClick }: IProps) => {
  return (
    <span
      className={`w-5 h-5  rounded-full cursor-pointer`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    />
  );
};

export default CircleColor;
