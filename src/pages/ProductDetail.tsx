import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../components/ToastProvider";
import ProductCard from "../components/ProductCard";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showSuccess } = useToast();

  const [quantity, setQuantity] = useState(1);
  
const [loadedId, setLoadedId] = useState<string | undefined>(undefined);
const isLoading = loadedId !== id;
  const product = products.find((p) => p.id === parseInt(id));

 useEffect(() => {
  const timer = setTimeout(() => setLoadedId(id), 500);
  return () => clearTimeout(timer);
}, [id]);

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="not-found">
            <h2>Product not found</h2>
            <Link to="/" className="btn btn--primary">
              Back to Home
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
    showSuccess(`${product.name} added to cart`);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity });
    navigate("/cart");
  };

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

  // نمونه نظرات (بعداً از دیتابیس می‌خونی)
  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      date: "May 10, 2026",
      comment:
        "Absolutely love this product! My skin feels so soft and glowing. Highly recommend it!",
    },
    {
      id: 2,
      name: "Emily R.",
      rating: 4,
      date: "May 5, 2026",
      comment:
        "Great quality and fast shipping. The scent is a bit strong for me, but overall a good buy.",
    },
    {
      id: 3,
      name: "Jessica L.",
      rating: 5,
      date: "April 28, 2026",
      comment:
        "I've been using this for a month and I can already see the difference. Will definitely repurchase!",
    },
  ];

  return (
    <div className="product-detail">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <motion.div
          className="product-main"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="product-main__image">
            <img src={product.image} alt={product.name} />
            {product.isNew && <span className="badge badge--new">NEW</span>}
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
                {product.rating} ({product.reviews || 0} reviews)
              </span>
            </div>

            <div className="product-main__price">
              <strong>${product.price}</strong>
              {product.oldPrice && (
                <span className="old-price">${product.oldPrice}</span>
              )}
            </div>

            <p className="product-main__description">
              {product.description ||
                "A premium quality product crafted with care. Perfect for your daily beauty routine."}
            </p>

            <div className="product-main__quantity">
              <label>Quantity:</label>
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="product-main__actions">
              <button className="btn btn--primary" onClick={handleAddToCart}>
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <button className="btn btn--outline" onClick={handleBuyNow}>
                Buy Now
              </button>
              <button
                className={`wishlist-btn ${inWishlist ? "active" : ""}`}
                onClick={handleWishlist}
                aria-label="Add to wishlist"
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
                <span>Free Shipping</span>
              </div>
              <div className="feature">
                <ShieldCheck size={20} />
                <span>Secure Payment</span>
              </div>
              <div className="feature">
                <RotateCcw size={20} />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        </motion.div>

        {relatedProducts.length > 0 && (
          <section className="section related-products">
            <div className="section__header">
              <h2 className="section__title">You May Also Like</h2>
            </div>
            <div className="products-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
              ))}
            </div>
          </section>
        )}

        {/* بخش نظرات */}
        <section className="section reviews-section">
          <div className="section__header">
            <h2 className="section__title">Customer Reviews</h2>
            <button
              className="btn btn--outline"
              style={{ padding: "10px 20px", fontSize: "12px" }}
            >
              Write a Review
            </button>
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
