import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "../lib/supabase";
import type { Product } from "../types";

interface ProductsContextValue {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined,
);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("products")
        .select("id, name, description, price, image_url, category, stock, is_active")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase products error:", error);
        setError(error.message);
        setLoading(false);
        return;
      }

      const mappedProducts: Product[] = (data ?? []).map((row) => ({
        id: String(row.id),
        name: row.name ?? "",
        description: row.description ?? "",
        price: Number(row.price ?? 0),
        image: row.image_url ?? "",
        category: row.category ?? "",
        rating: 0,
        reviews: 0,
        inStock: Number(row.stock ?? 0) > 0,
      }));

      setProducts(mappedProducts);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used inside ProductsProvider");
  }

  return context;
}
