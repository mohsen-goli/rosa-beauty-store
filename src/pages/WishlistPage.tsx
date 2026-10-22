import { Link } from "react-router-dom";
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../components/ToastProvider";
import ProductCard from "../components/ProductCard";
import "./WishlistPage.css";

function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showSuccess } = useToast();

  const handleAddAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart({ ...product, quantity: 1 });
    });
    showSuccess("All items added to cart!");
  };

  // اگر لیست خالی بود
  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <div className="empty-wishlist">
            <Heart size={64} strokeWidth={1} />
            <h2>Your wishlist is empty</h2>
            <p>Save your favorite products by clicking the heart icon.</p>
            <Link to="/" className="btn btn--primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Continue Shopping
        </Link>

        <div className="wishlist-header">
          <div>
            <h1 className="wishlist-title">My Wishlist</h1>
            <p className="wishlist-count">{wishlist.length} items saved</p>
          </div>
          <div className="wishlist-actions">
            <button className="btn btn--outline" onClick={clearWishlist}>
              Clear All
            </button>
            <button className="btn btn--primary" onClick={handleAddAllToCart}>
              <ShoppingBag size={18} /> Add All to Cart
            </button>
          </div>
        </div>

        <div className="products-grid">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WishlistPage;
