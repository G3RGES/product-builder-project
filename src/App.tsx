import { useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard/ProductCard";
import Modal from "./components/UI/Modal/Modal";
import { formInputsList, productList } from "./data";
import Button from "./components/UI/Button/Button";
import Input from "./components/UI/Input/Input";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  //* MODAL HANDLER *//
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="container mx-auto">
      <Button
        className="bg-green-700 hover:bg-green-600 focus:outline-none"
        onClick={openModal}
      >
        Add
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
        <div className="space-y-3">
          {formInputsList.map((input) => (
            <div key={input.id} className="flex flex-col ">
              <label
                className="block text-sm font-medium mb-1 text-gray-600"
                htmlFor={input.id}
              >
                {input.label}
              </label>
              <Input type="text" id={input.id} name={input.name} />
            </div>
          ))}

          <div className="flex items-center justify-between space-x-2.5">
            <Button className="bg-[#034694] hover:bg-blue-700">Submit</Button>

            <Button className="bg-gray-400 hover:bg-gray-500 ">Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
