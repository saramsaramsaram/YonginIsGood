import ProductCard from "./ProductCard";
import { products } from "../data/products";

export default function ProductList({ activeCategory, searchQuery }) {
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      activeCategory === "전체" || product.category === activeCategory;
    // 검색어 앞뒤 공백 제거(.trim()) 추가
    // AI가 생성한 기존 코드는 사용자가 실수로 검색어 앞뒤에 공백을 넣었을 때(예: " 맥북 ")
    // 올바른 상품을 찾지 못하는 아쉬움이 있었습니다.
    // 우리 팀의 꼼꼼한 UX 기준에 맞춰, 검색 조건 비교 전에 .trim()을 적용하여 검색 정확도를 높였습니다.
    const searchMatch = product.name
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase()); // 기존: searchQuery.toLowerCase()

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
