"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { gsap } from "gsap";
import { useCart } from "@/lib/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount, clearCart } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
      );
    }
  }, [items]);

  if (items.length === 0) {
    return (
      <main className="pt-28 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <ShoppingBag className="w-20 h-20 text-primary/30 mx-auto mb-6" />
          <h1
            className="text-4xl font-semibold mb-4"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Your Cart is Empty
          </h1>
          <p className="text-white/60 mb-8">
            Looks like you haven&apos;t added any dresses yet.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors cursor-pointer font-medium"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main ref={containerRef} className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/shop"
            className="flex items-center gap-2 text-primary/70 hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-600 transition-colors cursor-pointer text-sm"
          >
            Clear Cart
          </button>
        </div>

        <h1
          className="text-4xl font-semibold mb-8"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Shopping Cart ({itemCount})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 p-6 glass-card rounded-2xl"
              >
                <div className="relative w-32 h-40 flex-shrink-0 rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3
                    className="text-xl font-semibold mb-1"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-primary/70 text-sm mb-2">Size: {item.size}</p>
                  <p className="text-xl font-semibold text-cta mb-4">${item.price}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 sticky top-28">
              <h2
                className="text-xl font-semibold mb-6"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="border-t border-primary/10 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-4 bg-cta text-white rounded-full hover:bg-cta/90 transition-colors font-medium cursor-pointer">
                Proceed to Checkout
              </button>

              <p className="text-center text-white/50 text-xs mt-4">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}