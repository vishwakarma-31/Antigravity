"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useState, useEffect } from "react";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Navbar() {
  const { itemCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl md:text-3xl font-semibold tracking-wide"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              <span className="text-gradient">Luxe</span> Dresses
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/shop?category=evening"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Evening
              </Link>
              <Link
                href="/shop?category=maxi"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Maxi
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={openCart}
                className="relative p-2 hover:bg-primary/10 rounded-full transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-cta text-white text-xs rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                className="md:hidden p-2 hover:bg-primary/10 rounded-full transition-colors cursor-pointer"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 glass rounded-lg">
              <div className="flex flex-col gap-4 pt-4">
                <Link
                  href="/"
                  className="px-4 py-2 hover:bg-primary/10 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  className="px-4 py-2 hover:bg-primary/10 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  href="/shop?category=evening"
                  className="px-4 py-2 hover:bg-primary/10 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Evening
                </Link>
                <Link
                  href="/shop?category=maxi"
                  className="px-4 py-2 hover:bg-primary/10 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Maxi
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
      <CartDrawer />
    </>
  );
}