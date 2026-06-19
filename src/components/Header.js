import React from "react";
import { useCart } from "../context/CartContext";
import { categories } from "../data/products";

export default function Header({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  onCartOpen,
  onGachaOpen,
  onHome,
}) {
  const { cartCount } = useCart();

  return (
    <header className="shop-header">
      <div className="header-container">
        <div
          className="logo-section"
          onClick={() => {
            setActiveCategory("전체");
            setSearchQuery("");
            if (onHome) onHome();
          }}
        >
          <img src="/images/yongin-logo.svg" alt="용인 굿즈샵 로고" className="logo-img" />
          <h1 className="logo-title">용인 굿즈샵</h1>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="원하는 굿즈를 검색해보세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="search-clear-btn"
              onClick={() => setSearchQuery("")}
            >
              ✕
            </button>
          )}
        </div>

        <div className="actions-section">
          <button
            className="gacha-toggle-btn"
            onClick={onGachaOpen}
            aria-label="Open Random Gacha"
          >
            <span className="gacha-icon">🎰</span>
            <span className="gacha-text">랜덤 뽑기</span>
          </button>

          <button
            className="cart-toggle-btn"
            onClick={onCartOpen}
            aria-label="Open Shopping Cart"
          >
            <span className="cart-icon">🛒</span>
            <span className="cart-text">장바구니</span>
            {cartCount > 0 && (
              <span className="cart-badge-count">{cartCount}</span>
            )}
          </button>
        </div>
      </div>

      <nav className="category-nav">
        <div className="category-container">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-tab-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category === "전체"
                ? "전체"
                : category === "옷"
                  ? "옷"
                  : category === "모자"
                    ? "모자"
                    : category === "포토카드"
                      ? "포토카드"
                      : category}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}