import { useState } from "react";
import CartDrawer from "@/components/CartDrawer";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCartDrawer = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header className="p-4 bg-primary text-text">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">E-commerce Store</h1>
        <button
          onClick={toggleCartDrawer}
          className="bg-accent py-2 px-4 rounded text-text hover:bg-accent-hover"
        >
          View Cart
        </button>
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
