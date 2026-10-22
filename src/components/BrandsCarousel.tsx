import React from "react";
import { motion } from "framer-motion";
import "./BrandsCarousel.css";

const BrandsCarousel = () => {
  const brands = [
    "Estée Lauder",
    "L'Oréal",
    "The Ordinary",
    "Clinique",
    "Laneige",
    "Olay",
    "Nivea",
    "Maybelline",
    "Estée Lauder",
    "L'Oréal",
  ];

  // تکرار برندها برای افکت بی‌نهایت
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="brands-section">
      <div className="container">
        <h3 className="brands-title">Trusted by Leading Beauty Brands</h3>
        <div className="brands-slider-container">
          <motion.div
            className="brands-track"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div key={index} className="brand-slide">
                <span className="brand-name">{brand}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandsCarousel;
