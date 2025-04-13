import "./App.css";
import ProductCard from "./components/ProductCard/ProductCard";
import { productList } from "./data";

function App() {
  return (
    <div>
      <div className="grid grid-cols-4 gap-2 ">
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
