import ProductCard from "./ProductCard";
import { products } from "../data/products";

export default function ProductList({ activeCategory, searchQuery }) {
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      activeCategory === "전체" || product.category === activeCategory;

    const searchMatch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <div className="product-grid">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
