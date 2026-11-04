import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/Skeleton";
import "./CategoryPage.css";

function CategoryPage() {
  const { category } = useParams();
  const { addToCart } = useCart();
  const { products: allProducts, loading: productsLoading } = useProducts();
  const { t } = useTranslation();

  const [loadingCategory, setLoadingCategory] = useState(category);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoadingCategory(category);
    }, 700);

    return () => window.clearTimeout(timer);
  }, [category]);

  const isLoading = productsLoading || loadingCategory !== category;

  const products = allProducts.filter(
    (product) => product.category === category,
  );

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const titles: Record<string, string> = {
    skincare: t("homeCategories.skincare"),
    makeup: t("homeCategories.makeup"),
    "body-care": t("homeCategories.bodycare"),
    fragrance: t("homeCategories.fragrance"),
  };

  const title = category
    ? titles[category] || category
    : t("categoryPage.subtitle");

  return (
    <div className="category-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          {t("categoryPage.backHome")}
        </Link>

        <div className="category-header">
          <div>
            <p className="category-header__subtitle">
              {t("categoryPage.subtitle")}
            </p>

            <h1 className="category-header__title">{title}</h1>

            <p className="category-header__count">
              {t("categoryPage.count", {
                count: sortedProducts.length,
              })}
            </p>
          </div>

          <div className="category-sort">
            <SlidersHorizontal size={16} />

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="category-sort__select"
            >
              <option value="default">{t("categoryPage.defaultSort")}</option>

              <option value="price-low">{t("categoryPage.priceLow")}</option>

              <option value="price-high">{t("categoryPage.priceHigh")}</option>

              <option value="rating">{t("categoryPage.rating")}</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <ProductGridSkeleton count={4} />
        ) : sortedProducts.length === 0 ? (
          <div className="not-found">
            <p>{t("categoryPage.empty")}</p>

            <Link to="/" className="btn btn--primary">
              {t("categoryPage.backHome")}
            </Link>
          </div>
        ) : (
          <div className="products-grid">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
