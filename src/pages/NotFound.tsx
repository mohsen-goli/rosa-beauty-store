import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="not-found">
      <h1>404</h1>

      <h2>{t("notFound.title")}</h2>

      <p>{t("notFound.description")}</p>

      <Link to="/" className="btn btn--primary">
        {t("notFound.back")}
      </Link>
    </div>
  );
}

export default NotFound;
