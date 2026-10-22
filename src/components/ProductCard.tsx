import type { Product, CartItem } from "../types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Heart } from "lucide-react";
import { useToast } from "./ToastProvider";
import { useWishlist } from "../context/WishlistContext";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { showSuccess, showWishlist } = useToast();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  function handleAdd(e) {
    e.preventDefault();
    onAddToCart({ ...product, quantity: 1 });
    showSuccess(`${product.name} added to cart`);
  }

  function handleWishlist(e) {
    e.preventDefault();
    e.stopPropagation();

    const wasIn = inWishlist;
    toggleWishlist(product);

    if (wasIn) {
      showWishlist(`${product.name} removed from wishlist`);
    } else {
      showWishlist(`${product.name} added to wishlist`);
    }
  }

  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Link to={`/product/${product.id}`} className="product-card__link">
        <div className="product-image">
          <img src={product.image} alt={product.name} />

          <motion.button
            className={`wishlist-toggle ${inWishlist ? "active" : ""}`}
            onClick={handleWishlist}
            aria-label="Toggle wishlist"
            whileTap={{ scale: 0.85 }}
            animate={inWishlist ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <Heart
              size={18}
              fill={inWishlist ? "#e8a0a8" : "transparent"}
              stroke={inWishlist ? "#e8a0a8" : "#8a7c7e"}
            />
          </motion.button>
        </div>

        <div className="product-info">
          <h3>{product.name}</h3>

          <div className="product-rating small">
            <Star size={13} fill="#E8A0A8" stroke="#E8A0A8" />
            <span>{product.rating}</span>
          </div>

          <strong>${product.price}</strong>

          <motion.button
            className="add-to-cart-button"
            onClick={handleAdd}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <ShoppingBag size={15} /> Add to Cart
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
}

export default ProductCard;
