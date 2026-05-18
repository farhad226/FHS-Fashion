import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { Search, Filter, Grid, List, ChevronDown, ArrowRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../context/WishlistContext';

export function Shop() {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [showSort, setShowSort] = useState(false);
  
  const categories = ['All', 'Shirts', 'T-Shirts', 'Pants', 'Shoes', 'Accessories'];
  const sortOptions = ['Featured', 'Newest', 'Price: Low to High', 'Price: High to Low'];
  
  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);


  return (
    <div className="pt-24 md:pt-48 pb-12 md:pb-20 px-[15px] md:px-12 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="mb-12 md:mb-24">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="max-w-4xl"
        >
          <div className="flex items-center space-x-4 mb-6 md:mb-8">
            <span className="h-[1px] w-12 md:w-16 bg-black"></span>
            <span className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] font-bold text-black/40">Established 2024</span>
          </div>
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 md:mb-10 uppercase leading-none">
            Curated Collection
          </h1>
          <p className="text-sm md:text-lg text-black/60 font-light leading-relaxed max-w-2xl italic">
            A meticulous exploration of form, fabric, and functionality. Every piece is an investment in timeless permanence, designed to transcend the transient nature of trend.
          </p>
        </motion.div>
      </div>

      {/* Controls Bar */}
      <div className="sticky top-[4rem] md:top-[4.5rem] z-40 bg-white/95 backdrop-blur-md border-y border-black/5 py-4 md:py-8 mb-6 md:mb-20 px-2 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0">
        {/* Categories */}
        <div className="flex items-center space-x-6 md:space-x-10 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "text-[9px] md:text-[10px] uppercase tracking-[0.25em] font-bold transition-all shrink-0 relative py-2",
                activeCategory === cat ? "text-black" : "text-black/30 hover:text-black"
              )}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div layoutId="cat-indicator" className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
              )}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-4 md:space-x-8">
           {/* Sort Dropdown */}
           <div className="relative">
             <button 
              onClick={() => setShowSort(!showSort)}
              className="flex items-center space-x-3 text-[10px] uppercase tracking-[0.2em] font-bold group"
             >
               <span className="text-black/30">Sort:</span>
               <span className="flex items-center">{sortBy} <ChevronDown className={cn("w-3 h-3 ml-2 transition-transform", showSort && "rotate-180")} /></span>
             </button>
             
             <AnimatePresence>
                {showSort && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-4 bg-white border border-black/5 shadow-2xl p-4 w-56 space-y-3 z-50 rounded-sm"
                  >
                    {sortOptions.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => { setSortBy(opt); setShowSort(false); }}
                        className={cn(
                          "block w-full text-left text-[9px] uppercase tracking-widest font-bold py-2 px-1 hover:bg-black/5 transition-colors",
                          sortBy === opt ? "text-black" : "text-black/30"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
             </AnimatePresence>
           </div>

           <div className="h-6 w-[1px] bg-black/5 hidden md:block" />

           {/* View Toggle */}
           <div className="flex items-center space-x-2">
              <button 
                onClick={() => setView('grid')} 
                className={cn("p-2.5 rounded-full transition-all", view === 'grid' ? "bg-black text-white" : "text-black/30 hover:bg-black/5")}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setView('list')} 
                className={cn("p-2.5 rounded-full transition-all", view === 'list' ? "bg-black text-white" : "text-black/30 hover:bg-black/5")}
              >
                <List className="w-4 h-4" />
              </button>
           </div>
        </div>
      </div>

      {/* Grid */}
      <div className={cn(
        "grid gap-x-6 md:gap-x-10 gap-y-16 md:gap-y-24",
        view === 'grid' ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
      )}>
        {filteredProducts.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
            className={cn("group relative", view === 'list' && "flex items-center space-x-16 border-b border-black/5 pb-16")}
          >
            {/* Visual Container */}
            <div className={cn(
              "overflow-hidden bg-[#F6F6F6] relative",
              view === 'grid' ? "aspect-[3/4] mb-6 md:mb-8" : "w-24 sm:w-80 aspect-[3/4] shrink-0"
            )}>
              <Link to={`/product/${p.id}`}>
                <img 
                  src={p.image} 
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out mix-blend-multiply"
                />
              </Link>
              
              {/* Overlay Action */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none group-hover:pointer-events-auto bg-gradient-to-t from-black/5 to-transparent">
                <Link 
                  to={`/product/${p.id}`}
                  className="w-full bg-black text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold shadow-2xl flex items-center justify-center space-x-3 hover:translate-y-[-2px] transition-all"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Info Container */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/30">{p.category}</p>
                <button 
                  onClick={() => {
                    if (isInWishlist(p.id.toString())) {
                      removeFromWishlist(p.id.toString());
                      showToast('Removed from wishlist');
                    } else {
                      addToWishlist({
                        id: p.id.toString(),
                        name: p.name,
                        price: p.price,
                        image: p.image
                      });
                      showToast('Added to wishlist');
                    }
                  }}
                  className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                   <Heart className={cn(
                     "w-4 h-4 transition-all",
                     isInWishlist(p.id.toString()) ? "fill-black text-black" : "text-black/30 hover:text-black"
                   )} />
                </button>
              </div>
              <h3 className="text-sm uppercase tracking-[0.25em] font-bold mb-3 group-hover:text-black/60 transition-colors">
                <Link to={`/product/${p.id}`}>{p.name}</Link>
              </h3>
              <p className="text-base font-light font-sans tracking-tight">{p.price}</p>
              
              {view === 'list' && (
                <div className="mt-8 space-y-6 max-w-xl">
                  <p className="text-sm text-black/50 leading-relaxed font-light font-sans">
                    Constructed from luxury textiles sourced for their integrity and environmental responsibility. A staple piece that defines the core of the FHS aesthetic.
                  </p>
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => {
                        addToCart({
                          id: p.id.toString(),
                          name: p.name,
                          price: p.price,
                          image: p.image,
                          size: 'M',
                          quantity: 1
                        });
                        showToast(`${p.name} added to your bag`);
                      }}
                      className="bg-black text-white px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold flex items-center space-x-4"
                    >
                      <span>Add to Bag</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        addToCart({
                          id: p.id.toString(),
                          name: p.name,
                          price: p.price,
                          image: p.image,
                          size: 'M',
                          quantity: 1
                        });
                        showToast(`${p.name} added to your bag`);
                      }}
                      className="border border-black/10 px-8 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:border-black transition-colors"
                    >
                      Quick Shop
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Nav */}
      <div className="mt-24 md:mt-48 pt-12 md:pt-24 border-t border-black/10 flex flex-col items-center">
        <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-black/30 mb-10">End of Collection</p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex flex-col items-center space-y-4"
        >
          <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
             <ChevronDown className="w-5 h-5 rotate-180" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold group-hover:tracking-[0.5em] transition-all duration-500">Back to Top</span>
        </button>
      </div>
    </div>
  );
}
