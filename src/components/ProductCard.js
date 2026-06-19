import { useCart } from "../context/CartContext";
import { useCallback } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = useCallback(() => {
    addToCart(product);
  }, [product, addToCart]);

  return (
    <div className="product-card">
      {product.tag && <span className="product-tag">{product.tag}</span>}

      <img src={product.image} alt={product.name} className="product-image" />

      <div className="product-content">
        <h3>{product.name}</h3>

        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">
            ₩{product.price.toLocaleString()}
          </span>

          <button className="add-cart-btn" onClick={handleAddToCart}>
            담기
          </button>
        </div>
      </div>
    </div>
  );
}
