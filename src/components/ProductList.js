import ProductCard from "./ProductCard";
import { products } from "../data/products";
import { useFilter } from "../context/FilterContext";

export default function ProductList() {
  const { activeCategory, searchQuery } = useFilter();
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      activeCategory === "전체" ||
      (activeCategory === "인기"
        ? product.badge === "인기"
        : product.category === activeCategory);

    // 검색어 앞뒤 공백 제거(.trim())로 " 맥북 " 같은 입력도 정확히 매칭
    const searchMatch = product.name
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());

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
