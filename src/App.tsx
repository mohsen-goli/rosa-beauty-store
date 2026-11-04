import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ProductsProvider } from "./context/ProductsContext";

import { ToastProvider } from "./components/ToastProvider";
import PageTransition from "./components/PageTransition";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import SearchPage from "./pages/SearchPage";
import WishlistPage from "./pages/WishlistPage";
import About from "./pages/About";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import BlogDetail from "./pages/BlogDetail";
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />

        <Route
          path="/shop"
          element={
            <PageTransition>
              <Shop />
            </PageTransition>
          }
        />

        <Route
          path="/product/:id"
          element={
            <PageTransition>
              <ProductDetail />
            </PageTransition>
          }
        />

        <Route
          path="/category/:category"
          element={
            <PageTransition>
              <CategoryPage />
            </PageTransition>
          }
        />

        <Route
          path="/search"
          element={
            <PageTransition>
              <SearchPage />
            </PageTransition>
          }
        />

        <Route
          path="/cart"
          element={
            <PageTransition>
              <CartPage />
            </PageTransition>
          }
        />

        <Route
          path="/wishlist"
          element={
            <PageTransition>
              <WishlistPage />
            </PageTransition>
          }
        />

        <Route
          path="/checkout"
          element={
            <PageTransition>
              <Checkout />
            </PageTransition>
          }
        />

        <Route
          path="/success"
          element={
            <PageTransition>
              <Success />
            </PageTransition>
          }
        />

        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />

        <Route
          path="/blog"
          element={
            <PageTransition>
              <Blog />
            </PageTransition>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <PageTransition>
              <BlogDetail />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <ProductsProvider>
              <Header />

              <main>
                <AnimatedRoutes />
              </main>

              <Footer />
            </ProductsProvider>
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
