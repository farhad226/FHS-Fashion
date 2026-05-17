import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  if (wishlist.length === 0) {
    return (
      <div className="pt-32 pb-20 px-6 text-center max-w-7xl mx-auto min-h-[70vh] flex flex-col justify-center items-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="bg-[#F6F6F6] p-20 rounded-full mb-10"
        >
          <Heart className="w-16 h-16 text-black/10" />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 uppercase">Your wishlist is empty</h1>
        <p className="text-xs md:text-sm text-black/40 tracking-[0.3em] uppercase mb-12 max-w-md leading-relaxed">
          Save items you love here to keep track of your favorite pieces.
        </p>
        <Link 
          to="/shop" 
          className="bg-black text-white px-12 py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-black border border-black transition-all shadow-xl"
        >
          Discover Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-48 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-[0.4em] font-black text-black/30 mb-2">Saved Items</p>
        <h1 className="text-4xl md:text-5xl font-serif text-black mb-2">Wishlist</h1>
        <p className="text-sm text-black/40 font-light">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16 pt-12 border-t border-black/5">
        <AnimatePresence mode="popLayout">
          {wishlist.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group relative"
            >
              <div className="aspect-square overflow-hidden bg-[#F5F5F5] mb-6 relative">
                <Link to={`/product/${item.id}`}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                  />
                </Link>
                
                <button 
                  onClick={() => {
                    removeFromWishlist(item.id);
                    showToast(`${item.name} removed from wishlist`);
                  }}
                  className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md border border-black/5 hover:bg-black hover:text-white transition-all shadow-sm z-10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <button 
                    onClick={() => {
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        size: 'M',
                        quantity: 1
                      });
                      showToast(`${item.name} added to bag`);
                    }}
                    className="w-full bg-black text-white py-4 text-[9px] uppercase tracking-[0.4em] font-black shadow-2xl flex items-center justify-center space-x-3"
                  >
                    <span>Add to Bag</span>
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest font-black text-black/30">Luxe Collective</p>
                <h3 className="text-sm font-serif text-black italic">
                  <Link to={`/product/${item.id}`}>{item.name}</Link>
                </h3>
                <p className="text-xs font-bold text-black">{item.price}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-32 border-t border-black/10 pt-20 flex justify-between items-center">
        <Link to="/shop" className="group flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
             <ArrowRight className="w-4 h-4 rotate-180" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
}
