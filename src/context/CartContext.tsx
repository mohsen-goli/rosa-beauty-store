import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "../types";
import { useProducts } from "./ProductsContext";

interface CartContextValue {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: CartItem) => void;
  increaseCart: (productId: string | number) => void;
  decreaseCart: (productId: string | number) => void;
  removeFromCart: (productId: string | number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { products, loading: productsLoading } = useProducts();
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("rosa-cart");
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("rosa-cart", JSON.stringify(cart));
  }, [cart]);

  // Refresh saved cart snapshots with the current catalog price, currency and
  // localized product details after the live catalog has loaded.
  useEffect(() => {
    if (productsLoading) return;
    setCart((currentCart) =>
      currentCart.map((item) => {
        const currentProduct = products.find(
          (product) => String(product.id) === String(item.id),
        );
        return currentProduct
          ? { ...currentProduct, quantity: item.quantity }
          : item;
      }),
    );
  }, [products, productsLoading]);

  function addToCart(product: CartItem) {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item,
        );
      }

      return [...currentCart, product];
    });
  }

  function increaseCart(productId: string | number) {
    setCart((current) =>
      current.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }

  function decreaseCart(productId: string | number) {
    setCart((current) =>
      current.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    );
  }

  function removeFromCart(productId: string | number) {
    setCart((current) =>
      current.filter((item) => item.id !== productId),
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        increaseCart,
        decreaseCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}