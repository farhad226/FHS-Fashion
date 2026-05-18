import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
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
import { AdminLayout } from './pages/admin/AdminLayout';
import { Overview } from './pages/admin/Overview';
import { StorefrontProvider, useStorefront } from './context/StorefrontContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { AIChatbot } from './components/AIChatbot';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { Wishlist } from './pages/Wishlist';

import { ProductManagement } from './pages/admin/ProductManagement';
import { InventoryManagement } from './pages/admin/InventoryManagement';
import { OrderManagement } from './pages/admin/OrderManagement';
import { CustomerManagement } from './pages/admin/CustomerManagement';
import { ERPSystem } from './pages/admin/ERPSystem';
import { MarketingTools } from './pages/admin/MarketingTools';
import { AdminSettings } from './pages/admin/AdminSettings';
import { StorefrontCMS } from './pages/admin/StorefrontCMS';
import { ChatbotManagement } from './pages/admin/ChatbotManagement';
import { CustomCSS } from './pages/admin/CustomCSS';

const StorefrontLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <AIChatbot />
      <ScrollToTop />
    </div>
  );
};

const MainContent = () => {
  const { cmsData } = useStorefront();
  return (
    <Router>
      <style>{cmsData.customCSS}</style>
      <Routes>
        {/* Storefront Layout with Navbar and Footer */}
        <Route element={<StorefrontLayout />}>
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
          <Route path="/account/profile" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Admin Layout without Navbar and Footer */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Overview />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="inventory" element={<InventoryManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="cms" element={<StorefrontCMS />} />
          <Route path="support" element={<ChatbotManagement />} />
          <Route path="erp" element={<ERPSystem />} />
          <Route path="css" element={<CustomCSS />} />
          <Route path="marketing" element={<MarketingTools />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route index element={<Overview />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default function App() {
  return (
    <StorefrontProvider>
      <AuthProvider>
        <ToastProvider>
          <WishlistProvider>
            <CartProvider>
              <MainContent />
            </CartProvider>
          </WishlistProvider>
        </ToastProvider>
      </AuthProvider>
    </StorefrontProvider>
  );
}
