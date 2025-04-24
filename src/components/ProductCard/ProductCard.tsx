import React from "react";
import Image from "../Image/Image";
import Button from "../UI/Button/Button";
import { IProduct } from "../../interfaces";
import { txtSlicer, numberWithCommas } from "../../utils/functions";
import CircleColor from "../CircleColor/CircleColor";

interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  idx: number;
  setProductToEditIdx: (idx: number) => void;
  openConfirmModal: () => void;
}

const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
  idx,
  setProductToEditIdx,
  openConfirmModal,
}: IProps) => {
  // --- HANDLER --- //
  const onEdit = () => {
    setProductToEdit(product);
    openEditModal();
    setProductToEditIdx(idx);
  };

  const onRemove = () => {
    setProductToEdit(product);
    openConfirmModal();
  };

  return (
    <div className=" max-w-sm md:max-w-lg mx-auto border border-gray-200 rounded-md p-2 flex flex-col">
      <Image
        className="rounded-md mb-2 h-52 w-full lg:object-cover"
        imageURL={product.imageURL}
        alt={product.title}
      />
      <h3 className="my-2 font-bold text-lg">{product.title}</h3>
      <p className="text-sm text-gray-500 font-medium">
        {txtSlicer(product.description)}
      </p>
      <div className="flex flex-wrap items-center space-x-1.5 my-2">
        {product.colors.map((color) => (
          <CircleColor key={color} color={color} />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="font-semibold text-lg text-slate-600">
          {numberWithCommas(product.price)}$
        </span>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-gray-500">
            {product.category.name}
          </span>
          <Image
            imageURL={product.category.imageURL}
            alt={product.category.name}
            className="w-10 h-10 rounded-full object-bottom"
          />
        </div>
      </div>

      <div className="flex items-center justify-between space-x-1.5 my-5">
        <Button className="bg-green-700 " onClick={onEdit}>
          Edit
        </Button>
        <Button className="bg-red-700  " onClick={onRemove}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
