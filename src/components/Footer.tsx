import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        {/* ستون ۱: برند */}
        <div className="footer__col">
          <h3 className="footer__logo">ROSA</h3>
          <p className="footer__desc">
            Timeless beauty for your everyday glow.
          </p>
        </div>

        {/* ستون ۲: لینک‌های سریع */}
        <div className="footer__col">
          <h4 className="footer__title">Shop</h4>
          <Link to="/shop" className="footer__link">
            Skincare
          </Link>
          <Link to="/shop" className="footer__link">
            Makeup
          </Link>
          <Link to="/shop" className="footer__link">
            Body Care
          </Link>
        </div>

        {/* ستون ۳: شرکت */}
        <div className="footer__col">
          <h4 className="footer__title">Company</h4>
          <Link to="/about" className="footer__link">
            About
          </Link>
          <Link to="/contact" className="footer__link">
            Contact
          </Link>
        </div>

        {/* ستون ۴: تماس */}
        <div className="footer__col">
          <h4 className="footer__title">Contact</h4>
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
            <span>Tehran, Iran</span>
          </div>
        </div>
      </div>

      {/* کپی رایت */}
      <div className="footer__bottom">
        <p>© 2026 ROSA. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
