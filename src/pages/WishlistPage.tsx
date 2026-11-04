import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const handleAddAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart({ ...product, quantity: 1 });
    });

    showSuccess(t("wishlistPage.addedAll"));
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <div className="empty-wishlist">
            <Heart size={64} strokeWidth={1} />

            <h2>{t("wishlistPage.emptyTitle")}</h2>

            <p>{t("wishlistPage.emptyDescription")}</p>

            <Link to="/shop" className="btn btn--primary">
              {t("wishlistPage.start")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <Link to="/shop" className="back-link">
          <ArrowLeft size={18} />
          {t("wishlistPage.continue")}
        </Link>

        <div className="wishlist-header">
          <div>
            <h1 className="wishlist-title">{t("wishlistPage.title")}</h1>

            <p className="wishlist-count">
              {t("wishlistPage.saved", { count: wishlist.length })}
            </p>
          </div>

          <div className="wishlist-actions">
            <button className="btn btn--outline" onClick={clearWishlist}>
              {t("wishlistPage.clear")}
            </button>

            <button className="btn btn--primary" onClick={handleAddAllToCart}>
              <ShoppingBag size={18} />
              {t("wishlistPage.addAll")}
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
