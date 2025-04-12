import React from "react";

interface IProps {}

const ProductCard = ({}: IProps) => {
  return (
    <div className="border rounded-md p-2 flex flex-col">
      <img className="" src="" alt="product_name" />
      <h3 className=""></h3>
      <p className=""></p>
      <div className="flex items-center space-x-1.5 my-2">
        <span className="w-5 h-5 bg-black rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-blue-800 rounded-full cursor-pointer" />
      </div>

      <div className="flex items-center justify-between">
        <span className=""></span>
        <img className="w-10 h-10 rounded-full" src="" alt="" />
      </div>

      <div className="flex items-center justify-between space-x-1.5 my-5">
        <button
          className="bg-green-700 text-white p-2 w-full
         rounded-md font-semibold "
        >
          Edit
        </button>
        <button
          className="bg-red-700 text-white p-2 w-full
         rounded-md font-semibold "
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
