import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { About } from './pages/About';
import { Reviews } from './pages/Reviews';
import { ProductDetail } from './pages/ProductDetail';
import { Login } from './pages/Login';
import { CartPage } from './pages/CartPage';
import { Checkout } from './pages/Checkout';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/Admin';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { AIChatbot } from './components/AIChatbot';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { Wishlist } from './pages/Wishlist';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <WishlistProvider>
          <CartProvider>
            <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/category/:name" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/account/profile" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
            <Footer />
            <AIChatbot />
            <ScrollToTop />
          </div>
        </Router>
      </CartProvider>
        </WishlistProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
