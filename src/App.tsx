import { useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard/ProductCard";
import Modal from "./components/UI/Modal/Modal";
import { productList } from "./data";
import Button from "./components/UI/Button/Button";

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
      <Button className="bg-green-700 hover:bg-green-600" onClick={openModal}>
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
        <div className="flex items-center justify-between space-x-2.5">
          <Button className="bg-green-700 hover:bg-green-600">Submit</Button>

          <Button className="bg-gray-400 hover:bg-gray-500 ">Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
