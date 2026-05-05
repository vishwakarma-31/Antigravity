import Link from "next/link";
import { Star, Heart, Home } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#064E3B] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link
              href="/"
              className="text-2xl font-semibold tracking-wide"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              <span className="text-[#10B981]">Luxe</span> Dresses
            </Link>
            <p className="mt-4 text-white/70 text-sm">
              Curated collection of elegant dresses for every special moment.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>
                <Link href="/shop?category=evening" className="hover:text-white transition-colors">
                  Evening Dresses
                </Link>
              </li>
              <li>
                <Link href="/shop?category=maxi" className="hover:text-white transition-colors">
                  Maxi Dresses
                </Link>
              </li>
              <li>
                <Link href="/shop?category=casual" className="hover:text-white transition-colors">
                  Casual Dresses
                </Link>
              </li>
              <li>
                <Link href="/shop?category=work" className="hover:text-white transition-colors">
                  Work Wear
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Help</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
              >
                <Star className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
              >
                <Heart className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
              >
                <Home className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/50 text-sm">
          <p>&copy; 2026 Luxe Dresses. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}