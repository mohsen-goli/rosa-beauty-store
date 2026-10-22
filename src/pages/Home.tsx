import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import BrandsCarousel from "../components/BrandsCarousel";
import HeroCarousel from "../components/HeroCarousel"; // 👈 ایمپورت جدید
import { products } from "../data/products";
import "./Home.css";

function Home() {
  const { addToCart } = useCart();
  const featuredProducts = products ? products.slice(0, 4) : [];

  return (
    <div className="home">
      {/* --- ۱. بخش هیرو (Full Background) --- */}
      <section className="hero">
        {/* عکس‌های کراسل به عنوان پس‌زمینه */}
        <HeroCarousel />

        <div className="container hero__container">
          <motion.div
            className="hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="hero__subtitle">BEAUTY THAT EMPOWERS</span>
            <h1 className="hero__title">
              Enhance Your <br />
              Natural <span className="text-primary">Glow</span>
            </h1>
            <p className="hero__description">
              Discover premium beauty & skincare products crafted to bring out
              the best in you.
            </p>
            <div className="hero__actions">
              <Link to="/shop" className="btn btn--primary">
                SHOP NOW <ArrowRight size={16} />
              </Link>
              <Link to="/shop" className="btn btn--outline">
                EXPLORE COLLECTIONS
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ۲. کراسل برندها */}
      <BrandsCarousel />

      {/* ۳. نوار مزیت‌ها */}
      <section className="features-bar">
        <div className="container features-bar__container">
          <div className="feature-item">
            <Truck size={24} className="feature-item__icon" />
            <div>
              <h4>Free Shipping</h4>
              <p>On orders over $49</p>
            </div>
          </div>
          <div className="feature-item">
            <ShieldCheck size={24} className="feature-item__icon" />
            <div>
              <h4>Secure Payments</h4>
              <p>100% Protected</p>
            </div>
          </div>
          <div className="feature-item">
            <RotateCcw size={24} className="feature-item__icon" />
            <div>
              <h4>Easy Returns</h4>
              <p>Within 30 Days</p>
            </div>
          </div>
          <div className="feature-item">
            <Headphones size={24} className="feature-item__icon" />
            <div>
              <h4>Best Quality</h4>
              <p>Premium Products</p>
            </div>
          </div>
        </div>
      </section>

      {/* ۴. دسته‌بندی‌ها */}
      <section className="section categories">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Shop by Category</h2>
          </div>
          <div className="categories__grid">
            <Link to="/category/skincare" className="category-card">
              <div className="category-card__image">
                <img src="/Images/categories/Skincare.jpg" alt="Skincare" />
              </div>
              <h3 className="category-card__title">Skincare</h3>
            </Link>
            <Link to="/category/makeup" className="category-card">
              <div className="category-card__image">
                <img src="/Images/categories/makeup.jpg" alt="Makeup" />
              </div>
              <h3 className="category-card__title">Makeup</h3>
            </Link>
            <Link to="/category/bodycare" className="category-card">
              <div className="category-card__image">
                <img src="/Images/categories/Body-Care.jpg" alt="Body Care" />
              </div>
              <h3 className="category-card__title">Body Care</h3>
            </Link>
            <Link to="/category/fragrance" className="category-card">
              <div className="category-card__image">
                <img src="/Images/categories/fragrance.jpg" alt="Fragrance" />
              </div>
              <h3 className="category-card__title">Fragrance</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* ۵. محصولات ویژه */}
      <section className="section featured-products">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Best Sellers</h2>
            <Link to="/shop" className="view-all">
              View All Products <ArrowRight size={14} />
            </Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
