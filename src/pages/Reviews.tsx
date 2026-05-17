import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ArrowUpRight, MessageSquare, Plus } from 'lucide-react';

const names = ["James Wilson", "Marcus Chen", "David Miller", "Robert Smith", "Kevin Adams", "Alex Reed", "Siddharth Malhotra", "Luca Bianchi", "Olaf Jensen", "Jean-Pierre", "Liam Thompson", "Noah Garcia", "Ethan Hunt", "Daniel Craig", "William Wang", "Henry Cavill", "Sebastian Stan", "Christian Bale", "Tom Hardy", "Ryan Gosling"];
const roles = ["Architect", "Creative Director", "Software Engineer", "Entrepreneur", "Photographer", "Physician", "Legal Consultant", "Financial Analyst", "UX Designer", "Museum Curator", "Product Manager", "Real Estate Agent", "Marketing Strategist", "Interior Designer"];
const reviewText = [
  "The attention to detail in the stitching is unparalleled. It truly feels like a piece designed to last.",
  "MENNY has captured the essence of minimalist luxury. Functional and incredibly stylish.",
  "Fantastic quality. The fit is perfect—not too tight, not too loose. A staple in my wardrobe.",
  "The shopping experience was seamless, and the packaging is exquisite. Every touchpoint matters.",
  "I've been looking for trousers that have this specific drape for years. Finally found them here.",
  "Exceptional fabric quality. You can feel the Italian craftsmanship in every fiber.",
  "The technical bomber is a masterpiece. It handles the elements while looking sharp.",
  "Perfect silhouette for the modern professional. Highly recommended.",
  "A testament to quiet confidence. This is what modern luxury should feel like.",
  "The customer service matches the quality of the product—impeccable.",
  "I appreciate the commitment to sustainable materials without compromising on elegance.",
  "Each piece tells a story of intentionality. Simply the best menswear available today."
];

const generateReviews = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    author: names[Math.floor(Math.random() * names.length)],
    role: roles[Math.floor(Math.random() * roles.length)],
    rating: Math.random() > 0.8 ? 4 : 5,
    date: `${['May', 'June', 'April', 'March'][Math.floor(Math.random() * 4)]} ${Math.floor(Math.random() * 28) + 1}, 2024`,
    content: reviewText[Math.floor(Math.random() * reviewText.length)],
    avatar: `https://i.pravatar.cc/150?u=${i}`
  }));
};

const allReviews = generateReviews(120);

export function Reviews() {
  const [visibleCount, setVisibleCount] = useState(9);
  
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 9, allReviews.length));
  };

  return (
    <div className="bg-white pt-32 pb-24">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-6"
          >
            <span className="h-[1px] w-12 md:w-16 bg-black"></span>
            <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-black/40">Customer Voices</span>
          </motion.div>
          <p className="text-[12px] uppercase tracking-[0.2em] font-medium text-black/60 max-w-xs text-right">
            Verified experiences from our global community of discerning men.
          </p>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 md:mb-10 uppercase leading-none"
        >
          Community <span className="text-[#BFA48F]">Perspectives</span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#FBFBFB] p-12 rounded-3xl flex flex-col justify-between space-y-8 border border-black/5">
            <div>
              <p className="text-6xl font-black tracking-tighter leading-none mb-2">4.9</p>
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-black text-black" />
                ))}
              </div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/30">Average Rating from 2,400+ Reviews</p>
            </div>
            <p className="text-sm text-black/60 leading-relaxed italic">
              "We take pride in every piece we create, and the feedback from our community drives our continuous pursuit of perfection."
            </p>
          </div>

          <div className="lg:col-span-2 bg-black text-white p-12 rounded-3xl relative overflow-hidden flex flex-col justify-center">
            <Quote className="absolute top-10 right-10 w-24 h-24 text-white/5" />
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight relative z-10">
              "MENNY IS NOT JUST CLOTHING; IT IS A RE-THINKING OF THE MODERN WARDROBE."
            </h2>
            <div className="mt-12 flex items-center space-x-4 relative z-10">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold">Featured Review</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-white/40 italic">New York Times Fashion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {allReviews.slice(0, visibleCount).map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 9) * 0.05 }}
                className="group p-8 border border-black/5 rounded-3xl hover:border-black/20 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 flex flex-col justify-between h-full bg-white"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star 
                          key={idx} 
                          className={cn(
                            "w-3 h-3",
                            idx < review.rating ? "fill-black text-black" : "text-black/10"
                          )} 
                        />
                      ))}
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-black/20">{review.date}</span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-black/80">"{review.content}"</p>
                </div>

                <div className="mt-10 pt-8 border-t border-black/5 flex items-center gap-4">
                  <img src={review.avatar} className="w-10 h-10 rounded-full grayscale group-hover:grayscale-0 transition-all border border-black/5" alt={review.author} />
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-tight">{review.author}</h4>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-black/30">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {visibleCount < allReviews.length && (
          <div className="mt-20 flex justify-center">
            <button 
              onClick={loadMore}
              className="group flex items-center space-x-6 hover:opacity-50 transition-opacity"
            >
              <span className="text-[11px] uppercase tracking-[0.4em] font-black italic">
                {visibleCount} of {allReviews.length} Reviews Loaded
              </span>
              <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              </div>
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
