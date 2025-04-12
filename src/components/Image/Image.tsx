import React from "react";

interface IProps {
  imageURL: string;
  alt: string;
}

const Image = ({ imageURL, alt }: IProps) => {
  return <img className="" src={imageURL} alt={alt} />;
};

export default Image;
