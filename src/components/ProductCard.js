import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  // AI의 초안은 <button> 태그 내부에 onClick={() => addToCart(product)}가 직접 들어가 있었습니다.
  // HTML(JSX) 구조와 기능 코드가 뒤섞이는 것을 방지하고 경계를 명확히 나누기 위해,
  // 상단에 독립된 handleAddToCart 함수를 선언하고 아래 레이아웃 영역에는 함수 이름만 깔끔하게 연결했습니다.
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      {product.badge && (
        <span className={`product-badge badge-${product.badge}`}>
          {product.badge}
        </span>
      )}

      <img src={product.image} alt={product.name} className="product-image" />

      <div className="product-content">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">
            ₩{product.price.toLocaleString()}
          </span>

          {/* 기존: onClick={() => addToCart(product)} -> 변경: 분리된 함수 연결 */}
          <button className="add-cart-btn" onClick={handleAddToCart}>
            담기
          </button>
        </div>
      </div>
    </div>
  );
}
