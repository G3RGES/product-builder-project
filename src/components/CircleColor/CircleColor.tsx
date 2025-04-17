import React from "react";

interface IProps {
  color: string;
}

const CircleColor = ({ color }: IProps) => {
  return (
    <span className={`w-5 h-5 bg-[${color}] rounded-full cursor-pointer`} />
  );
};

export default CircleColor;
