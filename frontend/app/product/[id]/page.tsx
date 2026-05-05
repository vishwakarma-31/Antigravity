"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Heart, Share2, Check, Truck, RotateCcw } from "lucide-react";
import { gsap } from "gsap";
import ProductCard from "@/components/product/ProductCard";
import InteractiveDressView from "@/components/product/InteractiveDressView";
import { getProductById, products } from "@/lib/data";
import { useCart } from "@/lib/CartContext";

export default function ProductPage() {
  const params = useParams();
  const product = getProductById(params.id as string);
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const mainRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      );
    }
  }, []);

  if (!product) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl">Product not found</h1>
        <Link href="/shop" className="text-primary hover:underline mt-4 inline-block">
          Back to shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      name: product.name,
      price: product.price,
      image: product.images[0],
      images: product.images,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main ref={mainRef} className="pt-28 pb-20 min-h-screen">
      <div id="interactive-pin-wrapper" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-6">
          <Link href="/shop" className="text-primary/70 hover:text-primary transition-colors">
            ← Back to Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
          <div ref={imageRef}>
            {product.id === "9" ? (
              <InteractiveDressView folder="brown_bodycon" frameCount={64} extension="png" />
            ) : product.id === "8" ? (
              <InteractiveDressView folder="prom" frameCount={40} extension="jpg" />
            ) : (
              <>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card mb-4">
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-20 h-24 rounded-lg overflow-hidden transition-all cursor-pointer ${
                        selectedImage === idx
                          ? "ring-2 ring-primary"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div ref={detailsRef}>
            <p className="text-primary/70 text-sm uppercase tracking-wider mb-2">
              {product.category}
            </p>
            <h1
              className="text-4xl font-semibold mb-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {product.name}
            </h1>
            <p className="text-3xl font-semibold text-cta mb-6">${product.price}</p>

            <p className="text-white/80 mb-8 leading-relaxed">{product.description}</p>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border transition-all cursor-pointer font-medium ${
                      selectedSize === size
                        ? "bg-primary text-white border-primary"
                        : "border-primary/30 hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">Color</label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all cursor-pointer ${
                      selectedColor === color.name
                        ? "border-primary bg-primary/10"
                        : "border-primary/30 hover:border-primary"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/30"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-sm">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-primary/30 hover:border-primary transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-primary/30 hover:border-primary transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-full font-medium transition-all cursor-pointer ${
                  addedToCart
                    ? "bg-green-500 text-white"
                    : "bg-cta text-white hover:bg-cta/90"
                }`}
              >
                {addedToCart ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" /> Added to Cart
                  </span>
                ) : (
                  "Add to Cart"
                )}
              </button>
              <button className="w-14 h-14 rounded-full border border-primary/30 hover:border-primary transition-colors flex items-center justify-center cursor-pointer">
                <Heart className="w-5 h-5" />
              </button>
              <button className="w-14 h-14 rounded-full border border-primary/30 hover:border-primary transition-colors flex items-center justify-center cursor-pointer">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="glass rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-primary" />
                <span>Free shipping on orders over $200</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="w-5 h-5 text-primary" />
                <span>Free returns within 30 days</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Check className="w-5 h-5 text-primary" />
                <span>Authenticity guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2
              className="text-3xl font-semibold mb-8"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}