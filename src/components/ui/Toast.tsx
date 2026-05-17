import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Toast({ message, isOpen, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, scale: 0.95, x: '-50%' }}
          className="fixed bottom-10 left-1/2 z-[200] w-[90%] max-w-sm"
        >
          <div className="bg-black text-white p-4 shadow-2xl flex items-center justify-between border border-white/10">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 p-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{message}</span>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Progress bar */}
          <motion.div 
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 4, ease: 'linear' }}
            className="h-1 bg-white/30 absolute bottom-0 left-0"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
