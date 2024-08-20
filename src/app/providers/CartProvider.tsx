"use client";

import { useState } from "react";
import CartDrawer from "@/components/CartDrawer";
import Header from "@/components/Header";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Header/>
      <main>{children}</main>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
