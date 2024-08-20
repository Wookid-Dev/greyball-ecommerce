import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers/Providers";
import CartProvider from "./providers/CartProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce App",
  description: "Browse products and add them to your cart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-primary text-text`}>
        <Providers>
          <CartProvider>
            {children}
          </CartProvider>
          <footer className="p-4 bg-primary text-text text-center">
            &copy; {new Date().getFullYear()} E-commerce Store
          </footer>
        </Providers>
      </body>
    </html>
  );
}
