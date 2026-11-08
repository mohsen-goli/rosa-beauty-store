import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Truck, ShieldCheck, Sparkles } from "lucide-react";
import "./TopBar.css";

const TopBar = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const messages = [
    {
      icon: <Truck size={15} strokeWidth={1.7} />,
      text: t("topBar.shipping"),
    },
    {
      icon: <Sparkles size={15} strokeWidth={1.7} />,
      text: t("topBar.offer"),
    },
    {
      icon: <ShieldCheck size={15} strokeWidth={1.7} />,
      text: t("topBar.authentic"),
    },
  ];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % messages.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [messages.length]);

  const activeMessage = messages[activeIndex];

  return (
    <div className="top-bar">
      <div className="top-bar__container">
        <div className="top-bar__message" key={activeIndex} aria-live="polite">
          <span className="top-bar__icon">{activeMessage.icon}</span>
          <span className="top-bar__text">{activeMessage.text}</span>
        </div>

        <div className="top-bar__indicators" aria-hidden="true">
          {messages.map((_, index) => (
            <span
              key={index}
              className={`top-bar__indicator ${
                activeIndex === index ? "is-active" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar;