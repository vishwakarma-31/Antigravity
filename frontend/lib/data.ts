export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Silk Evening Gown",
    price: 459,
    description: "Elegant floor-length silk gown with delicate hand-embroidered details. Perfect for formal events and galas.",
    category: "Evening",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Emerald", hex: "#059669" },
      { name: "Midnight", hex: "#1e293b" },
      { name: "Champagne", hex: "#f5f5dc" },
    ],
  },
  {
    id: "2",
    name: "Floral Maxi Dress",
    price: 289,
    description: "Flowing maxi dress with romantic floral print. Lightweight fabric perfect for summer occasions.",
    category: "Maxi",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Blush Pink", hex: "#fecdd3" },
      { name: "Sky Blue", hex: "#7dd3fc" },
      { name: "Cream", hex: "#fef3c7" },
    ],
  },
  {
    id: "3",
    name: "Classic Sheath Dress",
    price: 329,
    description: "Timeless sheath dress with tailored silhouette. Suitable for office and business occasions.",
    category: "Work",
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600",
      "https://images.unsplash.com/photo-1618932260643-196b6e402273?w=600",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Navy", hex: "#1e3a5f" },
      { name: "Black", hex: "#0f172a" },
      { name: "Camel", hex: "#d97706" },
    ],
  },
  {
    id: "4",
    name: "Bohemian Wrap Dress",
    price: 249,
    description: "Relaxed wrap dress with earthy tones and natural fabrics. Perfect for casual weekend outings.",
    category: "Casual",
    images: [
      "https://images.unsplash.com/photo-1759992878336-a5dd342ea245?w=600",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Terracotta", hex: "#ea580c" },
      { name: "Sage", hex: "#84cc16" },
      { name: "Sand", hex: "#d4d4d4" },
    ],
  },
  {
    id: "5",
    name: "Cocktail Party Dress",
    price: 379,
    description: "Stylish cocktail dress with statement details. Features elegant neckline and fitted waist.",
    category: "Cocktail",
    images: [
      "https://images.unsplash.com/photo-1518331647614-7a1f04cd34cf?w=600",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Ruby", hex: "#dc2626" },
      { name: "Black", hex: "#0f172a" },
      { name: "Gold", hex: "#fbbf24" },
    ],
  },
  {
    id: "6",
    name: "Summer Sundress",
    price: 179,
    description: "Light and breezy sundress with adjustable straps. Ideal for warm weather and vacation wear.",
    category: "Casual",
    images: [
      "https://images.unsplash.com/photo-1542295669297-4d352b042bca?w=600",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Sunshine Yellow", hex: "#fde047" },
      { name: "Coral", hex: "#fb7185" },
      { name: "White", hex: "#ffffff" },
    ],
  },
  {
    id: "7",
    name: "Velvet Evening Dress",
    price: 429,
    description: "Luxurious velvet dress with rich color and elegant drape. Perfect for winter formal events.",
    category: "Evening",
    images: [
      "https://images.unsplash.com/photo-1595156210483-560123baba96?w=600",
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=600",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Burgundy", hex: "#7f1d1d" },
      { name: "Forest Green", hex: "#14532d" },
      { name: "Royal Blue", hex: "#1d4ed8" },
    ],
  },
  {
    id: "8",
    name: "A-Line Prom Dress",
    price: 299,
    description: "Classic A-line silhouette with tulle skirt. Features delicate beading and lace accents.",
    category: "Prom",
    images: [
      "https://images.unsplash.com/photo-1595156210483-560123baba96?w=600",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Dusty Rose", hex: "#fda4af" },
      { name: "Ivory", hex: "#fffbeb" },
      { name: "Lavender", hex: "#c4b5fd" },
    ],
  },
  {
    id: "9",
    name: "Elegant Evening Gown",
    price: 549,
    description: "Stunning evening gown with intricate beadwork and a flowing silhouette. Perfect for formal galas and special occasions.",
    category: "Evening",
    images: [
      "/assets/brown_bodycon.jpg",
      "/assets/brown_bodycon_2.jpg",
      "/assets/brown_bodycon_3.jpg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Champagne", hex: "#f5f5dc" },
      { name: "Rose Gold", hex: "#e8b4b8" },
      { name: "Silver", hex: "#c0c0c0" },
    ],
  },
];

export const categories = [
  { name: "All", slug: "all" },
  { name: "Evening", slug: "evening" },
  { name: "Maxi", slug: "maxi" },
  { name: "Work", slug: "work" },
  { name: "Casual", slug: "casual" },
  { name: "Cocktail", slug: "cocktail" },
  { name: "Prom", slug: "prom" },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}