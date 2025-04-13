import React from "react";
import Image from "../Image/Image";
import Button from "../UI/Button/Button";
import { IProduct } from "../../interfaces";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  return (
    <div className="border rounded-md p-2 flex flex-col">
      {/* <img className="" src="" alt="product_name" /> */}
      <Image
        className="rounded-md mb-2"
        imageURL={product.imageURL}
        alt={"product_name"}
      />
      <h3 className="">{product.title}</h3>
      <p className="">{product.description}</p>
      <div className="flex items-center space-x-1.5 my-2">
        <span className="w-5 h-5 bg-black rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-blue-800 rounded-full cursor-pointer" />
      </div>

      <div className="flex items-center justify-between">
        <span className="">{product.price}$</span>
        {/* <img className="w-10 h-10 rounded-full" src="" alt="" /> */}
        <Image
          className="w-10 h-10 rounded-full "
          imageURL="https://www.stockvault.net/data/2016/02/26/185161/preview16.jpg"
          alt=""
        />
      </div>

      <div className="flex items-center justify-between space-x-1.5 my-5">
        <Button className="bg-green-700 ">Edit</Button>
        <Button className="bg-red-700  ">Delete</Button>
      </div>
    </div>
  );
};

export default ProductCard;
