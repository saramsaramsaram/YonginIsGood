import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

export default function Cart({ isOpen, onClose }) {
  const { cartItems, cartTotal, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-drawer">
        <div className="cart-header">
          <h2>🛒 장바구니</h2>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart">장바구니가 비어있습니다.</div>
          ) : (
            cartItems.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>총 금액</span>

              <strong>₩{cartTotal.toLocaleString()}</strong>
            </div>

            <button className="clear-cart-btn" onClick={clearCart}>
              전체 삭제
            </button>

            <button
              className="checkout-btn"
              onClick={() => alert("결제 기능은 준비중입니다.")}
            >
              구매하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
