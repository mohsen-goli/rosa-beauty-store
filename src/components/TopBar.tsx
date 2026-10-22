import React from "react";
import { Truck, ShieldCheck, Sparkles } from "lucide-react";
import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-bar__container">
        <div className="top-bar__item">
          <Truck size={14} />
          <span>Free Shipping on orders over $49</span>
        </div>
        <div className="top-bar__item">
          <Sparkles size={14} />
          <span>
            Exclusive Offers | 20% OFF your first order - Code: GLOW20
          </span>
        </div>
        <div className="top-bar__item">
          <ShieldCheck size={14} />
          <span>100% Authentic Products</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
