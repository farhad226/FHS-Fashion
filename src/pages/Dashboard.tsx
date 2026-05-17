import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Package, User, Heart, Settings, LogOut, ChevronRight, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = React.useState('orders');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const sections = [
    { id: 'orders', name: 'Order History', icon: Package, count: '03' },
    { id: 'wishlist', name: 'Wishlist', icon: Heart, count: '12' },
    { id: 'profile', name: 'Personal Details', icon: User, count: null },
    { id: 'settings', name: 'Preferences', icon: Settings, count: null },
  ];

  const recentOrders = [
    { id: '#ORD-9281', date: 'Oct 12, 2024', status: 'Delivered', amount: '$245.00' },
    { id: '#ORD-8172', date: 'Sep 28, 2024', status: 'In Transit', amount: '$120.00' },
  ];

  return (
    <div className="pt-24 md:pt-48 pb-12 md:pb-20 px-[15px] md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <span className="w-12 h-[1px] bg-black/20" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/40">Member Portal</span>
          </div>
          <h1 className="text-3xl md:text-6xl font-bold tracking-tighter uppercase leading-tight md:leading-[0.8]">
            Welcome, <br /> <span className="italic font-light text-black/40">{user.user_metadata?.full_name?.split(' ')[0] || 'Member'}</span>
          </h1>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 text-[10px] uppercase tracking-[0.3em] font-bold border border-black/10 px-6 py-3 hover:bg-black hover:text-white transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 flex md:grid md:grid-cols-2 lg:flex lg:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 no-scrollbar">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "w-[240px] md:w-auto shrink-0 group flex items-center justify-between p-5 md:p-6 border border-black/5 hover:border-black transition-all text-left",
                activeSection === section.id ? "bg-black text-white" : "bg-white text-black"
              )}
            >
              <div className="flex items-center space-x-4">
                <section.icon className={cn("w-5 h-5", activeSection === section.id ? "text-white" : "text-black/40 group-hover:text-black")} />
                <span className="text-[11px] uppercase tracking-widest font-bold">{section.name}</span>
              </div>
              {section.count && <span className="text-[10px] font-mono opacity-50">{section.count}</span>}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8">
          {activeSection === 'orders' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="mb-12">
                <h2 className="text-sm uppercase tracking-[0.3em] font-bold mb-8 flex items-center">
                  <Clock className="w-4 h-4 mr-3" />
                  Recent Activity
                </h2>
                
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="group p-6 md:p-8 border border-black/5 hover:border-black transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <span className="text-[10px] font-mono text-black/30 block mb-1">{order.id}</span>
                        <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold">{order.date}</h3>
                      </div>
                      <div className="flex items-center space-x-6 md:space-x-12">
                        <div className="text-right">
                          <span className="text-[9px] uppercase tracking-widest text-black/40 block mb-1">Status</span>
                          <span className={cn(
                            "text-[10px] uppercase tracking-widest font-bold",
                            order.status === 'Delivered' ? "text-green-600" : "text-blue-600"
                          )}>{order.status}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] uppercase tracking-widest text-black/40 block mb-1">Amount</span>
                          <span className="text-[10px] uppercase tracking-widest font-bold">{order.amount}</span>
                        </div>
                        <button className="p-2 border border-black/5 group-hover:border-black transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#FBFBFB] p-10 border border-black/5">
                  <span className="text-[8px] uppercase tracking-[0.5em] text-black/30 font-bold mb-6 block">Account Type</span>
                  <h4 className="text-lg font-bold uppercase tracking-tight mb-2">Heritage VIP</h4>
                  <p className="text-[10px] text-black/50 leading-relaxed uppercase tracking-widest font-medium">Eligible for early access to "The Archive" drops.</p>
                </div>
                <div className="bg-[#FBFBFB] p-10 border border-black/5">
                  <span className="text-[8px] uppercase tracking-[0.5em] text-black/30 font-bold mb-6 block">Store Loyalty</span>
                  <h4 className="text-lg font-bold uppercase tracking-tight mb-2">2,450 Tokens</h4>
                  <p className="text-[10px] text-black/50 leading-relaxed uppercase tracking-widest font-medium">Redeemable for seasonal credits.</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'wishlist' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <h2 className="text-sm uppercase tracking-[0.3em] font-bold mb-8">Archived Favourites</h2>
              <div className="flex flex-col items-center justify-center py-24 border border-dashed border-black/10">
                <Heart className="w-12 h-12 text-black/10 mb-6" />
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40">You have 12 items in your wishlist</p>
                <Link to="/wishlist" className="mt-8 text-[11px] uppercase tracking-[0.4em] font-bold border-b border-black pb-1">View Full Wishlist</Link>
              </div>
            </motion.div>
          )}

          {activeSection === 'profile' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <h2 className="text-sm uppercase tracking-[0.3em] font-bold mb-8">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/30 block">Full Name</label>
                  <p className="border-b border-black/10 py-4 text-[12px] uppercase tracking-widest font-bold">{user.user_metadata?.full_name || 'Set Name'}</p>
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/30 block">Email Address</label>
                  <p className="border-b border-black/10 py-4 text-[12px] lowercase tracking-widest font-bold">{user.email}</p>
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/30 block">Member Since</label>
                  <p className="border-b border-black/10 py-4 text-[12px] uppercase tracking-widest font-bold">October 2024</p>
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/30 block">Tier Status</label>
                  <p className="border-b border-black/10 py-4 text-[12px] uppercase tracking-widest font-bold">Black Label Elite</p>
                </div>
              </div>
              <button className="bg-black text-white px-8 py-5 text-[10px] uppercase tracking-[0.3em] font-bold">Update Records</button>
            </motion.div>
          )}

          {activeSection === 'settings' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <h2 className="text-sm uppercase tracking-[0.3em] font-bold mb-8">System Preferences</h2>
              <div className="space-y-8">
                <div className="flex justify-between items-center py-6 border-b border-black/5">
                   <div>
                     <h4 className="text-[11px] uppercase tracking-widest font-bold mb-1">Marketing Digest</h4>
                     <p className="text-[10px] text-black/40 italic">Receive weekly reports on new archival drops.</p>
                   </div>
                   <div className="w-12 h-6 bg-black rounded-full relative">
                     <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                   </div>
                </div>
                <div className="flex justify-between items-center py-6 border-b border-black/5">
                   <div>
                     <h4 className="text-[11px] uppercase tracking-widest font-bold mb-1">Two-Factor Auth</h4>
                     <p className="text-[10px] text-black/40 italic">Secure your account with biometric validation.</p>
                   </div>
                   <div className="w-12 h-6 bg-black rounded-full relative">
                     <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
