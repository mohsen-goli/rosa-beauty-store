import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckCircle } from "lucide-react";

function Success() {
  const { t } = useTranslation();

  return (
    <div className="success-page">
      <CheckCircle size={80} strokeWidth={1.2} color="#E8A0A8" />

      <h1>{t("successPage.title")}</h1>
      <p>{t("successPage.description")}</p>

      <p className="muted">{t("successPage.note")}</p>

      <Link to="/" className="btn-primary">
        {t("successPage.continue")}
      </Link>
    </div>
  );
}

export default Success;
