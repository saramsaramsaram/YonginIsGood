import { useState } from "react";
import { useCart } from "./context/CartContext";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Gacha from "./components/Gacha";
import { CartProvider } from "./context/CartContext";
import "./App.css";
import { FilterProvider } from "./context/FilterContext";

function AppInner() {
  const [cartOpen, setCartOpen] = useState(false);
  const [view, setView] = useState("shop");
  const { toast, handleToastClose } = useCart();

  return (
    <div className="App">
      <Header
        onCartOpen={() => setCartOpen(true)}
        onGachaOpen={() => setView("gacha")}
        onHome={() => setView("shop")}
      />

      <main className="main-content">
        {view === "gacha" ? (
          <Gacha onBack={() => setView("shop")} />
        ) : (
          <ProductList
          />
        )}
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
      <FilterProvider>
        <AppInner />
      </FilterProvider>
    </CartProvider>
  );
}

export default App;
