import { useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard/ProductCard";
import Modal from "./components/UI/Modal/Modal";
import { colors, formInputsList, productList } from "./data";
import Button from "./components/UI/Button/Button";
import Input from "./components/UI/Input/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import Error from "./components/Error/Error";
import CircleColor from "./components/CircleColor/CircleColor";

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

  //* HANDLERS *//

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });

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
      Object.values(errors).some((value) => value == "") ||
      Object.values(errors).every((value) => value !== "");

    if (hasError) {
      setErrors(errors);
      return;
    }

    productList.push(product);
    setProduct(initialProduct);
    setIsOpen(false);
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
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

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

          <div className="flex flex-wrap items-center space-x-1.5 my-2">
            {colors.map((color) => (
              <CircleColor key={color} color={color} />
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
    </div>
  );
}

export default App;
