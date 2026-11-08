import { Link } from "react-router-dom";
import { ArrowLeft, Leaf, Heart, Sparkles, Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./About.css";

function About() {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          {t("aboutPage.backHome")}
        </Link>

        <div className="about-header">
          <p className="about-header__subtitle">{t("aboutPage.eyebrow")}</p>

          <h1 className="about-header__title">{t("aboutPage.title")}</h1>

          <p className="about-header__description">
            {t("aboutPage.description")}
          </p>
        </div>

        <div className="about-story">
          <div className="about-story__image">
            <img
              src="/Images/about/rosa-about-ritual.jpg"
              alt="ROSA skincare ritual"
              loading="lazy"
            />
          </div>

          <div className="about-story__content">
            <h2>{t("aboutPage.missionTitle")}</h2>

            <p>{t("aboutPage.missionParagraph1")}</p>

            <p>{t("aboutPage.missionParagraph2")}</p>
          </div>
        </div>

        <div className="about-values">
          <h2 className="about-values__title">{t("aboutPage.valuesTitle")}</h2>

          <div className="about-values__grid">
            <div className="value-card">
              <div className="value-card__icon">
                <Leaf size={28} />
              </div>

              <h3>{t("aboutPage.value1Title")}</h3>
              <p>{t("aboutPage.value1Description")}</p>
            </div>

            <div className="value-card">
              <div className="value-card__icon">
                <Heart size={28} />
              </div>

              <h3>{t("aboutPage.value2Title")}</h3>
              <p>{t("aboutPage.value2Description")}</p>
            </div>

            <div className="value-card">
              <div className="value-card__icon">
                <Sparkles size={28} />
              </div>

              <h3>{t("aboutPage.value3Title")}</h3>
              <p>{t("aboutPage.value3Description")}</p>
            </div>

            <div className="value-card">
              <div className="value-card__icon">
                <Award size={28} />
              </div>

              <h3>{t("aboutPage.value4Title")}</h3>
              <p>{t("aboutPage.value4Description")}</p>
            </div>
          </div>
        </div>

        <div className="about-cta">
          <h2>{t("aboutPage.ctaTitle")}</h2>

          <Link to="/shop" className="btn btn--primary">
            {t("aboutPage.shopNow")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
