export interface Product {
  id: string | number;
  name: string;
  price: number;
  currency: "USD" | "IRR";
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;

  isNew?: boolean;
  discount?: number;
  oldPrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
}