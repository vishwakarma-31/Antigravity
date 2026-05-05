"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, itemCount } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeCart}
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#ECFDF5] shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-primary/10">
          <h2 className="text-xl font-semibold" style={{ fontFamily: "var(--font-cormorant)" }}>
            Shopping Cart ({itemCount})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-primary/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-primary/30 mb-4" />
              <p className="text-white/60 mb-4">Your cart is empty</p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 p-4 glass-card rounded-xl"
                >
                  <div className="relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <p className="text-primary/70 text-xs mt-1">Size: {item.size} | Color: {item.color}</p>
                    <p className="text-primary font-semibold mt-1">${item.price}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-red-500 hover:text-red-600 transition-colors cursor-pointer text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-primary/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/70">Subtotal</span>
              <span className="text-xl font-semibold">${total.toFixed(2)}</span>
            </div>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full py-3 bg-cta text-white text-center rounded-full hover:bg-cta/90 transition-colors font-medium cursor-pointer"
            >
              Checkout
            </Link>
            <Link
              href="/shop"
              onClick={closeCart}
              className="block w-full py-3 mt-3 text-center text-primary hover:text-primary/80 transition-colors cursor-pointer"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}