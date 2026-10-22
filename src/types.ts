export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;

  // Optional product badges and sale pricing
  isNew?: boolean;
  discount?: number;
  oldPrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
}
