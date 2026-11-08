import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Heart,
  BookOpen,
  Leaf,
  PackageCheck,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import BrandsCarousel from "../components/BrandsCarousel";
import HeroCarousel from "../components/HeroCarousel";
import { useProducts } from "../context/ProductsContext";

import "./Home.css";

const categories = [
  {
    titleKey: "homeCategories.skincare",
    image: "/Images/categories/Skincare.jpg",
    slug: "skincare",
  },
  {
    titleKey: "homeCategories.makeup",
    image: "/Images/categories/makeup.jpg",
    slug: "makeup",
  },
  {
    titleKey: "homeCategories.bodycare",
    image: "/Images/categories/Body-Care.jpg",
    slug: "body-care",
  },
  {
    titleKey: "homeCategories.fragrance",
    image: "/Images/categories/fragrance.jpg",
    slug: "fragrance",
  },
];

function Home() {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const { products, loading, error } = useProducts();

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <HeroCarousel />

        <div className="container hero__container">
          <motion.div
            className="hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="hero__subtitle">{t("homePage.heroSubtitle")}</span>

            <h1 className="hero__title">
              {t("homePage.heroTitle")}
              <br />
              <span className="text-primary">
                {t("homePage.heroHighlight")}
              </span>
            </h1>

            <p className="hero__description">{t("homePage.heroDescription")}</p>

            <div className="hero__actions">
              <Link to="/shop" className="btn btn--primary">
                {t("homePage.shopNow")} <ArrowRight size={16} />
              </Link>

              <Link to="/about" className="btn btn--outline">
                {t("homePage.ourStory")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <BrandsCarousel />

      {/* Store highlights */}
      <section className="features-bar">
        <div className="container features-bar__container">
          <div className="feature-item">
            <PackageCheck size={25} className="feature-item__icon" />
            <div>
              <h4>{t("homePage.features.selectionTitle")}</h4>
              <p>{t("homePage.features.selectionDescription")}</p>
            </div>
          </div>

          <div className="feature-item">
            <Heart size={25} className="feature-item__icon" />
            <div>
              <h4>{t("homePage.features.personalTitle")}</h4>
              <p>{t("homePage.features.personalDescription")}</p>
            </div>
          </div>

          <div className="feature-item">
            <Sparkles size={25} className="feature-item__icon" />
            <div>
              <h4>{t("homePage.features.inspirationTitle")}</h4>
              <p>{t("homePage.features.inspirationDescription")}</p>
            </div>
          </div>

          <div className="feature-item">
            <BookOpen size={25} className="feature-item__icon" />
            <div>
              <h4>{t("homePage.features.guidesTitle")}</h4>
              <p>{t("homePage.features.guidesDescription")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section categories">
        <div className="container">
          <div className="section__header">
            <div>
              <h2 className="section__title">
                {t("homePage.categoriesTitle")}
              </h2>

              <p className="section__description">
                {t("homePage.categoriesSubtitle")}
              </p>
            </div>

            <Link to="/shop" className="view-all">
              {t("homePage.viewAll")} <ArrowRight size={14} />
            </Link>
          </div>

          <div className="categories__grid">
            {categories.map((category, index) => (
              <motion.div
                key={category.slug}
                className="home-category"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
              >
                <Link
                  to={`/category/${category.slug}`}
                  className="home-category__link"
                >
                  <div className="home-category__image">
                    <img src={category.image} alt={t(category.titleKey)} />

                    <span className="home-category__arrow">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>

                  <div className="home-category__info">
                    <h3>{t(category.titleKey)}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="section featured-products">
        <div className="container">
          <div className="section__header">
            <div>
              <h2 className="section__title">{t("homePage.featuredTitle")}</h2>

              <p className="section__description">
                {t("homePage.featuredSubtitle")}
              </p>
            </div>

            <Link to="/shop" className="view-all">
              {t("homePage.viewAll")} <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="home-products-message">{t("homePage.loading")}</div>
          ) : error ? (
            <div className="home-products-message">
              {t("homePage.loadError")}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="home-products-message">
              {t("common.noProducts")}
            </div>
          )}
        </div>
      </section>

      {/* Brand story */}
      <section className="home-story">
        <div className="container home-story__container">
          <motion.div
            className="home-story__visual"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="/Images/about/rosa-home-story.jpg"
              alt={t("homePage.storyTitle")}
              loading="lazy"
            />

            <div className="home-story__visual-note">
              <Sparkles size={18} />
              <span>ROSA BEAUTY</span>
            </div>
          </motion.div>

          <motion.div
            className="home-story__content"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="section__eyebrow">
              {t("homePage.storyEyebrow")}
            </span>

            <h2>{t("homePage.storyTitle")}</h2>

            <p>{t("homePage.brandDescription")}</p>

            <Link to="/about" className="story-link">
              {t("homePage.brandButton")}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Routine guide */}
      <section className="section routine-section">
        <div className="container">
          <div className="routine-section__heading">
            <span className="section__eyebrow">ROSA BEAUTY</span>

            <h2 className="section__title">{t("homePage.routineTitle")}</h2>

            <p className="section__description">
              {t("homePage.routineDescription")}
            </p>
          </div>

          <div className="routine-grid">
            <Link to="/category/skincare" className="routine-card">
              <span className="routine-card__number">01</span>

              <div>
                <Leaf size={25} />
                <h3>{t("homeCategories.skincare")}</h3>
                <p>{t("homePage.routineDescription")}</p>
              </div>

              <ArrowUpRight size={20} className="routine-card__arrow" />
            </Link>

            <Link to="/category/makeup" className="routine-card">
              <span className="routine-card__number">02</span>

              <div>
                <Sparkles size={25} />
                <h3>{t("homeCategories.makeup")}</h3>
                <p>{t("homePage.routineDescription")}</p>
              </div>

              <ArrowUpRight size={20} className="routine-card__arrow" />
            </Link>

            <Link to="/category/body-care" className="routine-card">
              <span className="routine-card__number">03</span>

              <div>
                <Heart size={25} />
                <h3>{t("homeCategories.bodycare")}</h3>
                <p>{t("homePage.routineDescription")}</p>
              </div>

              <ArrowUpRight size={20} className="routine-card__arrow" />
            </Link>
          </div>

          <div className="routine-section__action">
            <Link to="/shop" className="btn btn--primary">
              {t("homePage.routineButton")}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Journal teaser */}
      <section className="home-journal">
        <div className="container home-journal__container">
          <div className="home-journal__content">
            <span className="section__eyebrow">ROSA JOURNAL</span>

            <h2>{t("homePage.journalTitle")}</h2>

            <p>{t("homePage.journalDescription")}</p>

            <Link to="/blog" className="btn btn--primary">
              {t("homePage.journalButton")}
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="home-journal__image">
            <img
              src="/Images/categories/Body-Care.jpg"
              alt={t("homePage.journalTitle")}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
