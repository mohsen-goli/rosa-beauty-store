import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, SlidersHorizontal, ShoppingBag } from "lucide-react";

import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/Skeleton";

import "./Shop.css";

function Shop() {
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
          Back to Home
        </Link>

        <div className="shop-header">
          <div>
            <p className="shop-header__subtitle">OUR COLLECTION</p>
            <h1 className="shop-header__title">All Products</h1>
            <p className="shop-header__count">
              {products.length} products available
            </p>
          </div>

          <div className="shop-sort">
            <SlidersHorizontal size={16} />

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="shop-sort__select"
            >
              <option value="default">Default Sorting</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : error ? (
          <div className="shop-empty">
            <h2>Unable to load products</h2>
            <p>{error}</p>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="shop-empty">
            <ShoppingBag size={48} />
            <h2>No products available</h2>
            <p>Our collection is currently empty.</p>

            <Link to="/" className="btn btn--primary">
              Back to Home
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
