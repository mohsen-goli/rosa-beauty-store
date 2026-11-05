import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckCircle } from "lucide-react";

interface SuccessState {
  orderNumber?: string;
  total?: number;
}

function Success() {
  const { t } = useTranslation();
  const location = useLocation();

  const order = location.state as SuccessState | null;

  return (
    <div className="success-page">
      <CheckCircle size={80} strokeWidth={1.2} color="#E8A0A8" />

      <h1>{t("successPage.title")}</h1>
      <p>{t("successPage.description")}</p>

      {order?.orderNumber && (
        <div className="order-details">
          <p>
            <strong>{t("successPage.orderNumber")}:</strong> #
            {order.orderNumber}
          </p>

          {typeof order.total === "number" && (
            <p>
              <strong>{t("successPage.orderTotal")}:</strong> $
              {order.total.toFixed(2)}
            </p>
          )}
        </div>
      )}

      <p className="muted">{t("successPage.note")}</p>

      <Link to="/" className="btn-primary">
        {t("successPage.continue")}
      </Link>
    </div>
  );
}

export default Success;
