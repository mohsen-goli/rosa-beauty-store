import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase";
import "./Checkout.css";

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

type CheckoutField = keyof CheckoutFormData;
type CheckoutErrors = Partial<Record<CheckoutField, string>>;

interface CreatedOrder {
  order_id: string;
  order_number: number | string;
  total: number | string;
}

function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState<CheckoutErrors>({});

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

    if (submitError) {
      setSubmitError("");
    }
  };

  const validate = (): CheckoutErrors => {
    const newErrors: CheckoutErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t("common.required");
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t("common.required");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = t("common.invalidEmail");
    }

    if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = t("common.invalidPhone");
    }

    if (!formData.address.trim()) {
      newErrors.address = t("common.required");
    }

    if (!formData.city.trim()) {
      newErrors.city = t("common.required");
    }

    if (formData.postalCode.trim().length < 5) {
      newErrors.postalCode = t("common.invalid");
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (cart.length === 0) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const { data, error } = await supabase.rpc("create_customer_order", {
        p_customer_name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        p_customer_email: formData.email.trim(),
        p_customer_phone: formData.phone.trim(),
        p_shipping_address: `${formData.address.trim()}, ${formData.city.trim()}, ${formData.postalCode.trim()}`,
        p_items: cart.map((item) => ({
          product_id: String(item.id),
          quantity: item.quantity,
        })),
      });

      if (error) {
        throw error;
      }

      const createdOrder = (
        Array.isArray(data) ? data[0] : data
      ) as CreatedOrder | null;

      if (!createdOrder || createdOrder.order_number == null) {
        throw new Error("The order response was incomplete.");
      }

      const orderTotal = Number(createdOrder.total);

      if (!Number.isFinite(orderTotal)) {
        throw new Error("The order total was invalid.");
      }

      clearCart();

      navigate("/success", {
        state: {
          orderNumber: String(createdOrder.order_number),
          total: orderTotal,
        },
      });
    } catch (error) {
      console.error("Order submission failed:", error);
      setSubmitError(t("checkoutPage.orderError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-cart">
            <h2>{t("checkoutPage.emptyTitle")}</h2>
            <p>{t("checkoutPage.emptyDescription")}</p>
            <Link to="/" className="btn btn--primary">
              {t("checkoutPage.startShopping")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <Link to="/cart" className="back-link">
          <ArrowLeft size={18} />
          {t("checkoutPage.backCart")}
        </Link>

        <h1 className="checkout-title">{t("checkoutPage.title")}</h1>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3 className="form-section__title">
                {t("checkoutPage.contact")}
              </h3>

              <div className="form-grid">
                <div className="form-field">
                  <label>{t("checkoutPage.firstName")}</label>
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
                  <label>{t("checkoutPage.lastName")}</label>
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
                  <label>{t("checkoutPage.email")}</label>
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
                  <label>{t("checkoutPage.phone")}</label>
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

            <div className="form-section">
              <h3 className="form-section__title">
                {t("checkoutPage.shippingAddress")}
              </h3>

              <div className="form-grid">
                <div className="form-field form-field--full">
                  <label>{t("checkoutPage.address")}</label>
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
                  <label>{t("checkoutPage.city")}</label>
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
                  <label>{t("checkoutPage.postalCode")}</label>
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

            <div className="form-section">
              <h3 className="form-section__title">
                {t("checkoutPage.payment")}
              </h3>

              <p>{t("checkoutPage.demoNotice")}</p>
              <p>{t("checkoutPage.paymentUnavailable")}</p>
            </div>

            {submitError && (
              <p className="error-text" role="alert">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              className="btn btn--primary checkout-submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? t("checkoutPage.processing")
                : `${t("checkoutPage.placeOrder")} - $${cartTotal.toFixed(2)}`}
              <Lock size={18} />
            </button>
          </form>

          <div className="checkout-summary">
            <h3>{t("checkoutPage.summary")}</h3>

            <div className="summary-items">
              {cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item__image">
                    <img src={item.image} alt={item.name} />
                    <span className="summary-item__qty">{item.quantity}</span>
                  </div>

                  <div className="summary-item__info">
                    <p>{item.name}</p>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-divider" />

            <div className="summary-row">
              <span>{t("checkoutPage.subtotal")}</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>{t("checkoutPage.shipping")}</span>
              <span className="free">{t("checkoutPage.free")}</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-row summary-total">
              <span>{t("checkoutPage.total")}</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div className="summary-trust">
              <ShieldCheck size={16} />
              <span>{t("checkoutPage.secureNotice")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
