import { useState, useEffect, useRef, useMemo, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import TopBar from "./TopBar";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { t, i18n } = useTranslation();
  const { cartCount } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
      .slice(0, 5);
  }, [searchQuery, products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchOpen]);

  const handleResultClick = (productId: string | number) => {
    navigate(`/product/${productId}`);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <TopBar />

      <header className="header">
        <div className="header__container">
          <Link to="/" className="header__logo">
            ROSA
          </Link>

          <nav className="header__nav">
            <Link to="/" className="header__link">
              {t("home")}
            </Link>
            <Link to="/shop" className="header__link">
              {t("shop")}
            </Link>
            <Link to="/category/skincare" className="header__link">
              {t("skincare")}
            </Link>
            <Link to="/category/makeup" className="header__link">
              {t("makeup")}
            </Link>
            <Link to="/about" className="header__link">
              {t("about")}
            </Link>
            <Link to="/blog" className="header__link">
              {t("blog")}
            </Link>
          </nav>

          <div className="header__actions">
            <select
              className="header__language-select"
              value={i18n.resolvedLanguage || i18n.language}
              onChange={(event) => handleLanguageChange(event.target.value)}
              aria-label="Select language"
            >
              <option value="en">EN</option>
              <option value="fa">FA</option>
              <option value="ar">AR</option>
            </select>

            <div className="header__search-wrapper" ref={searchRef}>
              {isSearchOpen ? (
                <form onSubmit={handleSubmit} className="header__search-inline">
                  <Search size={16} className="header__search-inline-icon" />

                  <input
                    ref={inputRef}
                    type="text"
                    placeholder={t("search")}
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="header__search-inline-input"
                  />

                  <button
                    type="button"
                    className="header__search-inline-close"
                    aria-label={t("closeSearch")}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    <X size={16} />
                  </button>
                </form>
              ) : (
                <button
                  className="header__icon-btn"
                  aria-label={t("search")}
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search size={20} />
                </button>
              )}

              {isSearchOpen && results.length > 0 && (
                <div className="header__search-results">
                  {results.map((product) => (
                    <button
                      key={product.id}
                      className="header__search-result-item"
                      onClick={() => handleResultClick(product.id)}
                    >
                      <img src={product.image} alt={product.name} />
                      <div>
                        <p>{product.name}</p>
                        <span>${product.price}</span>
                      </div>
                    </button>
                  ))}

                  {searchQuery.trim().length > 0 && (
                    <button
                      type="button"
                      className="header__search-view-all"
                      onClick={() => {
                        const query = searchQuery.trim();

                        if (query) {
                          navigate(`/search?q=${encodeURIComponent(query)}`);
                          setIsSearchOpen(false);
                          setSearchQuery("");
                        }
                      }}
                    >
                      {t("viewAllResults", { query: searchQuery })} →
                    </button>
                  )}
                </div>
              )}
            </div>

            <button className="header__icon-btn" aria-label={t("profile")}>
              <User size={20} />
            </button>

            <Link to="/cart" className="header__icon-btn header__cart-btn">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="header__cart-count">{cartCount}</span>
              )}
            </Link>

            <button
              className="header__icon-btn header__menu-toggle"
              aria-label={t("toggleMenu")}
              onClick={() => setIsMenuOpen((previous) => !previous)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="header__mobile-menu">
            <Link to="/" className="header__mobile-link">
              {t("home")}
            </Link>
            <Link to="/shop" className="header__mobile-link">
              {t("shop")}
            </Link>
            <Link to="/category/skincare" className="header__mobile-link">
              {t("skincare")}
            </Link>
            <Link to="/category/makeup" className="header__mobile-link">
              {t("makeup")}
            </Link>
            <Link to="/about" className="header__mobile-link">
              {t("about")}
            </Link>
            <Link to="/blog" className="header__mobile-link">
              {t("blog")}
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
