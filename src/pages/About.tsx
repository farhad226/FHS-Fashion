import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Globe, Award, ShieldCheck, Heart } from 'lucide-react';

export function About() {
  return (
    <div className="bg-white pt-32 pb-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-6"
          >
            <span className="h-[1px] w-12 md:w-16 bg-black"></span>
            <span className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] font-bold text-black/40">Our Identity</span>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[10px] md:text-[12px] uppercase tracking-[0.2em] font-medium text-black/60 max-w-xs text-right"
          >
            Founded in 2024, MENNY is a testament to the modern man's pursuit of excellence and elegance.
          </motion.p>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 md:mb-10 uppercase leading-none"
        >
          Redefining <span className="text-[#BFA48F]">Masculine</span> Elegance
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-[4/5] overflow-hidden rounded-2xl grayscale hover:grayscale-0 transition-all duration-1000 cursor-crosshair group"
          >
            <img 
              src="https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" 
              alt="About Hero" 
            />
          </motion.div>
          <div className="space-y-12">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-xl md:text-3xl font-light italic leading-tight text-black/80"
            >
              "We believe that true style isn't about being noticed, it's about being remembered. Our collection is a curation of pieces that speak of quiet confidence."
            </motion.p>
            <div className="grid grid-cols-2 gap-8 border-t border-black/5 pt-12">
              <div>
                <p className="text-3xl font-black tracking-tighter uppercase">500+</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/30">Unique Designs</p>
              </div>
              <div>
                <p className="text-3xl font-black tracking-tighter uppercase">12</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/30">Global Boutiques</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-black text-white py-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <h2 className="text-[20rem] font-black tracking-tighter uppercase leading-none select-none">MENNY</h2>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-24">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/30 border-l border-white/20 pl-4">The Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-6">Built on Three <br /> Unwavering Pillars</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {[
              { icon: Award, title: 'Craftsmanship', desc: 'Every stitch follows a legacy of excellence. We source only the finest fabrics from historic mills in Italy and Japan.' },
              { icon: ShieldCheck, title: 'Timelessness', desc: 'We reject the fleeting nature of trends. Our silhouettes are designed to remain relevant for decades, not seasons.' },
              { icon: Globe, title: 'Responsibility', desc: 'Luxury shouldn\'t cost the earth. We are committed to ethical manufacturing and sustainable sourcing practices.' }
            ].map((pillar, i) => (
              <motion.div 
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="space-y-6 group"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#BFA48F] transition-colors duration-500">
                  <pillar.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">{pillar.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/70 transition-colors">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Designer Quote Section */}
      <section className="py-32 bg-[#FBFBFB]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-20">
             <div className="lg:w-1/2">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                    className="rounded-2xl shadow-2xl grayscale" 
                    alt="Founder" 
                  />
                  <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-2xl shadow-xl hidden md:block">
                    <p className="text-xl font-bold uppercase tracking-tighter">MENNY FASHION</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-black/30 mt-1">Est. 2024</p>
                  </div>
                </div>
             </div>
             <div className="lg:w-1/2 space-y-8">
               <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">"MENNY is not just a brand; it is a movement towards intentional living."</h2>
               <p className="text-black/60 leading-relaxed italic">
                 When I started this journey, my goal was simple: to create clothing that feels like armor—giving men the confidence to navigate the world with grace. We focus on the silhouette, the texture, and the emotion that a garment evokes.
               </p>
               <div className="pt-8">
                 <p className="text-lg font-black uppercase tracking-tighter">Alexander Menny</p>
                 <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#BFA48F]">Founder & Creative Director</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter">Join The <br /> Collective</h2>
            <p className="text-black/40 uppercase tracking-[0.3em] font-bold text-xs md:text-sm">Be the first to experience our new collection launches.</p>
            <div className="flex flex-col md:flex-row justify-center gap-6 pt-10">
              <button className="bg-black text-white px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black/90 transition-all flex items-center justify-center space-x-2 group">
                <span>View Collection</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <button className="bg-[#F5F5F5] text-black px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black/5 transition-all flex items-center justify-center space-x-2 group">
                <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Our Story</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
