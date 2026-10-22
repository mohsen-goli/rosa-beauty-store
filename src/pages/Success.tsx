import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function Success() {
  return (
    <div className="success-page">
      <CheckCircle size={80} strokeWidth={1.2} color="#E8A0A8" />

      <h1>Thank you for your order! 🌹</h1>
      <p>Your order has been placed successfully.</p>
      <p className="muted">
        We'll send you an email confirmation shortly with tracking details.
      </p>

      <Link to="/" className="btn-primary">
        Continue Shopping
      </Link>
    </div>
  );
}

export default Success;
