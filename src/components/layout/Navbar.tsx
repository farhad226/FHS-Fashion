import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, ArrowRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  const dummyProducts = [
    { id: 1, name: 'Essentials White Tee', category: 'T-Shirts' },
    { id: 2, name: 'Linen Blend Shirt', category: 'Shirts' },
    { id: 3, name: 'Chino Trousers', category: 'Pants' },
    { id: 4, name: 'Classic Loafers', category: 'Shoes' },
    { id: 5, name: 'Tech Shell Jacket', category: 'Shirts' },
    { id: 6, name: 'Wayfarer Sunglasses', category: 'Accessories' },
    { id: 7, name: 'Heavyweight Cotton Tee', category: 'T-Shirts' },
    { id: 8, name: 'Minimalist Leather Sneakers', category: 'Shoes' },
  ];

  const suggestionsList = dummyProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const match = dummyProducts.find(p => p.name.toLowerCase() === searchQuery.toLowerCase());
    if (match) {
      navigate(`/product/${match.id}`);
      setIsSearchOpen(false);
      setShowSuggestions(false);
      setSearchQuery('');
    } else if (suggestionsList.length > 0) {
      // If no exact match but suggestions exist, take the first one
      navigate(`/product/${suggestionsList[0].id}`);
      setIsSearchOpen(false);
      setShowSuggestions(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Reviews', path: '/reviews' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100]">
      {/* Search Overlay (kept as backup for mobile) */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[200] flex flex-col pt-32 px-6 md:px-20"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-10 right-10 p-4 hover:bg-black/5 rounded-full transition-all"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="max-w-4xl mx-auto w-full">
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/30 mb-8">What are you looking for?</p>
              <div className="relative">
                <form onSubmit={handleSearch}>
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="SEARCH OUR COLLECTION..." 
                    className="w-full text-4xl md:text-7xl font-bold uppercase tracking-tighter border-none focus:ring-0 placeholder:text-black/5 bg-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 p-4">
                    <ArrowRight className="w-10 h-10" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Promo Bar - Exact Reference Style */}
      {showPromo && (
        <div className="bg-[#BFA48F] text-white py-1 px-4 relative flex justify-center items-center">
          <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-center">
            Sale Update: Up to 60% off <span className="underline ml-2 cursor-pointer">Buy Now</span>
          </p>
          <button 
            onClick={() => setShowPromo(false)}
            className="absolute right-4 p-1 hover:opacity-50 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <nav className={cn(
        "transition-all duration-500 border-b",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md border-black/5 py-4" 
          : "bg-white border-transparent py-6"
      )}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between gap-10">
            {/* Logo - Left */}
            <Link 
              to="/" 
              className="text-3xl font-black tracking-[-0.05em] hover:opacity-70 transition-opacity shrink-0"
            >
              MENNY
            </Link>

            {/* Desktop Navigation - Leftish */}
            <div className="hidden md:flex items-center space-x-10 flex-1">
              {['Home', 'Shop', 'About', 'Reviews'].map((link) => (
                <NavLink
                  key={link}
                  to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                  className={({ isActive }) => cn(
                    "text-[10px] uppercase tracking-[0.2em] font-bold transition-colors py-2",
                    isActive ? "text-black" : "text-black/40 hover:text-black"
                  )}
                >
                  {link}
                </NavLink>
              ))}
            </div>

            {/* Center Search - Refined UX */}
            <div className="hidden lg:flex items-center flex-1 max-w-md relative group">
              <Search className="absolute left-4 w-3.5 h-3.5 text-black/30 group-focus-within:text-black transition-colors" />
              <form onSubmit={handleSearch} className="w-full">
                <input 
                  type="text"
                  value={searchQuery}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find product..."
                  className="w-full bg-[#F5F5F5] border-none rounded-full py-2.5 pl-11 pr-10 text-[10px] font-medium tracking-wide focus:ring-1 focus:ring-black/10 transition-all focus:bg-white focus:shadow-sm"
                />
              </form>
              <AnimatePresence>
                {searchQuery && (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 p-1 hover:bg-black/5 rounded-full transition-all"
                  >
                    <X className="w-3 h-3 text-black/40" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Autocomplete Suggestions */}
              <AnimatePresence>
                {showSuggestions && searchQuery.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-black/5 shadow-2xl rounded-2xl overflow-hidden z-[300]"
                  >
                    <div className="p-4">
                      <p className="text-[8px] uppercase tracking-[0.3em] font-black text-black/20 mb-3 ml-2">Suggestions</p>
                      <div className="space-y-1">
                        {suggestionsList.length > 0 ? suggestionsList.map((p, i) => (
                          <button 
                            key={i}
                            onClick={() => { 
                              navigate(`/product/${p.id}`);
                              setSearchQuery(''); 
                              setShowSuggestions(false); 
                            }}
                            className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#F5F5F5] transition-all flex items-center space-x-3 group/item"
                          >
                            <Search className="w-3 h-3 text-black/20 group-hover/item:text-black transition-colors" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{p.name}</span>
                            <ArrowRight className="w-3 h-3 text-black/0 -translate-x-2 group-hover/item:text-black group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all ml-auto" />
                          </button>
                        )) : (
                          <p className="p-3 text-[10px] text-black/30 font-medium italic">No matches found...</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Icons - Tablet/Desktop & Mobile simplified */}
            <div className="flex items-center space-x-1 md:space-x-5">
              {/* Search - Mobile Toggle */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="lg:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <Search className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <Link to="/wishlist" className="hidden sm:block p-2 hover:bg-black/5 rounded-full transition-colors relative">
                <Heart className="w-4 h-4 md:w-5 md:h-5" />
                {totalWishlistItems > 0 && (
                  <span className="absolute top-1 right-1 w-3 h-3 bg-black text-white text-[6px] flex items-center justify-center rounded-full font-bold">
                    {totalWishlistItems}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-3 h-3 bg-black text-white text-[6px] flex items-center justify-center rounded-full font-bold border border-white">
                    {totalItems}
                  </span>
                )}
              </Link>

              <Link 
                to={user ? "/dashboard" : "/login"} 
                className={cn(
                  "hidden md:block px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                  user ? "bg-[#F5F5F5] text-black" : "bg-black text-white hover:bg-black/80"
                )}
              >
                {user ? user.user_metadata?.full_name?.split(' ')[0] : 'Sign in'}
              </Link>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 w-full h-[100dvh] bg-black/40 backdrop-blur-sm z-[250] md:hidden"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[85%] h-[100dvh] max-w-sm bg-white z-[300] md:hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-black/5">
                <span className="text-sm font-black uppercase tracking-widest">Menu</span>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8">
                <nav className="space-y-6">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center group"
                      >
                        <span className="text-2xl uppercase font-black tracking-tighter text-black group-hover:pl-4 transition-all duration-300">
                          {link.name}
                        </span>
                        <ArrowRight className="w-5 h-5 ml-auto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-12 pt-12 border-t border-black/5 space-y-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link 
                      to="/wishlist" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-black/50 hover:text-black transition-colors"
                    >
                      My Wishlist
                      <div className="flex items-center">
                        <span className="mr-3">{totalWishlistItems}</span>
                        <Heart className="w-4 h-4" />
                      </div>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link 
                      to={user ? "/dashboard" : "/login"}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between p-4 bg-black text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                    >
                      {user ? `Welcome, ${user.user_metadata?.full_name?.split(' ')[0] || 'Member'}` : 'Sign In / Account'}
                      <User className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>

              <div className="p-6 bg-[#F5F5F5]">
                <p className="text-[9px] uppercase tracking-widest font-bold text-black/20 text-center mb-4">Support & Help</p>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-white p-3 rounded-lg text-[9px] font-bold uppercase tracking-widest text-center shadow-sm">Contact</button>
                  <button className="bg-white p-3 rounded-lg text-[9px] font-bold uppercase tracking-widest text-center shadow-sm">FAQ</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
