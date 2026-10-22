import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Tag,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../components/ToastProvider";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import "./CartPage.css";

function CartPage() {
  const {
    cart,
    addToCart,
    increaseCart,
    decreaseCart,
    removeFromCart,
    cartTotal,
    clearCart,
  } = useCart();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState("");

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "GLOW20") {
      setDiscount(20);
      setAppliedCode("GLOW20");
      showSuccess("Promo code applied! 20% off.");
    } else {
      showError("Invalid promo code.");
    }
    setPromoCode("");
  };

  const discountAmount = (cartTotal * discount) / 100;
  const finalTotal = cartTotal - discountAmount;

  // اگر سبد خرید خالیه
  if (cart.length === 0) {
    const suggestedProducts = products ? products.slice(0, 4) : [];
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <ShoppingBag size={64} strokeWidth={1} />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/" className="btn btn--primary">
              Start Shopping
            </Link>
          </div>

          <section className="section suggested-products">
            <div className="section__header">
              <h2 className="section__title">You Might Also Like</h2>
            </div>
            <div className="products-grid">
              {suggestedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Continue Shopping
        </Link>

        <div className="cart-page__header">
          <h1 className="cart-page__title">Your Cart</h1>
          <button className="clear-cart" onClick={clearCart}>
            <Trash2 size={16} /> Clear Cart
          </button>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <Link to={`/product/${item.id}`} className="cart-item__image">
                  <img src={item.image} alt={item.name} />
                </Link>
                <div className="cart-item__info">
                  <Link to={`/product/${item.id}`} className="cart-item__name">
                    {item.name}
                  </Link>
                  <p className="cart-item__price">${item.price}</p>
                </div>
                <div className="cart-item__quantity">
                  <button
                    onClick={() => decreaseCart(item.id)}
                    aria-label="Decrease"
                  >
                    <Minus size={14} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseCart(item.id)}
                    aria-label="Increase"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <p className="cart-item__total">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  className="cart-item__remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 className="cart-summary__title">Order Summary</h3>

            <div className="promo-code-section">
              <div className="promo-input-group">
                <Tag size={16} className="promo-icon" />
                <input
                  type="text"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-input"
                />
                <button className="promo-btn" onClick={handleApplyPromo}>
                  Apply
                </button>
              </div>
              {appliedCode && (
                <div className="promo-applied">
                  <span>✓ {appliedCode} applied</span>
                  <button
                    onClick={() => {
                      setDiscount(0);
                      setAppliedCode("");
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div className="cart-summary__row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="cart-summary__row discount-row">
                <span>Discount ({discount}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="cart-summary__row">
              <span>Shipping</span>
              <span className="free">Free</span>
            </div>
            <div className="cart-summary__divider" />
            <div className="cart-summary__row cart-summary__total">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
            <button
              className="btn btn--primary cart-summary__checkout"
              onClick={() => navigate("/checkout")}
            >
              Checkout <ShieldCheck size={18} />
            </button>
            <div className="cart-summary__trust">
              <div className="trust-item">
                <Truck size={16} />
                <span>Free Shipping</span>
              </div>
              <div className="trust-item">
                <ShieldCheck size={16} />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
