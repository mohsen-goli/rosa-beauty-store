
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Lock, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

type CheckoutField = keyof CheckoutFormData;

type CheckoutErrors = Partial<Record<CheckoutField, string>>;

function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<CheckoutErrors>({});

  // اگر سبد خرید خالی باشد
  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some products before checking out.</p>
            <Link to="/" className="btn btn--primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const fieldName = name as CheckoutField;

    setFormData((previous) => ({
      ...previous,
      [fieldName]: value,
    }));

    if (errors[fieldName]) {
      setErrors((previous) => ({
        ...previous,
        [fieldName]: "",
      }));
    }
  };

  const validate = (): CheckoutErrors => {
    const newErrors: CheckoutErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Required";
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email";
    }

    if (formData.phone.length < 10) {
      newErrors.phone = "Invalid phone";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Required";
    }

    if (formData.postalCode.length < 5) {
      newErrors.postalCode = "Invalid";
    }

    if (formData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Invalid card";
    }

    if (!formData.expiry.trim()) {
      newErrors.expiry = "Required";
    }

    if (formData.cvv.length < 3) {
      newErrors.cvv = "Invalid CVV";
    }

    return newErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      clearCart();
      navigate("/success");
    }, 1500);
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <Link to="/cart" className="back-link">
          <ArrowLeft size={18} /> Back to Cart
        </Link>

        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-layout">
          {/* فرم سفارش */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            {/* اطلاعات تماس */}
            <div className="form-section">
              <h3 className="form-section__title">Contact Information</h3>

              <div className="form-grid">
                <div className="form-field">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? "error" : ""}
                  />
                  {errors.firstName && (
                    <span className="error-text">{errors.firstName}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? "error" : ""}
                  />
                  {errors.lastName && (
                    <span className="error-text">{errors.lastName}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "error" : ""}
                  />
                  {errors.phone && (
                    <span className="error-text">{errors.phone}</span>
                  )}
                </div>
              </div>
            </div>

            {/* آدرس ارسال */}
            <div className="form-section">
              <h3 className="form-section__title">Shipping Address</h3>

              <div className="form-grid">
                <div className="form-field form-field--full">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? "error" : ""}
                  />
                  {errors.address && (
                    <span className="error-text">{errors.address}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? "error" : ""}
                  />
                  {errors.city && (
                    <span className="error-text">{errors.city}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={errors.postalCode ? "error" : ""}
                  />
                  {errors.postalCode && (
                    <span className="error-text">{errors.postalCode}</span>
                  )}
                </div>
              </div>
            </div>

            {/* اطلاعات پرداخت نمایشی */}
            <div className="form-section">
              <h3 className="form-section__title">
                <CreditCard size={20} /> Payment Details
              </h3>

              <div className="form-grid">
                <div className="form-field form-field--full">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className={errors.cardNumber ? "error" : ""}
                  />
                  {errors.cardNumber && (
                    <span className="error-text">{errors.cardNumber}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleChange}
                    className={errors.expiry ? "error" : ""}
                  />
                  {errors.expiry && (
                    <span className="error-text">{errors.expiry}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChange}
                    className={errors.cvv ? "error" : ""}
                  />
                  {errors.cvv && (
                    <span className="error-text">{errors.cvv}</span>
                  )}
                </div>
              </div>
            </div>

            <button
  type="submit"
  className="btn btn--primary checkout-submit"
  disabled={isSubmitting}
>
  {isSubmitting
    ? "Processing..."
    : `Place Order - $${cartTotal.toFixed(2)}`}
  <Lock size={18} />
</button>
          </form>

          {/* خلاصه سفارش */}
          <div className="checkout-summary">
            <h3>Order Summary</h3>

            <div className="summary-items">
              {cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item__image">
                    <img src={item.image} alt={item.name} />
                    <span className="summary-item__qty">{item.quantity}</span>
                  </div>

                  <div className="summary-item__info">
                    <p>{item.name}</p>
                    <span>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-divider" />

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className="free">Free</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-row summary-total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div className="summary-trust">
              <ShieldCheck size={16} />
              <span>Secure 256-bit SSL encrypted payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
