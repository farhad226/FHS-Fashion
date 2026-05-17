import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-20 px-4 text-center max-w-7xl mx-auto min-h-[70vh] flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#F6F6F6] p-20 rounded-full mb-10"
        >
          <ShoppingBag className="w-16 h-16 text-black/10" />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 uppercase">Your bag is empty</h1>
        <p className="text-xs md:text-sm text-black/40 tracking-[0.3em] uppercase mb-12 max-w-md leading-relaxed">
          The pieces you seek haven't been found. Explore our latest arrivals to define your silhouette.
        </p>
        <Link 
          to="/shop" 
          className="bg-black text-white px-12 py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-black border border-black transition-all shadow-xl"
        >
          Start Exploring
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-48 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-[0.4em] font-black text-black/30 mb-2">Your Selection</p>
        <h1 className="text-4xl md:text-5xl font-serif text-black mb-2">Shopping Bag</h1>
        <p className="text-sm text-black/40 font-light">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 pt-12 border-t border-black/5">
        {/* Cart Items */}
        <div className="lg:col-span-7 flex flex-col space-y-12">
          {cart.map((item, idx) => (
            <motion.div 
              key={`${item.id}-${item.size}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start space-x-8 pb-12 border-b border-black/5 group last:border-none"
            >
              <div className="w-32 aspect-square bg-[#F5F5F5] overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
              </div>
              
              <div className="flex-grow flex flex-col justify-between h-32 py-1">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest font-black text-black/30">T-Shirts</p>
                    <h3 className="text-xl font-serif text-black">{item.name}</h3>
                    <p className="text-[11px] text-black/60 font-light">Size: {item.size}</p>
                  </div>
                  <p className="text-sm font-bold text-black">{item.price}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center border border-black/10">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                      className="w-10 h-10 flex items-center justify-center text-black/40 hover:text-black transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-[11px] font-bold w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                      className="w-10 h-10 flex items-center justify-center text-black/40 hover:text-black transition-colors border-l border-black/10"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-[10px] uppercase tracking-widest font-black text-black/30 hover:text-red-500 transition-colors flex items-center"
                  >
                    <span className="mr-2">✕</span> Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-5">
          <div className="sticky top-40 border border-black/10 p-10 md:p-12 bg-white">
            <h2 className="text-2xl font-serif text-black mb-10">Order summary</h2>
            
            <div className="space-y-6 mb-10">
              <div className="flex justify-between text-sm font-light text-black/60">
                <span>Subtotal</span>
                <span className="text-black font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-light text-black/60">
                <span>Shipping</span>
                <span className="text-black font-medium">$15.00</span>
              </div>
              <div className="pt-6 border-t border-black/10 flex justify-between items-baseline">
                <span className="text-lg font-serif">Total</span>
                <span className="text-xl font-bold">${(totalPrice + 15).toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-[10px] text-black/40 font-medium">Add $155 more for free shipping.</p>
            </div>

            <Link 
              to="/checkout"
              className="w-full bg-black text-white py-5 text-[10px] uppercase tracking-[0.4em] font-black hover:bg-black/80 transition-all flex items-center justify-center mb-6"
            >
              Checkout
            </Link>
            
            <Link 
              to="/shop" 
              className="w-full flex justify-center text-[10px] uppercase tracking-[0.2em] font-black text-black/40 hover:text-black transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
