import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      {/*  AI가 준 코드에는 alt={item.name}만 들어가 있어서, 혹시라도 상품명 데이터가 누락되어 들어올 경우 
          이미지가 깨지거나 스크린 리더가 인식하지 못하는 문제가 생길 수 있습니다.
          우리 팀의 웹 접근성 및 방어 코드 컨벤션에 맞춰 빈 값일 때의 대체 텍스트("상품 이미지")를 추가했습니다. */}
      <img
        src={item.image}
        alt={item.name || "상품 이미지"}
        className="cart-item-image"
      />

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
