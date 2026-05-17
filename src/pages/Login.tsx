import React from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';
import { LogIn, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();

  async function handleGoogleLogin() {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      // The user will be redirected to Google for authentication and then back to your app
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-lg mx-auto min-h-[70vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold tracking-tighter mb-4 uppercase">Join FHS</h1>
        <p className="text-sm text-black/50 tracking-widest uppercase mb-12">Experience premium fashion with personalized AI styling.</p>
        
        <div className="space-y-4">
          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center space-x-3 border border-black py-4 hover:bg-black hover:text-white transition-all text-xs uppercase tracking-widest font-bold"
          >
            <Globe className="w-4 h-4" />
            <span>Continue with Google</span>
          </button>
          
          <button 
            onClick={() => navigate('/shop')}
            className="w-full text-[10px] uppercase tracking-widest font-bold text-black/40 hover:text-black transition-colors pt-4"
          >
            Go to Shop
          </button>
        </div>

        <div className="mt-20 pt-10 border-t border-black/5">
          <p className="text-[10px] text-black/30 uppercase tracking-[0.2em] leading-relaxed">
            By continuing, you agree to our <br />
            <span className="text-black/60 cursor-pointer hover:text-black">Terms of Service</span> and <span className="text-black/60 cursor-pointer hover:text-black">Privacy Policy</span>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
