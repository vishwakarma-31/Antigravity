"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import ProductCard from "@/components/product/ProductCard";
import { products, categories, getProductsByCategory } from "@/lib/data";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState("all");
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : getProductsByCategory(activeCategory);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [activeCategory]);

  return (
    <main className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1
            className="text-5xl font-semibold mb-4"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Shop Collection
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Explore our curated selection of elegant dresses for every occasion
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-6 py-3 rounded-full transition-all cursor-pointer font-medium ${
                activeCategory === cat.slug
                  ? "bg-primary text-white shadow-lg"
                  : "glass hover:bg-primary/10"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">
              No products found in this category
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-28 text-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}