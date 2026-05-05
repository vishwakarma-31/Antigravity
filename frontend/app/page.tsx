"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { gsap } from "gsap";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/lib/data";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1 }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.2 },
        "-=0.8"
      );
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <main className="pt-20">
        <section
          ref={heroRef}
          className="relative min-h-[90vh] flex items-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <div
              ref={imageRef}
              className="absolute inset-0"
            >
              <Image
                src="https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=1920"
                alt="Hero background"
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ECFDF5]/95 via-[#ECFDF5]/70 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-2xl">
              <p className="text-primary font-medium tracking-wider uppercase mb-4">
                New Collection 2026
              </p>
              <h1
                ref={titleRef}
                className="text-5xl md:text-7xl font-semibold leading-tight mb-6"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Elegance in{" "}
                <span className="text-gradient">Every</span> Stitch
              </h1>
              <p
                ref={subtitleRef}
                className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed"
              >
                Discover our curated collection of stunning dresses designed for
                your most memorable moments. Where timeless style meets modern
                sophistication.
              </p>
              <div ref={ctaRef} className="flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-cta text-white rounded-full hover:bg-cta/90 transition-all hover:scale-105 cursor-pointer font-medium"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/shop?category=evening"
                  className="inline-flex items-center gap-2 px-8 py-4 glass text-[#064E3B] rounded-full hover:bg-white/50 transition-all cursor-pointer font-medium"
                >
                  View Evening Collection
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowRight className="w-6 h-6 rotate-90 text-primary/60" />
          </div>
        </section>

        <section className="py-20 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-4xl font-semibold mb-4"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Featured Collection
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Handpicked favorites from our latest arrivals
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all cursor-pointer font-medium"
              >
                View All Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-8 rounded-2xl text-center hover:scale-105 transition-transform cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl">✨</span>
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Premium Quality
                </h3>
                <p className="text-white/70 text-sm">
                  Crafted with the finest materials and attention to detail
                </p>
              </div>

              <div className="glass-card p-8 rounded-2xl text-center hover:scale-105 transition-transform cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl">🚚</span>
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Free Shipping
                </h3>
                <p className="text-white/70 text-sm">
                  On all orders over $200 with express delivery options
                </p>
              </div>

              <div className="glass-card p-8 rounded-2xl text-center hover:scale-105 transition-transform cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl">💎</span>
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Luxury Experience
                </h3>
                <p className="text-white/70 text-sm">
                  Personalized styling consultations and VIP rewards
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-4xl font-semibold mb-4"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                What Our Clients Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-cta text-cta" />
                  ))}
                </div>
                <p className="text-white/80 mb-4 italic">
                  &quot;The quality of the dresses is outstanding. I received so many
                  compliments at my event!&quot;
                </p>
                <p className="font-medium text-sm">- Sarah M.</p>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-cta text-cta" />
                  ))}
                </div>
                <p className="text-white/80 mb-4 italic">
                  &quot;Beautiful styles and excellent customer service. My go-to for
                  special occasions.&quot;
                </p>
                <p className="font-medium text-sm">- Emma R.</p>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-cta text-cta" />
                  ))}
                </div>
                <p className="text-white/80 mb-4 italic">
                  &quot;The perfect blend of elegance and comfort. I&apos;ve never felt
                  more confident!&quot;
                </p>
                <p className="font-medium text-sm">- Olivia K.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card rounded-3xl p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
              <div className="relative z-10">
                <h2
                  className="text-4xl md:text-5xl font-semibold mb-4"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Join Our Newsletter
                </h2>
                <p className="text-white/70 mb-8 max-w-xl mx-auto">
                  Be the first to know about new arrivals, exclusive offers, and
                  styling tips.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 rounded-full bg-white/80 border border-primary/20 focus:outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-medium cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </main>
  );
}