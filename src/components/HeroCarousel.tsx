import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./HeroCarousel.css";

const HeroCarousel = () => {
  const images = [
    "/Images/hero/hero-1.jpg",
    "/Images/hero/hero-2.jpg",
    "/Images/hero/hero-3.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="hero-carousel-bg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="hero-carousel-bg__slide"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* لایه‌ی گرادیان برای خوانایی متن */}
      <div className="hero-carousel-bg__overlay" />

      {/* نقطه‌های پایین */}
      <div className="hero-carousel-bg__dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`hero-carousel-bg__dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
