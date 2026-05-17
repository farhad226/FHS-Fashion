import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Warehouse, 
  ShoppingCart, 
  Users, 
  Briefcase, 
  Megaphone, 
  Settings,
  Menu,
  X,
  MessageSquare,
  LayoutTemplate
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Inventory', path: '/admin/inventory', icon: Warehouse },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Storefront CMS', path: '/admin/cms', icon: LayoutTemplate },
    { name: 'Support Bot', path: '/admin/support', icon: MessageSquare },
    { name: 'ERP System', path: '/admin/erp', icon: Briefcase },
    { name: 'Marketing', path: '/admin/marketing', icon: Megaphone },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#111] text-[#A0A0A0]">
      <div className="p-8 border-b border-[#333]">
        <h2 className="text-white text-xl font-bold tracking-tighter uppercase">Admin Panel</h2>
        <p className="text-[10px] uppercase tracking-[0.2em] mt-2 text-[#666]">System Control</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-8">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 text-[11px] uppercase tracking-widest font-bold",
                    isActive ? "bg-white text-black" : "hover:bg-[#222] hover:text-white"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-8 border-t border-[#333]">
        <Link to="/" className="text-[10px] uppercase tracking-widest hover:text-white transition-colors flex items-center space-x-2">
          <span>&larr; Back to Store</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#111] text-white z-50 flex items-center justify-between px-6">
        <h2 className="text-lg font-bold tracking-tighter uppercase">Admin</h2>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-[#111] z-50"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16 lg:pt-0 overflow-x-hidden min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
