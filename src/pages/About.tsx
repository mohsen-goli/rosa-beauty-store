import { Link } from "react-router-dom";
import { ArrowLeft, Leaf, Heart, Sparkles, Award } from "lucide-react";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Back to Home
        </Link>

        {/* هدر صفحه */}
        <div className="about-header">
          <p className="about-header__subtitle">OUR STORY</p>
          <h1 className="about-header__title">
            Beauty Inspired by Nature, <br />
            Perfected by <span className="text-primary">Science</span>
          </h1>
          <p className="about-header__description">
            At ROSA, we believe beauty begins with healthy skin. Our products
            combine the best of nature and advanced skincare science to bring
            out your natural glow.
          </p>
        </div>

        {/* بخش تصویر + متن */}
        <div className="about-story">
          <div className="about-story__image">
            <img
              src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop"
              alt="About ROSA"
            />
          </div>
          <div className="about-story__content">
            <h2>Our Mission</h2>
            <p>
              We are committed to creating clean, effective, and sustainable
              beauty products. Every formula is carefully crafted with premium
              ingredients that are gentle on your skin and kind to the planet.
            </p>
            <p>
              From our beginnings as a small laboratory to becoming a trusted
              brand for thousands of customers, our mission has always been the
              same: to help you feel confident in your own skin.
            </p>
          </div>
        </div>

        {/* ارزش‌های ما */}
        <div className="about-values">
          <h2 className="about-values__title">What We Stand For</h2>
          <div className="about-values__grid">
            <div className="value-card">
              <div className="value-card__icon">
                <Leaf size={28} />
              </div>
              <h3>Natural Ingredients</h3>
              <p>Carefully selected botanical extracts for your skin.</p>
            </div>
            <div className="value-card">
              <div className="value-card__icon">
                <Heart size={28} />
              </div>
              <h3>Cruelty-Free</h3>
              <p>We never test on animals. Beauty with compassion.</p>
            </div>
            <div className="value-card">
              <div className="value-card__icon">
                <Sparkles size={28} />
              </div>
              <h3>Clinically Proven</h3>
              <p>Dermatologically tested and safe for all skin types.</p>
            </div>
            <div className="value-card">
              <div className="value-card__icon">
                <Award size={28} />
              </div>
              <h3>Premium Quality</h3>
              <p>High-performance formulas with visible results.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="about-cta">
          <h2>Ready to Discover Your Glow?</h2>
          <Link to="/shop" className="btn btn--primary">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
