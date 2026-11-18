import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";

import { supabase } from "../lib/supabase";
import type { Product } from "../types";

interface ProductsContextValue {
  products: Product[];
  loading: boolean;
  error: string | null;
}

interface ProductRow {
  id: string;
  category: string | null;
  is_active: boolean | null;
  rating: number | null;
}

interface TranslationRow {
  product_id: string;
  lang: string;
  title: string | null;
  description: string | null;
}

interface VariantRow {
  id: string;
  product_id: string;
  price_irr: number | null;
  price_usd_cents: number | null;
  stock: number | null;
  discount_percent: number | null;
  is_active: boolean | null;
  sort_order: number | null;
}

interface ImageRow {
  product_id: string;
  image_url: string | null;
  is_primary: boolean | null;
  sort_order: number | null;
}

const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined,
);

const categoryMap: Record<string, string> = {
  lipstick: "makeup",
  perfume: "fragrance",
  haircare: "body-care",
};

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();
  const language = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];

  useEffect(() => {
    let mounted = true;

    async function fetchProducts(initialLoad = false) {
      if (initialLoad && mounted) setLoading(true);

      try {
        const { data: productData, error: productError } = await supabase
          .from("products")
          .select("id, category, is_active, rating")
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        if (productError) throw productError;
        const rows = (productData ?? []) as ProductRow[];

        if (rows.length === 0) {
          if (mounted) {
            setProducts([]);
            setError(null);
            setLoading(false);
          }
          return;
        }

        const productIds = rows.map((row) => row.id);
        const [translationsResult, variantsResult, imagesResult] =
          await Promise.all([
            supabase
              .from("product_translations")
              .select("product_id, lang, title, description")
              .in("product_id", productIds),
            supabase
              .from("product_variants")
              .select(
                "id, product_id, price_irr, price_usd_cents, stock, discount_percent, is_active, sort_order",
              )
              .in("product_id", productIds)
              .eq("is_active", true)
              .order("sort_order", { ascending: true }),
            supabase
              .from("product_images")
              .select("product_id, image_url, is_primary, sort_order")
              .in("product_id", productIds)
              .order("sort_order", { ascending: true }),
          ]);

        if (translationsResult.error) throw translationsResult.error;
        if (variantsResult.error) throw variantsResult.error;
        if (imagesResult.error) throw imagesResult.error;

        const translations = (translationsResult.data ?? []) as TranslationRow[];
        const variants = (variantsResult.data ?? []) as VariantRow[];
        const images = (imagesResult.data ?? []) as ImageRow[];

        // Keep every product and the cart in one currency. Prefer USD only
        // when every active variant has a USD price; otherwise use IRR.
        const useUsdPricing =
          variants.length > 0 &&
          variants.every((variant) => variant.price_usd_cents !== null);
        const currency = useUsdPricing ? "USD" : "IRR";

        const mappedProducts: Product[] = rows.flatMap((row) => {
          const productVariants = variants.filter(
            (variant) => variant.product_id === row.id,
          );
          const variant = productVariants.find((item) =>
            useUsdPricing
              ? item.price_usd_cents !== null
              : item.price_irr !== null,
          );
          if (!variant) return [];

          const localizedTranslations = translations.filter(
            (item) => item.product_id === row.id,
          );
          const translation =
            localizedTranslations.find((item) => item.lang === language) ||
            localizedTranslations.find((item) => item.lang === "en") ||
            localizedTranslations.find((item) => item.lang === "fa") ||
            localizedTranslations[0];

          const productImages = images.filter(
            (item) => item.product_id === row.id && item.image_url,
          );
          const image =
            productImages.find((item) => item.is_primary) || productImages[0];

          const discount = Number(variant.discount_percent ?? 0);
          const price = useUsdPricing
            ? Number(variant.price_usd_cents) / 100
            : Number(variant.price_irr);

          return [
            {
              id: row.id,
              name: translation?.title ?? row.id,
              description: translation?.description ?? "",
              price,
              currency,
              image: image?.image_url ?? "",
              category: categoryMap[row.category ?? ""] ?? row.category ?? "",
              rating: Number(row.rating ?? 0),
              reviews: 0,
              inStock: Number(variant.stock ?? 0) > 0,
              ...(discount > 0
                ? {
                    discount,
                    oldPrice: price / (1 - discount / 100),
                  }
                : {}),
            },
          ];
        });

        if (!mounted) return;
        setProducts(mappedProducts);
        setError(null);
      } catch (fetchError) {
        if (!mounted) return;
        console.error("Supabase products error:", fetchError);
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to load products.",
        );
      } finally {
        if (mounted) setLoading(false);
      }
    }

    void fetchProducts(true);

    const channel = supabase
      .channel("rosa-catalog-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => void fetchProducts(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "product_translations" },
        () => void fetchProducts(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "product_variants" },
        () => void fetchProducts(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "product_images" },
        () => void fetchProducts(),
      )
      .subscribe();

    return () => {
      mounted = false;
      void supabase.removeChannel(channel);
    };
  }, [language]);

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
