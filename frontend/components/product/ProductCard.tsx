"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Eye } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [index]);

  useEffect(() => {
    if (cardRef.current) {
      const tl = gsap.timeline();
      if (isHovered) {
        tl.to(cardRef.current, { y: -8, duration: 0.3, ease: "power2.out" });
      } else {
        tl.to(cardRef.current, { y: 0, duration: 0.3, ease: "power2.out" });
      }
    }
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="glass-card rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-xl cursor-pointer">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-20 group-hover:translate-x-0 transition-transform duration-300">
            <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer shadow-lg">
              <Heart className="w-5 h-5 text-primary" />
            </button>
            <Link
              href={`/product/${product.id}`}
              className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer shadow-lg"
            >
              <Eye className="w-5 h-5 text-primary" />
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Link
              href={`/product/${product.id}`}
              className="block w-full py-3 bg-primary text-white text-center rounded-full hover:bg-primary/90 transition-colors font-medium cursor-pointer"
            >
              View Details
            </Link>
          </div>
        </div>

        <div className="p-4">
          <h3
            className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {product.name}
          </h3>
          <p className="text-primary/70 text-sm mb-2">{product.category}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-cta">${product.price}</span>
            <div className="flex gap-1">
              {product.colors.slice(0, 3).map((color) => (
                <span
                  key={color.name}
                  className="w-4 h-4 rounded-full border border-white/30"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}