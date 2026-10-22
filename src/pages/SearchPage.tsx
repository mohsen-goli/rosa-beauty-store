import { useSearchParams, Link } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import "./SearchPage.css";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { addToCart } = useCart();

  // فیلتر کردن محصولات بر اساس عبارت جستجو
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="search-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <div className="search-header">
          <div className="search-header__icon">
            <Search size={24} />
          </div>
          <div>
            <p className="search-header__subtitle">SEARCH RESULTS FOR</p>
            <h1 className="search-header__title">"{query}"</h1>
            <p className="search-header__count">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"} found
            </p>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <Search size={64} strokeWidth={1} />
            <h2>No products found</h2>
            <p>We couldn't find any products matching "{query}".</p>
            <p>Try checking your spelling or use more general terms.</p>
            <Link to="/" className="btn btn--primary">
              Browse All Products
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
