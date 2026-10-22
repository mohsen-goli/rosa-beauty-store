
import { useState, useEffect, useRef, useMemo, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import TopBar from "./TopBar";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { cartCount } = useCart();
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
  }, [searchQuery]);

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

  const handleResultClick = (productId: number) => {
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

  return (
    <>
      <TopBar />

      <header className="header">
        <div className="header__container">
          <Link to="/" className="header__logo">
            ROSA
          </Link>

          <nav className="header__nav">
            <Link to="/" className="header__link">Home</Link>
            <Link to="/shop" className="header__link">Shop</Link>
            <Link to="/category/skincare" className="header__link">Skincare</Link>
            <Link to="/category/makeup" className="header__link">Makeup</Link>
            <Link to="/about" className="header__link">About Us</Link>
            <Link to="/blog" className="header__link">Blog</Link>
          </nav>

          <div className="header__actions">
            <div className="header__search-wrapper" ref={searchRef}>
              {isSearchOpen ? (
                <form onSubmit={handleSubmit} className="header__search-inline">
                  <Search size={16} className="header__search-inline-icon" />

                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="header__search-inline-input"
                  />

                  <button
                    type="button"
                    className="header__search-inline-close"
                    aria-label="Close search"
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
                  aria-label="Search"
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
                    
                    >
                      View all results for "{searchQuery}" →
                    </button>
                  )}
                </div>
              )}
            </div>

            <button className="header__icon-btn" aria-label="Profile">
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
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen((previous) => !previous)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="header__mobile-menu">
            <Link to="/" className="header__mobile-link">Home</Link>
            <Link to="/shop" className="header__mobile-link">Shop</Link>
            <Link to="/category/skincare" className="header__mobile-link">Skincare</Link>
            <Link to="/category/makeup" className="header__mobile-link">Makeup</Link>
            <Link to="/about" className="header__mobile-link">About Us</Link>
            <Link to="/blog" className="header__mobile-link">Blog</Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
