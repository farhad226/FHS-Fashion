import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, ShoppingBag, Plus, ArrowUpRight, ChevronLeft, ChevronRight, Quote, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStorefront } from '../context/StorefrontContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../context/WishlistContext';
import { cn } from '../lib/utils';

export function Home() {
  const { cmsData } = useStorefront();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { scrollYProgress } = useScroll();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 1, hours: 12, minutes: 45, seconds: 10 });
  const [selectedCategory, setSelectedCategory] = useState('Shirt');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const testimonials = cmsData.testimonials;
    
   const heroY = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      size: 'M',
      quantity: 1
    });
    showToast(`${product.name} added to your bag`);
  };

  // Featured items logic from CMS
  const featured = cmsData.featuredProducts.products;

  const filteredFeatured = featured.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-white">
      {/* Cinematic Hero Section - Static Design based on Image */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={cmsData.hero.bgImage}
            alt="FHS Fashion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 w-full px-[15px] md:px-6 lg:px-[100px] h-full flex items-end pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-8 space-y-8"
            >
              <h1 className="text-3xl md:text-5xl lg:text-[64px] font-sans font-black uppercase tracking-tighter leading-[0.9] text-white whitespace-pre-line">
                {cmsData.hero.heading}
              </h1>
              <div className="max-w-xl">
                <p className="text-base md:text-lg text-white/90 mb-10 leading-relaxed font-light whitespace-pre-line">
                  {cmsData.hero.subheading}
                </p>
                <Link 
                  to={cmsData.hero.buttonUrl} 
                  className="inline-flex items-center space-x-4 bg-white text-black px-10 py-5 rounded-full text-[12px] uppercase tracking-[0.2em] font-bold hover:bg-black hover:text-white transition-all group"
                >
                  <span>{cmsData.hero.buttonText}</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simple Banner - Replaced Flash Sale */}
      <section className="bg-white py-10 border-t border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 md:px-12 text-center">
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-black">
              Discover Our Newest Minimalist Collection
            </h2>
        </div>
      </section>

      {/* Trending Now Slider Section */}
      <section className="py-12 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-[15px] md:px-12 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/30">{cmsData.trending.sectionName}</span>
              <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter">{cmsData.trending.heading}</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => {
                  const el = document.getElementById('trending-scroll');
                  if (el) el.scrollBy({ left: -400, behavior: 'smooth' });
                }}
                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('trending-scroll');
                  if (el) el.scrollBy({ left: 400, behavior: 'smooth' });
                }}
                className="w-12 h-12 rounded-full bg-[#BFA48F] flex items-center justify-center text-white hover:opacity-80 transition-all group"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="px-[15px] md:px-12">
          <div 
            id="trending-scroll"
            className="flex space-x-6 overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory"
          >
            {featured.map((p, idx) => (
              <div key={p.id} className="min-w-[300px] md:min-w-[350px] group cursor-pointer snap-start">
                <div className="relative aspect-[4/5] bg-[#F5F5F5] overflow-hidden mb-6 group">
                   <img src={p.image} alt={p.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-all duration-700" />
                   <button 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (isInWishlist(p.id.toString())) {
                        removeFromWishlist(p.id.toString());
                        showToast('Removed from wishlist');
                      } else {
                        addToWishlist({
                          id: p.id.toString(),
                          name: p.name,
                          price: p.price,
                          image: p.image
                        });
                        showToast('Added to wishlist');
                      }
                    }}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                   >
                     <Heart className={cn(
                       "w-4 h-4 transition-all",
                       isInWishlist(p.id.toString()) ? "fill-red-500 text-red-500" : "text-black"
                     )} />
                   </button>
                   {idx % 2 === 0 && (
                     <div className="absolute top-4 left-4 bg-green-500 text-white text-[7px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                       20% OFF
                     </div>
                   )}
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-widest font-bold text-black/40">{p.tag}</p>
                  <h3 className="text-sm font-bold uppercase tracking-tight">{p.name}</h3>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-bold">{p.price}</span>
                    {idx % 2 === 0 && <span className="text-[11px] text-black/20 line-through tracking-tighter">$120.00</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link to={cmsData.trending.buttonUrl} className="bg-[#1A1A1A] text-white px-10 py-3.5 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all">
              {cmsData.trending.buttonText}
            </Link>
          </div>
        </div>
      </section>
      <section className="py-10 md:py-20 bg-[#FBFBFB]">


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-black/5 border-y border-black/5">
           {cmsData.homeCategories.map((cat, i) => (
             <motion.div 
               key={cat.id}
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="relative group bg-white aspect-[3/4] overflow-hidden"
             >
               <img 
                 src={cat.image} 
                 alt={cat.title}
                 className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-all duration-[1.5s] ease-out"
               />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-mono text-white/50">0{i+1}</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/40 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">{cat.countText}</span>
                  </div>
                  <div className="text-white">
                    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter mb-4 md:mb-6 translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{cat.title}</h3>
                    <div className="h-[1px] w-full md:w-0 bg-white group-hover:w-full transition-all duration-700 mb-6 md:mb-8" />
                    <Link 
                      to={cat.url} 
                      className="inline-flex items-center space-x-3 text-[10px] uppercase tracking-[0.3em] font-bold opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-0 md:translate-y-4 group-hover:translate-y-0 hover:text-white/80"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
               </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Newsletter / News CTA */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <img src={cmsData.newsletter.bgImage} className="absolute inset-0 w-full h-full object-cover" alt="Newsletter background" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-[15px] md:px-12 w-full grid grid-cols-1 md:grid-cols-3 gap-12 text-white">
          <div className="space-y-4">
            <span className="text-[9px] uppercase tracking-widest font-bold text-white/60">{cmsData.newsletter.block1Title}</span>
            <h3 className="text-2xl font-black uppercase tracking-tight">{cmsData.newsletter.block1Heading}</h3>
            <p className="text-sm text-white/50">{cmsData.newsletter.block1Text}</p>
            <Link to="/shop" className="inline-block text-[10px] font-bold uppercase tracking-widest border-b border-white pb-1">Shop now</Link>
          </div>
          <div className="space-y-4">
            <span className="text-[9px] uppercase tracking-widest font-bold text-white/60">{cmsData.newsletter.block2Title}</span>
            <h3 className="text-2xl font-black uppercase tracking-tight">{cmsData.newsletter.block2Heading}</h3>
            <p className="text-sm text-white/50">{cmsData.newsletter.block2Text}</p>
            <Link to="/shop" className="inline-block text-[10px] font-bold uppercase tracking-widest border-b border-white pb-1">Shop all trending</Link>
          </div>
          <div className="space-y-4">
            <span className="text-[9px] uppercase tracking-widest font-bold text-white/60">{cmsData.newsletter.block3Title}</span>
            <h3 className="text-2xl font-black uppercase tracking-tight">{cmsData.newsletter.block3Heading}</h3>
            <p className="text-sm text-white/50">{cmsData.newsletter.block3Text}</p>
            <Link to="/blog" className="inline-block text-[10px] font-bold uppercase tracking-widest border-b border-white pb-1">Read news</Link>
          </div>
        </div>
        
        {/* Newsletter Inline Bar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-5xl bg-white/95 backdrop-blur-md p-6 flex flex-col md:flex-row items-center justify-between gap-6 rounded-sm">
          <div className="flex items-center space-x-6">
            <div className="p-3 bg-black/5 rounded-sm">
              <Quote className="w-5 h-5 text-black" />
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-widest">Subscribe now for exclusive offers and the latest men's fashion updates!</h4>
              <p className="text-[9px] text-black/40 font-bold uppercase tracking-widest">Be the first to know!</p>
            </div>
          </div>
          <div className="flex w-full md:w-auto">
             <input type="email" placeholder="Enter your email" className="bg-transparent border-b border-black/10 py-2 px-4 text-[11px] outline-none w-full md:w-64" />
             <button className="bg-black text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest rounded-sm ml-4">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Featured Pieces Part 2 (Grid with filter feel) */}
      <section className="py-12 md:py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-[15px] md:px-12 text-center mb-10 md:mb-16">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-black/30 mb-4 block">{cmsData.featuredProducts.sectionName}</span>
          <h2 className="text-2xl md:text-6xl font-black uppercase tracking-tighter">{cmsData.featuredProducts.heading}</h2>
          
          <div className="flex justify-center flex-wrap gap-8 mt-12 mb-20 text-[10px] font-bold uppercase tracking-widest">
            {['Jacket', 'Shirt', 'Suit', 'Pants', 'Shoes', 'Wallet', 'Bag', 'Belt', 'Hat', 'Glasses', 'Tie'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "hover:border-b border-black pb-1 transition-all",
                  selectedCategory === cat ? "border-b border-black" : "text-black/40"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-24 max-w-7xl mx-auto px-[15px] md:px-12">
          <AnimatePresence mode="popLayout">
            {filteredFeatured.length > 0 ? filteredFeatured.map((p, idx) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden bg-white border border-black/5 relative group mb-4">
                   <img src={p.image} alt={p.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-1000" />
                   <button 
                     onClick={(e) => {
                       e.preventDefault();
                       if (isInWishlist(p.id.toString())) {
                         removeFromWishlist(p.id.toString());
                         showToast('Removed from wishlist');
                       } else {
                         addToWishlist({
                           id: p.id.toString(),
                           name: p.name,
                           price: p.price,
                           image: p.image
                         });
                         showToast('Added to wishlist');
                       }
                     }}
                     className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                   >
                     <Heart className={cn(
                       "w-4 h-4 transition-all",
                       isInWishlist(p.id.toString()) ? "fill-black text-black" : "text-black/30 hover:text-black"
                     )} />
                   </button>
                </div>
                <p className="text-[9px] uppercase tracking-widest font-bold text-black/40 mb-1">{p.tag}</p>
                <h3 className="text-sm font-bold uppercase tracking-tight mb-1">{p.name}</h3>
                <div className="flex items-center space-x-3 text-sm">
                  <span className="font-bold">{p.price}</span>
                  {idx % 3 === 0 && (
                    <>
                      <span className="text-black/20 line-through tracking-tighter">$110.00</span>
                      <span className="text-green-600 text-[10px] font-bold">20%</span>
                    </>
                  )}
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-sm text-black/40 uppercase tracking-[0.3em] font-bold">No products found in this category.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center mt-20">
          <Link to={cmsData.featuredProducts.buttonUrl} className="bg-[#1A1A1A] text-white px-12 py-4 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
            {cmsData.featuredProducts.buttonText}
          </Link>
        </div>
      </section>

      {/* Testimonials - Large side portrait style */}
      <section className="bg-[#1A1A1A] py-12 md:py-32 overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-[15px] md:px-12 flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="md:w-1/2 relative space-y-10">
             <div className="space-y-4">
               <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/30">{cmsData.testimonialsSection.sectionName}</span>
               <h2 className="text-3xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] whitespace-pre-line">{cmsData.testimonialsSection.heading}</h2>
               <div className="flex space-x-4 pt-4">
                  <button 
                    onClick={() => setCurrentSlide(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setCurrentSlide(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                    className="w-12 h-12 rounded-full bg-[#BFA48F] flex items-center justify-center text-white hover:opacity-80 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
               </div>
             </div>
             
             <div className="relative group rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl bg-black/10">
               <AnimatePresence mode="wait">
                 <motion.img 
                   key={currentSlide}
                   initial={{ opacity: 0, scale: 1.1 }}
                   animate={{ opacity: 0.7, scale: 1 }}
                   exit={{ opacity: 0, scale: 1.1 }}
                   transition={{ duration: 0.8 }}
                   src={testimonials[currentSlide].avatar} 
                   className="w-full h-full object-cover grayscale" 
                   alt="Story" 
                 />
               </AnimatePresence>
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
               <div className="absolute bottom-8 left-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-2">Selected Story</p>
                  <p className="text-xl font-black text-white uppercase tracking-tighter italic">0{currentSlide + 1}</p>
               </div>
             </div>

          </div>

          <div className="md:w-1/2 space-y-16">
            <div className="flex flex-col space-y-6">
              <p className="text-white/50 text-sm leading-relaxed max-w-md italic whitespace-pre-line">{cmsData.testimonialsSection.subheading}</p>
              <button className="self-start text-[10px] font-bold uppercase tracking-widest text-white border border-white/10 px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all">More stories</button>
            </div>

            <div className="space-y-16">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-16"
                >
                  {[
                    testimonials[currentSlide],
                    testimonials[(currentSlide + 1) % testimonials.length],
                    testimonials[(currentSlide + 2) % testimonials.length]
                  ].map((t, i) => (
                    <div key={i} className="flex gap-8 group">
                      <img src={t.avatar} className="w-16 h-16 rounded-full object-cover shrink-0 grayscale hover:grayscale-0 transition-all duration-500" alt={t.author} />
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-white font-bold tracking-tight uppercase">{t.author}</h4>
                          <p className="text-[9px] uppercase tracking-widest font-bold text-white/30">{t.role}</p>
                        </div>
                        <p className="text-white/60 text-sm italic leading-relaxed">"{t.quote}"</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Blog & Insights Section */}
      <section className="bg-white py-12 md:py-32">
        <div className="max-w-7xl mx-auto px-[15px] md:px-12 flex flex-col md:flex-row gap-12 md:gap-20">
          <div className="md:w-1/2 space-y-10">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] whitespace-pre-line">{cmsData.blogSection.heading} <Plus className="inline-block w-10 h-10 text-white fill-black" rotate={45} /></h2>
              <p className="text-black/40 text-sm max-w-sm italic whitespace-pre-line">{cmsData.blogSection.subheading}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
               {cmsData.blogPosts.slice(0, 2).map((post, index) => (
               <div key={post.id} className="space-y-4 group">
                 <div className="aspect-[4/3] overflow-hidden rounded-lg">
                   <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt={post.title} />
                 </div>
                 <div className="space-y-2">
                   <p className="text-[9px] uppercase tracking-widest font-bold text-black/30">{post.date} • By {post.author}</p>
                   <h3 className="text-lg font-black uppercase tracking-tight group-hover:underline">{post.title}</h3>
                   <p className="text-[11px] text-black/50 leading-relaxed">{post.description}</p>
                 </div>
               </div>
               ))}
            </div>
            <button className="text-[10px] font-bold uppercase tracking-widest border border-black/10 px-10 py-3.5 rounded-full hover:bg-black hover:text-white transition-all">More articles</button>
          </div>

          <div className="md:w-1/2">
             <div className="relative h-full min-h-[600px] overflow-hidden rounded-2xl group">
               <img src={cmsData.blogSection.featuredImage} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-[2s]" alt="Featured blog" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
               <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-[9px] uppercase tracking-widest font-bold text-white">Hot news</div>
               <div className="absolute bottom-12 left-12 right-12 text-white space-y-6">
                 <div>
                   <p className="text-[10px] uppercase tracking-widest font-bold text-white/60 mb-2">{cmsData.blogPosts[2]?.date || cmsData.blogPosts[0].date} • By {cmsData.blogPosts[2]?.author || cmsData.blogPosts[0].author}</p>
                   <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-[0.9]">{cmsData.blogPosts[2]?.title || cmsData.blogPosts[0].title}</h3>
                 </div>
                 <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">
                    <ArrowUpRight className="w-8 h-8" />
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
