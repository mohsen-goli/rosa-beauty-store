
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { getProductsByCategory } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/Skeleton";
import "./CategoryPage.css";

function CategoryPage() {
  const { category } = useParams();
  const { addToCart } = useCart();
  const [loadingCategory, setLoadingCategory] = useState(category);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingCategory(category);
    }, 700);

    return () => clearTimeout(timer);
  }, [category]);

  const isLoading = loadingCategory !== category;
  const products = getProductsByCategory(category);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const titles: Record<string, string> = {
    skincare: "Skincare",
    makeup: "Makeup",
    "body-care": "Body Care",
    fragrance: "Fragrance",
  };

  const title = category ? titles[category] || category : "Category";

  return (
    <div className="category-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <div className="category-header">
          <div>
            <p className="category-header__subtitle">CATEGORY</p>
            <h1 className="category-header__title">{title}</h1>
            <p className="category-header__count">
              {sortedProducts.length} products
            </p>
          </div>

          <div className="category-sort">
            <SlidersHorizontal size={16} />
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="category-sort__select"
            >
              <option value="default">Default Sorting</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <ProductGridSkeleton count={4} />
        ) : sortedProducts.length === 0 ? (
          <div className="not-found">
            <p>No products found in this category.</p>
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

export default CategoryPage;
