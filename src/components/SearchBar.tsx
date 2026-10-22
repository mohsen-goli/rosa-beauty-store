import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { products } from "../data/products";

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  // فوکوس روی input وقتی باز می‌شه
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // بستن با Esc
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // بستن با کلیک بیرون
  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const results = query.trim()
    ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery("");
    }
  }

  function handleSelectResult() {
    setIsOpen(false);
    setQuery("");
  }

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <button
        className="search-toggle"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Search"
      >
        <Search size={18} />
      </button>

      {isOpen && (
        <div className="search-panel">
          <form onSubmit={handleSubmit} className="search-form">
            <Search size={16} className="search-form-icon" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setQuery("")}
                aria-label="Clear"
              >
                <X size={14} />
              </button>
            )}
          </form>

          {query.trim() && (
            <div className="search-results">
              {results.length === 0 ? (
                <p className="search-empty">No products found for "{query}"</p>
              ) : (
                results.slice(0, 5).map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="search-result-item"
                    onClick={handleSelectResult}
                  >
                    <img src={p.image} alt={p.name} />
                    <div>
                      <p>{p.name}</p>
                      <span>${p.price}</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
