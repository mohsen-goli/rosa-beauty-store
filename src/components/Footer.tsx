import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin } from "lucide-react";
import "./Footer.css";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__col">
          <Link to="/" className="footer__logo" aria-label="ROSA Beauty Store">
            <img src="/Images/rosa-logo.png" alt="ROSA Beauty Store" />
          </Link>
          <p className="footer__desc">{t("footer.description")}</p>
        </div>

        <div className="footer__col">
          <h4 className="footer__title">{t("footer.shop")}</h4>

          <Link to="/category/skincare" className="footer__link">
            {t("footer.skincare")}
          </Link>

          <Link to="/category/makeup" className="footer__link">
            {t("footer.makeup")}
          </Link>

          <Link to="/category/body-care" className="footer__link">
            {t("footer.bodyCare")}
          </Link>
        </div>

        <div className="footer__col">
          <h4 className="footer__title">{t("footer.company")}</h4>

          <Link to="/about" className="footer__link">
            {t("footer.about")}
          </Link>

          <Link to="/contact" className="footer__link">
            {t("footer.contact")}
          </Link>
        </div>

        <div className="footer__col">
          <h4 className="footer__title">{t("footer.contact")}</h4>

          <div className="footer__contact-item">
            <Mail size={16} />
            <span>hello@rosa.com</span>
          </div>

          <div className="footer__contact-item">
            <Phone size={16} />
            <span>+98 21 1234 5678</span>
          </div>

          <div className="footer__contact-item">
            <MapPin size={16} />
            <span>{t("footer.location")}</span>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          {t("footer.copyright", {
            year: new Date().getFullYear(),
          })}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
