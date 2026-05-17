import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ShieldCheck, Truck, CreditCard, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { trackEcommerceEvent } from '../lib/analytics';

export function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    // Only track begin_checkout if the cart isn't empty and we haven't completed the order
    if (cart.length > 0 && !orderComplete) {
      trackEcommerceEvent.beginCheckout(cart, totalPrice);
    }
  }, [cart, totalPrice, orderComplete, step]);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="pt-24 md:pt-48 pb-12 md:pb-20 px-[15px] md:px-12 max-w-7xl mx-auto flex flex-col items-center">
        <h1 className="text-2xl font-bold tracking-tighter mb-4 uppercase">Your bag is empty</h1>
        <Link to="/shop" className="text-xs uppercase tracking-widest font-bold border-b border-black pb-1">Return to Shop</Link>
      </div>
    );
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(prev => prev + 1);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const transactionId = `FHS-${Math.floor(Math.random() * 100000)}`;
    trackEcommerceEvent.purchase(transactionId, cart, totalPrice);
    
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
  };

  if (orderComplete) {
    return (
      <div className="pt-24 md:pt-48 pb-12 md:pb-20 px-[15px] md:px-12 max-w-7xl mx-auto min-h-[70vh] flex flex-col justify-center items-center text-center">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="flex flex-col items-center"
        >
          <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
          <h1 className="text-4xl font-bold tracking-tighter mb-4 uppercase">Thank you for your order</h1>
          <p className="text-sm text-black/50 tracking-widest uppercase mb-12">Your order #FHS-{Math.floor(Math.random() * 100000)} has been placed successfully.</p>
          <Link 
            to="/" 
            className="bg-black text-white px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-black/80 transition-all"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-40 pb-12 md:pb-20 px-[15px] md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
      <div className="lg:col-span-12 mb-12">
        {/* Progress Bar */}
        <div className="flex items-center space-x-6 md:space-x-12 overflow-x-auto pb-4 no-scrollbar">
          <div className={cn("text-[10px] uppercase tracking-widest font-bold flex items-center space-x-3 shrink-0", step >= 1 ? "text-black" : "text-black/20")}>
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[10px]">1</span>
            <span>Customer Information</span>
          </div>
          <ChevronRight className="w-3 h-3 text-black/20 shrink-0" />
          <div className={cn("text-[10px] uppercase tracking-widest font-bold flex items-center space-x-3 shrink-0", step >= 2 ? "text-black" : "text-black/20")}>
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[10px]">2</span>
            <span>Shipping Logistics</span>
          </div>
          <ChevronRight className="w-3 h-3 text-black/20 shrink-0" />
          <div className={cn("text-[10px] uppercase tracking-widest font-bold flex items-center space-x-3 shrink-0", step >= 3 ? "text-black" : "text-black/20")}>
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[10px]">3</span>
            <span>Secure Payment</span>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleNextStep}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-xs uppercase tracking-widest font-bold mb-6 flex items-center">
                    <Truck className="w-4 h-4 mr-2" />
                    Contact Information
                  </h2>
                  <input 
                    required
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full border-b border-black/10 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <h2 className="text-xs uppercase tracking-widest font-bold mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input required placeholder="First Name" className="border-b border-black/10 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
                    <input required placeholder="Last Name" className="border-b border-black/10 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
                  </div>
                  <input required placeholder="Address" className="w-full border-b border-black/10 py-4 text-sm focus:outline-none focus:border-black transition-colors mt-4" />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <input required placeholder="City" className="border-b border-black/10 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
                    <input required placeholder="Postal Code" className="border-b border-black/10 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-black text-white py-5 text-xs uppercase tracking-widest font-bold hover:bg-black/90 transition-all"
                >
                  Continue to Shipping
                </button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <h2 className="text-xs uppercase tracking-widest font-bold mb-6">Select Shipping Method</h2>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-6 border border-black cursor-pointer bg-black/5">
                    <div className="flex items-center">
                      <input type="radio" name="shipping" defaultChecked className="mr-4 accent-black" />
                      <div>
                        <p className="text-xs uppercase tracking-widest font-bold">Standard Delivery</p>
                        <p className="text-[10px] text-black/50 uppercase tracking-wide">3-5 Business Days</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold">Free</span>
                  </label>
                  <label className="flex items-center justify-between p-6 border border-black/10 cursor-pointer hover:border-black transition-colors">
                    <div className="flex items-center">
                      <input type="radio" name="shipping" className="mr-4 accent-black" />
                      <div>
                        <p className="text-xs uppercase tracking-widest font-bold">Express Delivery</p>
                        <p className="text-[10px] text-black/50 uppercase tracking-wide">Next Day</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold">$25.00</span>
                  </label>
                </div>
                <button 
                  onClick={() => setStep(3)}
                  className="w-full bg-black text-white py-5 text-xs uppercase tracking-widest font-bold hover:bg-black/90 transition-all"
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <h2 className="text-xs uppercase tracking-widest font-bold mb-6 flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payment Details
                </h2>

                <div className="space-y-4">
                   {/* Credit Card */}
                   <label className="block border border-black/10 focus-within:border-black transition-colors cursor-pointer bg-white">
                     <div className="p-4 border-b border-black/5 flex items-center space-x-3">
                       <input type="radio" name="payment" defaultChecked className="accent-black" />
                       <span className="text-xs uppercase tracking-widest font-bold">Credit/Debit Card (Stripe)</span>
                     </div>
                     <div className="p-6 space-y-6">
                       <div className="relative">
                         <p className="text-[10px] uppercase tracking-widest text-black/40 mb-2">Card Number</p>
                         <input placeholder="0000 0000 0000 0000" className="w-full border-b border-black/10 py-2 focus:outline-none focus:border-black transition-colors" />
                       </div>
                       <div className="grid grid-cols-2 gap-8">
                         <div>
                           <p className="text-[10px] uppercase tracking-widest text-black/40 mb-2">Expiry</p>
                           <input placeholder="MM/YY" className="w-full border-b border-black/10 py-2 focus:outline-none focus:border-black transition-colors" />
                         </div>
                         <div>
                           <p className="text-[10px] uppercase tracking-widest text-black/40 mb-2">CVC</p>
                           <input placeholder="123" className="w-full border-b border-black/10 py-2 focus:outline-none focus:border-black transition-colors" />
                         </div>
                       </div>
                     </div>
                   </label>

                   {/* Other Digital Wallets */}
                   <label className="flex items-center space-x-3 p-4 border border-black/10 cursor-pointer hover:border-black transition-colors">
                     <input type="radio" name="payment" className="accent-black" />
                     <span className="text-xs uppercase tracking-widest font-bold flex-grow">PayPal</span>
                   </label>
                   
                   <label className="flex items-center space-x-3 p-4 border border-black/10 cursor-pointer hover:border-black transition-colors">
                     <input type="radio" name="payment" className="accent-black" />
                     <span className="text-xs uppercase tracking-widest font-bold flex-grow text-[#E2136E]">bKash</span>
                   </label>

                   <label className="flex items-center space-x-3 p-4 border border-black/10 cursor-pointer hover:border-black transition-colors">
                     <input type="radio" name="payment" className="accent-black" />
                     <span className="text-xs uppercase tracking-widest font-bold flex-grow text-[#F7931E]">Nagad</span>
                   </label>

                   <label className="flex items-center space-x-3 p-4 border border-black/10 cursor-pointer hover:border-black transition-colors">
                     <input type="radio" name="payment" className="accent-black" />
                     <span className="text-xs uppercase tracking-widest font-bold flex-grow">Cash on Delivery (COD)</span>
                   </label>
                </div>

                <button 
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className={cn(
                    "w-full py-5 text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center space-x-2 mt-8",
                    isProcessing ? "bg-black/50 text-white cursor-wait" : "bg-black text-white hover:bg-black/90"
                  )}
                >
                  {isProcessing ? 'Processing Order...' : `Complete Order • $${totalPrice.toFixed(2)}`}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Summary Sticky */}
        <div className="lg:col-span-5">
           <div className="sticky top-32 space-y-8">
              <div className="bg-gray-50/50 p-8 border border-black/5">
                <h2 className="text-xs uppercase tracking-widest font-bold mb-8">Summary</h2>
                <div className="space-y-6 max-h-[40vh] overflow-y-auto mb-8 pr-2">
                  {cart.map(item => (
                    <div key={`${item.id}-${item.size}`} className="flex items-center space-x-4">
                      <div className="w-16 aspect-[3/4] bg-white overflow-hidden shrink-0 border border-black/5">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-[10px] uppercase tracking-widest font-bold">{item.name}</p>
                        <p className="text-[8px] text-black/40 uppercase tracking-widest">Qty: {item.quantity} / Size: {item.size}</p>
                      </div>
                      <p className="text-xs font-bold">{item.price}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-black/10">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-black/50">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-black/50">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-xs uppercase tracking-widest font-bold pt-4">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4 opacity-30">
                 <ShieldCheck className="w-4 h-4" />
                 <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Encrypted Checkout</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
