import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

// 리팩토링 포인트: 하드코딩된 텍스트 상수로 분리
// AI가 제안한 코드에는 알림창 문구가 JSX 내부에 그대로 박혀 있었습니다.
// 서비스 운영 중 문구가 변경되거나 다국어 처리가 필요할 때 UI 코드를 건드리지 않고
// 상단에서 쉽게 관리할 수 있도록 팀 컨벤션에 맞춰 상수로 분리했습니다.
const ALERT_MESSAGES = {
  CHECKOUT_PREPARING: "결제 기능은 준비중입니다.",
};

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
              <span>총 금액 </span>
              <strong>₩{cartTotal.toLocaleString()}</strong>
            </div>

            <button className="clear-cart-btn" onClick={clearCart}>
              전체 삭제
            </button>

            <button
              className="checkout-btn"
              onClick={() => alert(ALERT_MESSAGES.CHECKOUT_PREPARING)} // <- 이 부분
            >
              구매하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
