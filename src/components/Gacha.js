import { useState } from "react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

function pickProduct() {
  return products[Math.floor(Math.random() * products.length)];
}

export default function Gacha({ onBack }) {
  const { addToCart } = useCart();
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState(null);
  const ROLL_DURATION = 1500; // 뽑기 연출 시간(ms)

  const handleDraw = () => {
    if (rolling) return;
    setResult(null);
    setRolling(true);

    // 두근두근 연출
    setTimeout(() => {
      setResult(pickProduct());
      setRolling(false);
    }, ROLL_DURATION);
  };

  return (
    <div className="gacha-page">
      <div className="gacha-header">
        <button className="gacha-back-btn" onClick={onBack}>
          ← 쇼핑 계속하기
        </button>
        <h1 className="gacha-title">🎰 용인 랜덤 뽑기</h1>
        <p className="gacha-subtitle">
          단 한 번의 클릭으로 어떤 굿즈가 나올지 도전해보세요!
        </p>
      </div>

      <div className="gacha-stage">
        {rolling ? (
          <div className="gacha-machine rolling">
            <div className="gacha-ball" />
            <p className="gacha-rolling-text">두구두구...</p>
          </div>
        ) : result ? (
          <div className="gacha-result">
            <img
              src={result.image}
              alt={result.name}
              className="gacha-result-img"
            />
            <h2 className="gacha-result-name">{result.name}</h2>
            <p className="gacha-result-desc">{result.description}</p>
            <span className="gacha-result-price">
              ₩{result.price.toLocaleString()}
            </span>
            <button
              className="gacha-add-btn"
              onClick={() => addToCart(result)}
            >
              🛒 장바구니에 담기
            </button>
          </div>
        ) : (
          <div className="gacha-machine">
            <div className="gacha-ball idle" />
            <p className="gacha-rolling-text">버튼을 눌러 뽑아보세요!</p>
          </div>
        )}
      </div>

      <button
        className="gacha-draw-btn"
        onClick={handleDraw}
        disabled={rolling}
      >
        {rolling ? "뽑는 중..." : result ? "🎲 한 번 더 뽑기" : "🎲 뽑기!"}
      </button>
    </div>
  );
}
