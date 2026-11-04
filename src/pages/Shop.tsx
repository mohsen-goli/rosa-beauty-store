import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, SlidersHorizontal, ShoppingBag } from "lucide-react";

import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/Skeleton";

import "./Shop.css";

function Shop() {
  const { t } = useTranslation();

  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);

    return 0;
  });

  return (
    <div className="shop-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          {t("shopPage.backHome")}
        </Link>

        <div className="shop-header">
          <div>
            <p className="shop-header__subtitle">{t("shopPage.subtitle")}</p>

            <h1 className="shop-header__title">{t("shopPage.title")}</h1>

            <p className="shop-header__count">
              {t("shopPage.productCount", { count: products.length })}
            </p>
          </div>

          <div className="shop-sort">
            <SlidersHorizontal size={16} />

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="shop-sort__select"
              aria-label={t("shopPage.defaultSort")}
            >
              <option value="default">{t("shopPage.defaultSort")}</option>

              <option value="price-low">{t("shopPage.priceLow")}</option>

              <option value="price-high">{t("shopPage.priceHigh")}</option>

              <option value="name">{t("shopPage.nameSort")}</option>
            </select>
          </div>
        </div>

        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : error ? (
          <div className="shop-empty">
            <h2>{t("shopPage.loadError")}</h2>
            <p>{error}</p>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="shop-empty">
            <ShoppingBag size={48} />

            <h2>{t("shopPage.emptyTitle")}</h2>

            <p>{t("shopPage.emptyDescription")}</p>

            <Link to="/" className="btn btn--primary">
              {t("shopPage.backHome")}
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

export default Shop;
