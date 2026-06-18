import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />

      <div className="cart-item-info">
        <h4>{item.name}</h4>

        <p>₩{item.price.toLocaleString()}</p>

        <div className="cart-item-controls">
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
            -
          </button>

          <span>{item.quantity}</span>

          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            +
          </button>
        </div>
      </div>

      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
        ✕
      </button>
    </div>
  );
}
