import "./App.css";
import ProductCard from "./components/ProductCard/ProductCard";
import { productList } from "./data";

function App() {
  return (
    <div className="container mx-auto">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
       gap-2 p-2 rounded-md  "
      >
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
