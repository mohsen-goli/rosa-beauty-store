import { useSearchParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, ArrowLeft } from "lucide-react";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import "./SearchPage.css";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { addToCart } = useCart();
  const { products } = useProducts();
  const { t } = useTranslation();

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="search-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          {t("common.backHome")}
        </Link>

        <div className="search-header">
          <div className="search-header__icon">
            <Search size={24} />
          </div>

          <div>
            <p className="search-header__subtitle">
              {t("searchPage.subtitle")}
            </p>

            <h1 className="search-header__title">"{query}"</h1>

            <p className="search-header__count">
              {filteredProducts.length === 1
                ? t("searchPage.foundOne")
                : t("searchPage.found", { count: filteredProducts.length })}
            </p>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <Search size={64} strokeWidth={1} />

            <h2>{t("searchPage.emptyTitle")}</h2>

            <p>{t("searchPage.emptyDescription", { query })}</p>

            <p>{t("searchPage.suggestion")}</p>

            <Link to="/shop" className="btn btn--primary">
              {t("searchPage.browse")}
            </Link>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
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

export default SearchPage;
