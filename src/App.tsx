import { v4 as uuid, v4 } from "uuid";
import { useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard/ProductCard";
import Modal from "./components/UI/Modal/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/UI/Button/Button";
import Input from "./components/UI/Input/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import Error from "./components/Error/Error";
import CircleColor from "./components/CircleColor/CircleColor";
import Select from "./components/UI/Select/Select";
import { ProductNameTypes } from "./types";

const initialProduct = {
  title: "",
  description: "",
  imageURL: "",
  price: "",
  colors: [],
  category: {
    name: "",
    imageURL: "",
  },
};

function App() {
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>(initialProduct);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [productToEdit, setProductToEdit] = useState<IProduct>(initialProduct);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  //* HANDLERS *//

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const openEditModal = () => setIsOpenEdit(true);

  const closeEditModal = () => setIsOpenEdit(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });

    setErrors({ ...errors, [e.target.name]: "" });
  };

  const onChangeEditHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductToEdit({ ...productToEdit, [e.target.name]: e.target.value });

    setErrors({ ...errors, [e.target.name]: "" });
  };

  const cancelHandler = () => {
    setProduct(initialProduct);
    setIsOpen(false);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = productValidation({
      title: product.title,
      description: product.description,
      imageURL: product.imageURL,
      price: product.price,
    });

    //* CHECK IF ANY VALUE HAS AND EMPTY STRING " ", && CHECK IF ALL VALUES ARE EMPTY " "
    const hasError =
      Object.values(errors).some((value) => value == "") &&
      Object.values(errors).every((value) => value !== "");

    if (hasError) {
      setErrors(errors);

      return;
    }

    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProduct(initialProduct);
    setIsOpen(false);
  };

  const submitEditHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = productValidation({
      title: productToEdit.title,
      description: productToEdit.description,
      imageURL: productToEdit.imageURL,
      price: productToEdit.price,
    });

    //* CHECK IF ANY VALUE HAS AND EMPTY STRING " ", && CHECK IF ALL VALUES ARE EMPTY " "
    const hasError =
      Object.values(errors).some((value) => value == "") &&
      Object.values(errors).every((value) => value !== "");

    if (hasError) {
      setErrors(errors);

      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };
    setProducts(updatedProducts);

    setProductToEdit(initialProduct);
    setTempColors([]);
    setIsOpenEdit(false);
  };

  const renderProductEdit = (
    id: string,
    label: string,
    name: ProductNameTypes
  ) => {
    return (
      <div className="flex flex-col ">
        <label
          className="block text-sm font-medium mb-1 text-gray-600"
          htmlFor={id}
        >
          {label}
        </label>

        <Input
          type="text"
          id={id}
          name={name}
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <Error msg={errors[name]} />
      </div>
    );
  };

  return (
    <div className="container mx-auto">
      <Button
        className="block bg-green-700 hover:bg-green-600 focus:outline-none
         mx-auto my-10 px-10 font-medium"
        onClick={openModal}
        width="w-fit"
      >
        Add Product
      </Button>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
       gap-2 p-2 rounded-md  "
      >
        {products.map((product, idx) => (
          <ProductCard
            key={product.id}
            product={product}
            setProductToEdit={setProductToEdit}
            openEditModal={openEditModal}
            setProductToEditIdx={setProductToEditIdx}
            idx={idx}
          />
        ))}
      </div>

      {/* ADD PRODUCT MODAL */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add New Product">
        <form className="space-y-3" onSubmit={submitHandler}>
          {formInputsList.map((input) => (
            <div key={input.id} className="flex flex-col ">
              <label
                className="block text-sm font-medium mb-1 text-gray-600"
                htmlFor={input.id}
              >
                {input.label}
              </label>

              <Input
                type="text"
                id={input.id}
                name={input.name}
                value={product[input.name]}
                onChange={onChangeHandler}
              />
              <Error msg={errors[input.name]} />
            </div>
          ))}

          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />

          <div className="flex flex-wrap items-center space-x-1.5 my-2">
            {tempColors.map((color) => (
              <span
                key={color}
                color={color}
                className="text-white rounded-md p-1 m-1 text-xs"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center space-x-1.5 my-2">
            {colors.map((color) => (
              <CircleColor
                key={color}
                color={color}
                onClick={() => {
                  if (tempColors.includes(color)) {
                    setTempColors((prevColors) =>
                      prevColors.filter((c) => c !== color)
                    );
                    return;
                  }
                  setTempColors((prevColors) => [...prevColors, color]);
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between space-x-2.5">
            <Button className="bg-[#034694] hover:bg-blue-700" type="submit">
              Submit
            </Button>

            <Button
              className="bg-gray-400 hover:bg-gray-500 "
              type="button"
              onClick={cancelHandler}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit PRODUCT MODAL */}
      <Modal
        isOpen={isOpenEdit}
        closeModal={closeEditModal}
        title="Edit Product"
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProductEdit("title", "Product Title", "title")}
          {renderProductEdit(
            "description",
            "Product Description",
            "description"
          )}
          {renderProductEdit("imageURL", "Product Image", "imageURL")}
          {renderProductEdit("price", "Product Price", "price")}

          <Select
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />

          <div className="flex flex-wrap items-center space-x-1.5 my-2">
            {tempColors.concat(productToEdit.colors).map((color) => (
              <span
                key={color}
                color={color}
                className="text-white rounded-md p-1 m-1 text-xs"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center space-x-1.5 my-2">
            {colors.map((color) => (
              <CircleColor
                key={color}
                color={color}
                onClick={() => {
                  if (tempColors.includes(color)) {
                    setTempColors((prevColors) =>
                      prevColors.filter((c) => c !== color)
                    );
                    return;
                  }
                  if (productToEdit.colors.includes(color)) {
                    setTempColors((prevColors) =>
                      prevColors.filter((c) => c !== color)
                    );
                    return;
                  }
                  setTempColors((prevColors) => [...prevColors, color]);
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between space-x-2.5">
            <Button className="bg-[#034694] hover:bg-blue-700" type="submit">
              Submit
            </Button>

            <Button
              className="bg-gray-400 hover:bg-gray-500 "
              type="button"
              onClick={closeEditModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete PRODUCT MODAL */}
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button
            className="bg-[#c2344d] hover:bg-red-800"
            onClick={removeProductHandler}
          >
            Yes, remove
          </Button>
          <Button
            type="button"
            className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
            onClick={closeConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
