import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1C1C1C] text-white pt-24 pb-12 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 h-full">
          {/* Left Section */}
          <div className="lg:col-span-7 lg:pr-20 space-y-16">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold tracking-tight">MENNY</h2>
              <p className="text-white/50 text-sm leading-relaxed max-w-md">
                From timeless classics to cutting-edge designs, we empower your fashion journey by offering a range that speaks sophistication.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-start">
              <div className="space-y-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">Quick Links</h3>
                <ul className="space-y-4 text-sm text-white/40">
                  <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link to="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
                  <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
                  <li><Link to="/reviews" className="hover:text-white transition-colors">Blog</Link></li>
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">Help</h3>
                <ul className="space-y-4 text-sm text-white/40">
                  <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                  <li><Link to="/search" className="hover:text-white transition-colors">Search</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link to="/size-guide" className="hover:text-white transition-colors">Size Chart</Link></li>
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">Contact Info</h3>
                <ul className="space-y-4 text-sm text-white/40 leading-relaxed font-light">
                  <li>2972 Westheimer Rd. <br /> Santa Ana, Illinois <br /> 85486</li>
                  <li>(406) 555-0120</li>
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white whitespace-nowrap">Accept Payment</h3>
                <div className="grid grid-cols-2 gap-2 max-w-[120px]">
                  <div className="h-7 bg-white rounded-sm flex items-center justify-center p-1"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-full" alt="Visa" /></div>
                  <div className="h-7 bg-white rounded-sm flex items-center justify-center p-1"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-full" alt="Mastercard" /></div>
                  <div className="h-7 bg-white rounded-sm flex items-center justify-center p-1"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-full" alt="PayPal" /></div>
                  <div className="h-7 bg-white rounded-sm flex items-center justify-center p-1 font-bold text-black text-[8px] italic">AMEX</div>
                  <div className="h-7 bg-white rounded-sm flex items-center justify-center p-1 font-bold text-black text-[8px]">Apple</div>
                  <div className="h-7 bg-white rounded-sm flex items-center justify-center p-1 font-bold text-black text-[8px]">Google</div>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 gap-6">
              <div className="flex space-x-8 italic">
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              </div>
              <p className="font-light italic tracking-widest">© Copyright 2022. All rights reserved.</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-5 lg:pl-16 border-l border-white/5 flex flex-col justify-between">
            <div className="space-y-12">
              <div className="space-y-10">
                <h2 className="text-6xl md:text-7xl font-semibold tracking-tight">
                  Follow Us <span className="text-[#C8A184]">On !</span>
                </h2>
                

              </div>

              <div className="space-y-3 pt-4">
                {['Instagram', 'Facebook', 'Twitter', 'Tiktok'].map(social => (
                  <button 
                    key={social} 
                    className="w-full flex items-center justify-between px-8 py-5 rounded-[40px] border border-white/5 bg-[#252525] hover:bg-white hover:text-black transition-all group"
                  >
                    <span className="text-[15px] font-bold tracking-wide text-white group-hover:text-black">{social}</span>
                    <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-black transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

