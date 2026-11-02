import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
    title: "Skincare",
    description: "Care for your everyday glow",
    image: "/Images/categories/Skincare.jpg",
    slug: "skincare",
  },
  {
    title: "Makeup",
    description: "Express your own beauty",
    image: "/Images/categories/makeup.jpg",
    slug: "makeup",
  },
  {
    title: "Body Care",
    description: "A little care from head to toe",
    image: "/Images/categories/Body-Care.jpg",
    slug: "body-care",
  },
  {
    title: "Fragrance",
    description: "Find a scent that feels like you",
    image: "/Images/categories/fragrance.jpg",
    slug: "fragrance",
  },
];

function Home() {
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
            <span className="hero__subtitle">BEAUTY THAT EMPOWERS</span>

            <h1 className="hero__title">
              Enhance Your <br />
              Natural <span className="text-primary">Glow</span>
            </h1>

            <p className="hero__description">
              Discover beauty and skincare essentials that help you create a
              routine that feels uniquely yours.
            </p>

            <div className="hero__actions">
              <Link to="/shop" className="btn btn--primary">
                SHOP NOW <ArrowRight size={16} />
              </Link>

              <Link to="/about" className="btn btn--outline">
                OUR STORY
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand carousel */}
      <BrandsCarousel />

      {/* Store highlights */}
      <section className="features-bar">
        <div className="container features-bar__container">
          <div className="feature-item">
            <PackageCheck size={25} className="feature-item__icon" />
            <div>
              <h4>Product Selection</h4>
              <p>Explore our beauty collection</p>
            </div>
          </div>

          <div className="feature-item">
            <Heart size={25} className="feature-item__icon" />
            <div>
              <h4>Made for You</h4>
              <p>Find products you will love</p>
            </div>
          </div>

          <div className="feature-item">
            <Sparkles size={25} className="feature-item__icon" />
            <div>
              <h4>Beauty Inspiration</h4>
              <p>Ideas for your daily routine</p>
            </div>
          </div>

          <div className="feature-item">
            <BookOpen size={25} className="feature-item__icon" />
            <div>
              <h4>Helpful Guides</h4>
              <p>Learn more about beauty care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section categories">
        <div className="container">
          <div className="section__header">
            <div>
              <span className="section__eyebrow">EXPLORE ROSA</span>
              <h2 className="section__title">Find Your Beauty Essentials</h2>
              <p className="section__description">
                Explore our collections and discover what fits your routine.
              </p>
            </div>

            <Link to="/shop" className="view-all">
              ALL PRODUCTS <ArrowRight size={14} />
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
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <Link
                  to={`/category/${category.slug}`}
                  className="home-category__link"
                >
                  <div className="home-category__image">
                    <img src={category.image} alt={category.title} />
                    <span className="home-category__arrow">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>

                  <div className="home-category__info">
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
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
              <span className="section__eyebrow">THE ROSA SELECTION</span>
              <h2 className="section__title">Discover Our Products</h2>
              <p className="section__description">
                Take a closer look at the products in our collection.
              </p>
            </div>

            <Link to="/shop" className="view-all">
              VIEW ALL <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="home-products-message">Loading products...</div>
          ) : error ? (
            <div className="home-products-message">
              Products could not be loaded. Please try again later.
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
              No products are available right now.
            </div>
          )}
        </div>
      </section>

      {/* Brand story */}
      <section className="home-story">
        <div className="container home-story__container">
          <div className="home-story__visual">
            <img
              src="/Images/categories/Skincare.jpg"
              alt="Beauty and skincare collection"
            />
            <div className="home-story__visual-note">
              <Sparkles size={18} />
              <span>A moment for yourself</span>
            </div>
          </div>

          <div className="home-story__content">
            <span className="section__eyebrow">A LITTLE ABOUT ROSA</span>

            <h2>
              Beauty Is More Than
              <span> What You See</span>
            </h2>

            <p>
              We believe beauty is personal. It is about discovering what makes
              you feel confident, comfortable and authentically yourself.
            </p>

            <p>
              ROSA brings beauty products and inspiration together to make
              exploring your own routine a little easier.
            </p>

            <Link to="/about" className="story-link">
              GET TO KNOW ROSA <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Routine guide */}
      <section className="section routine-section">
        <div className="container">
          <div className="routine-section__heading">
            <span className="section__eyebrow">YOUR ROUTINE, YOUR WAY</span>
            <h2 className="section__title">Where Would You Like to Start?</h2>
            <p className="section__description">
              A simple starting point for exploring your beauty routine.
            </p>
          </div>

          <div className="routine-grid">
            <Link to="/category/skincare" className="routine-card">
              <span className="routine-card__number">01</span>
              <div>
                <Leaf size={25} />
                <h3>Care for Your Skin</h3>
                <p>Explore skincare products and daily essentials.</p>
              </div>
              <ArrowUpRight size={20} className="routine-card__arrow" />
            </Link>

            <Link to="/category/makeup" className="routine-card">
              <span className="routine-card__number">02</span>
              <div>
                <Sparkles size={25} />
                <h3>Express Your Style</h3>
                <p>Discover makeup products for your own look.</p>
              </div>
              <ArrowUpRight size={20} className="routine-card__arrow" />
            </Link>

            <Link to="/category/body-care" className="routine-card">
              <span className="routine-card__number">03</span>
              <div>
                <Heart size={25} />
                <h3>Make Time for You</h3>
                <p>Explore everyday body care essentials.</p>
              </div>
              <ArrowUpRight size={20} className="routine-card__arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* Journal teaser */}
      <section className="home-journal">
        <div className="container home-journal__container">
          <div className="home-journal__content">
            <span className="section__eyebrow">THE ROSA JOURNAL</span>
            <h2>A Little Inspiration for Your Beauty Routine</h2>
            <p>
              Explore simple guides, beauty ideas and helpful tips to make more
              informed choices about your routine.
            </p>

            <Link to="/blog" className="btn btn--primary">
              EXPLORE THE JOURNAL <ArrowRight size={16} />
            </Link>
          </div>

          <div className="home-journal__image">
            <img
              src="/Images/categories/Body-Care.jpg"
              alt="Beauty journal inspiration"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
