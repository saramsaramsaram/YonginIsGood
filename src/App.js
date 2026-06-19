import { useState } from "react";
import { useCart } from "./context/CartContext";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import "./App.css";

function AppInner() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const { toast, handleToastClose } = useCart();

  return (
    <div className="App">
      <Header
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCartOpen={() => setCartOpen(true)}
      />

      <main className="main-content">
        <ProductList
          activeCategory={activeCategory}
          searchQuery={searchQuery}
        />
      </main>

      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {toast && (
        <div className="toast" onClick={handleToastClose}>
          {toast}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}

export default App;
