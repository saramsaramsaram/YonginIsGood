import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

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

          <button className="add-cart-btn" onClick={() => addToCart(product)}>
            담기
          </button>
        </div>
      </div>
    </div>
  );
}
