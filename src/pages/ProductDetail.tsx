import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../components/ToastProvider";
import ProductCard from "../components/ProductCard";
import "./ProductDetail.css";

function ProductDetail() {
  const { t } = useTranslation();

  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showSuccess } = useToast();
  const { products, loading: productsLoading } = useProducts();

  const [quantity, setQuantity] = useState(1);
  const [loadedId, setLoadedId] = useState<string | undefined>(undefined);

  const isLoading = productsLoading || loadedId !== id;

  const product = products.find((p) => String(p.id) === id);

  useEffect(() => {
    const timer = setTimeout(() => setLoadedId(id), 500);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="skeleton-detail">
            <div className="skeleton-image" />
            <div className="skeleton-info" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="not-found">
            <h2>{t("productDetail.notFound")}</h2>
            <Link to="/" className="btn btn--primary">
              {t("productDetail.backHome")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });

    showSuccess(t("productDetail.addedToCart", { name: product.name }));
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity });
    navigate("/cart");
  };

  const reviews = [
    {
      id: 1,
      name: "Sample User 1",
      rating: 5,
      date: "May 10, 2026",
      comment: t("productDetail.review1"),
    },
    {
      id: 2,
      name: "Sample User 2",
      rating: 4,
      date: "May 5, 2026",
      comment: t("productDetail.review2"),
    },
    {
      id: 3,
      name: "Sample User 3",
      rating: 5,
      date: "April 28, 2026",
      comment: t("productDetail.review3"),
    },
  ];

  return (
    <div className="product-detail">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          {t("productDetail.backHome")}
        </Link>

        <motion.div
          className="product-main"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="product-main__image">
            <img src={product.image} alt={product.name} />

            {product.isNew && (
              <span className="badge badge--new">{t("productDetail.new")}</span>
            )}

            {product.discount && (
              <span className="badge badge--sale">-{product.discount}%</span>
            )}
          </div>

          <div className="product-main__info">
            <p className="product-main__category">{product.category}</p>

            <h1 className="product-main__name">{product.name}</h1>

            <div className="product-main__rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={
                      i < Math.floor(product.rating) ? "#E8A0A8" : "transparent"
                    }
                    stroke="#E8A0A8"
                  />
                ))}
              </div>

              <span>
                {product.rating} ({product.reviews || 0}{" "}
                {t("productDetail.reviews")})
              </span>
            </div>

            <div className="product-main__price">
              <strong>${product.price}</strong>

              {product.oldPrice && (
                <span className="old-price">${product.oldPrice}</span>
              )}
            </div>

            <p className="product-main__description">
              {product.description || t("productDetail.defaultDescription")}
            </p>

            <div className="product-main__quantity">
              <label>{t("productDetail.quantity")}</label>

              <div className="quantity-selector">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>

                <span>{quantity}</span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="product-main__actions">
              <button className="btn btn--primary" onClick={handleAddToCart}>
                <ShoppingBag size={18} />
                {t("productDetail.addToCart")}
              </button>

              <button className="btn btn--outline" onClick={handleBuyNow}>
                {t("productDetail.buyNow")}
              </button>

              <button
                className={`wishlist-btn ${inWishlist ? "active" : ""}`}
                onClick={handleWishlist}
                aria-label={
                  inWishlist
                    ? t("productDetail.removeWishlist")
                    : t("productDetail.addWishlist")
                }
              >
                <Heart
                  size={20}
                  fill={inWishlist ? "#E8A0A8" : "transparent"}
                  stroke={inWishlist ? "#E8A0A8" : "currentColor"}
                />
              </button>
            </div>

            <div className="product-main__features">
              <div className="feature">
                <Truck size={20} />
                <span>{t("productDetail.freeShipping")}</span>
              </div>

              <div className="feature">
                <ShieldCheck size={20} />
                <span>{t("productDetail.securePayment")}</span>
              </div>

              <div className="feature">
                <RotateCcw size={20} />
                <span>{t("productDetail.returns")}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {relatedProducts.length > 0 && (
          <section className="section related-products">
            <div className="section__header">
              <h2 className="section__title">{t("productDetail.related")}</h2>
            </div>

            <div className="products-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
              ))}
            </div>
          </section>
        )}

        <section className="section reviews-section">
          <div className="section__header">
            <div>
              <h2 className="section__title">
                {t("productDetail.customerReviews")}
              </h2>

              <p>{t("productDetail.sampleReviews")}</p>
            </div>
          </div>

          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-card__header">
                  <div className="review-card__avatar">
                    {review.name.charAt(0)}
                  </div>

                  <div>
                    <h4 className="review-card__name">{review.name}</h4>

                    <div className="review-card__stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < review.rating ? "#E8A0A8" : "transparent"}
                          stroke="#E8A0A8"
                        />
                      ))}
                    </div>
                  </div>

                  <span className="review-card__date">{review.date}</span>
                </div>

                <p className="review-card__comment">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductDetail;
