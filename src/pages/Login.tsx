import React from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';
import { LogIn, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  async function handleEmailLogin() {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleSignUp() {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      setError('Check your email for confirmation!');
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-[15px] md:px-8 max-w-lg mx-auto min-h-[70vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 uppercase">Join FHS</h1>
        <p className="text-sm text-black/50 tracking-widest uppercase mb-12">Experience premium fashion with personalized AI styling.</p>
        
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-black/20 p-4 text-xs uppercase"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-black/20 p-4 text-xs uppercase"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-4">
            <button 
              onClick={handleEmailLogin}
              className="flex-1 flex items-center justify-center space-x-3 border border-black py-4 hover:bg-black hover:text-white transition-all text-xs uppercase tracking-widest font-bold"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
            <button 
              onClick={handleSignUp}
              className="flex-1 flex items-center justify-center space-x-3 border border-black py-4 hover:bg-black hover:text-white transition-all text-xs uppercase tracking-widest font-bold"
            >
              <span>Sign Up</span>
            </button>
          </div>
          
          {error && <p className="text-red-500 text-xs">{error}</p>}
          
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
