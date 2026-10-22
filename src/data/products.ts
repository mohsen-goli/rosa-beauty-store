import type { Product } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Hydrating Face Serum",
    price: 29,
    image: "/Images/products/Hydrating-Face-Serum.jpg",
    category: "skincare",
    description:
      "A lightweight hydrating serum with hyaluronic acid that deeply moisturizes and plumps the skin. Perfect for daily use.",
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
  {
    id: 2,
    name: "Vitamin C Serum",
    price: 35,
    image: "/Images/products/Vitamin-C-Serum.jpg",
    category: "skincare",
    description:
      "Brightening Vitamin C serum that fades dark spots and evens skin tone. Wake up to a radiant, glowing complexion.",
    rating: 4.9,
    reviews: 89,
    inStock: true,
  },
  {
    id: 3,
    name: "Matte Lipstick",
    price: 18,
    image: "/Images/products/Matte-Lipstick.jpg",
    category: "makeup",
    description:
      "Long-lasting matte lipstick with intense color payoff. Non-drying formula that keeps your lips comfortable all day.",
    rating: 4.6,
    reviews: 203,
    inStock: true,
  },
  {
    id: 4,
    name: "Daily Moisturizer",
    price: 24,
    image: "/Images/products/Daily-Moisturizer.jpg",
    category: "skincare",
    description:
      "A gentle daily moisturizer suitable for all skin types. Lightweight, non-greasy, and perfect under makeup.",
    rating: 4.7,
    reviews: 156,
    inStock: true,
  },
];

export function getProductById(id: string | number) {
  return products.find((p) => p.id === Number(id));
}

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category);
}
