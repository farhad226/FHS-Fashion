import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, Heart, Share2, Ruler, Sparkles, ChevronRight, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { cn } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../context/WishlistContext';

export function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const [showError, setShowError] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviews, setReviews] = useState([
    { id: 1, author: "Liam T.", rating: 5, date: "2 days ago", comment: "The quality of the cotton is substantial. Definitely feels like a premium piece." },
    { id: 2, author: "Sarah K.", rating: 4, date: "1 week ago", comment: "Perfect oversized fit. Might want to size down if you want something more tailored." }
  ]);

  const product = {
    id: id || '1',
    name: 'Heavyweight Cotton Luxe Tee',
    price: '$45.00',
    description: 'A structural masterpiece made from 300gsm Japanese cotton. Designed with a dropped shoulder and a wide silhouette for a modern, architectural drape.',
    materials: '100% Organic Cotton',
    care: 'Machine wash cold, lay flat to dry.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=1000'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: 1
    });

    setIsAdded(true);
    showToast(`${product.name} added to your bag`);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const toggleWishlist = () => {
    if (isInWishlist(product.id.toString())) {
      removeFromWishlist(product.id.toString());
      showToast('Removed from wishlist');
    } else {
      addToWishlist({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
      showToast('Added to wishlist');
    }
  };

  useEffect(() => {
    async function fetchAiRecs() {
      setIsAiLoading(true);
      try {
        const res = await fetch('/api/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ preferences: `Modern, minimalist, premium streetwear, category: ${product.name}` })
        });
        const data = await res.json();
        setRecommendations(data.suggestions || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsAiLoading(false);
      }
    }
    fetchAiRecs();
  }, [id]);

  return (
    <div className="pt-24 md:pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-black/40 mb-12">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-black font-semibold">T-Shirts</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Image Gallery - Left Side */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="aspect-square overflow-hidden bg-[#F5F5F5] group">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover mix-blend-multiply" 
              />
            </div>
          </motion.div>
        </div>

        {/* Content Section - Right Side */}
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/30 mb-4">T-Shirts</p>
            <h1 className="text-3xl md:text-3xl font-serif text-black mb-6 leading-tight">Core Black Tee</h1>
            <p className="text-2xl font-medium text-black mb-8">{product.price}</p>
            
            <p className="text-[13px] md:text-sm text-black/60 leading-relaxed font-light max-w-lg mb-10">
              Heavyweight 220gsm cotton with a tailored shoulder. The black tee, perfected.
            </p>

            {/* Size Selection */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className={cn(
                  "text-[10px] uppercase tracking-widest font-bold",
                  showError ? "text-red-500 animate-pulse" : "text-black"
                )}>
                  Size
                </span>
                <button className="text-[10px] uppercase tracking-widest font-bold text-black/40 hover:text-black transition-colors">
                  Size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {['S', 'M', 'L', 'XL'].map(size => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setShowError(false);
                    }}
                    className={cn(
                      "w-16 h-10 flex items-center justify-center border text-[10px] font-bold transition-all",
                      selectedSize === size 
                        ? "bg-black text-white border-black" 
                        : "border-black/10 hover:border-black text-black/60 hover:text-black"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag and Wishlist Buttons */}
            <div className="flex gap-4 mt-10">
              <button 
                onClick={handleAddToBag}
                disabled={isAdded}
                className="flex-grow bg-black text-white py-5 text-[10px] uppercase tracking-[0.4em] font-black hover:bg-black/80 transition-all disabled:opacity-50"
              >
                {isAdded ? "Added to Bag" : "Add to Bag"}
              </button>
              <button 
                onClick={toggleWishlist}
                className={cn(
                  "w-16 flex items-center justify-center border transition-all",
                  isInWishlist(product.id.toString()) 
                    ? "bg-black border-black text-white" 
                    : "border-black/10 hover:border-black text-black/60 hover:text-black"
                )}
              >
                <Heart className={cn("w-5 h-5", isInWishlist(product.id.toString()) && "fill-current")} />
              </button>
            </div>

            {/* Service Icons */}
            <div className="grid grid-cols-3 gap-2 mt-12">
              <div className="border border-black/10 p-6 flex flex-col items-center justify-center text-center space-y-3 bg-[#FBFBFB]">
                <ShoppingBag className="w-4 h-4 text-black" />
                <p className="text-[8px] uppercase tracking-widest leading-tight font-bold text-black/40">Free shipping over $200</p>
              </div>
              <div className="border border-black/10 p-6 flex flex-col items-center justify-center text-center space-y-3 bg-[#FBFBFB]">
                <Share2 className="w-4 h-4 text-black" />
                <p className="text-[8px] uppercase tracking-widest leading-tight font-bold text-black/40">30-day returns</p>
              </div>
              <div className="border border-black/10 p-6 flex flex-col items-center justify-center text-center space-y-3 bg-[#FBFBFB]">
                <ShieldCheck className="w-4 h-4 text-black" />
                <p className="text-[8px] uppercase tracking-widest leading-tight font-bold text-black/40">Authenticity guaranteed</p>
              </div>
            </div>

            {/* Product Meta Info */}
            <div className="pt-12 space-y-4">
              <div className="flex justify-between py-4 border-t border-black/5 items-center">
                <span className="text-[10px] uppercase tracking-widest font-bold text-black/40">Rating</span>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3 h-3 fill-black text-black" />
                  ))}
                  <span className="text-[10px] font-bold ml-2">(4.8)</span>
                </div>
              </div>
              <div className="flex justify-between py-4 border-t border-black/5">
                <span className="text-[10px] uppercase tracking-widest font-bold text-black/40">SKU</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-black/80">FHS-002</span>
              </div>
              <div className="flex justify-between py-4 border-t border-black/5">
                <span className="text-[10px] uppercase tracking-widest font-bold text-black/40">Category</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-black/80">T-Shirts</span>
              </div>
            </div>

            {/* Leave a Rating Section */}
            <div className="pt-12 border-t border-black/5">
              <p className="text-[10px] uppercase tracking-widest font-black text-black/30 mb-6 text-center">Share your experience</p>
              <div className="flex flex-col items-center space-y-4 bg-[#FBFBFB] p-8 border border-black/5">
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => {
                        setUserRating(star);
                        showToast(`You rated this product ${star} stars!`);
                        // Simulate adding to local reviews list
                        const newReview = {
                          id: Date.now(),
                          author: "You",
                          rating: star,
                          date: "Just now",
                          comment: "Thank you for your rating!"
                        };
                        setReviews([newReview, ...reviews]);
                      }}
                      className="transition-transform active:scale-95"
                    >
                      <Star 
                        className={cn(
                          "w-8 h-8 transition-colors",
                          (hoverRating || userRating) >= star ? "fill-black text-black" : "text-black/10"
                        )} 
                      />
                    </button>
                  ))}
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40">
                  {userRating > 0 ? `Your Rating: ${userRating}/5` : "Tap to rate"}
                </p>
              </div>
            </div>

            {/* Local Reviews List */}
            <div className="pt-12 space-y-8">
              {reviews.map(review => (
                <div key={review.id} className="pb-8 border-b border-black/5 last:border-none">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={cn("w-2.5 h-2.5", s <= review.rating ? "fill-black text-black" : "text-black/10")} />
                      ))}
                    </div>
                    <span className="text-[8px] uppercase tracking-widest font-bold text-black/20">{review.date}</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest font-black text-black/80 mb-2">{review.author}</p>
                  <p className="text-xs text-black/50 leading-relaxed italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Complete the Look Section */}
      <section className="mt-20 py-20 border-t border-black/5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-6 md:space-y-0 text-center md:text-left">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 mb-3">Curated Essentials</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">Complete the Look</h2>
          </div>
          <Link to="/shop" className="text-[10px] uppercase tracking-widest font-bold border-b border-black pb-1 hover:opacity-50 transition-opacity">
            Shop the full set
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { name: 'Architecture Chinos', price: '$120.00', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600' },
            { name: 'Canvas Tote Large', price: '$65.00', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600' },
            { name: 'Merino Wool Beanie', price: '$45.00', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=600' },
            { name: 'Sculptural Eyewear', price: '$180.00', image: 'https://images.unsplash.com/photo-1511499767390-a73a25830ce4?auto=format&fit=crop&q=80&w=600' },
          ].map((item, idx) => (
            <motion.div 
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden bg-gray-50 mb-6 relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1s]" 
                />
                <button 
                  onClick={() => {
                    addToCart({
                      id: `related-${idx}`,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      size: 'M',
                      quantity: 1
                    });
                    showToast(`${item.name} added to your bag`);
                  }}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pt-8"
                >
                   <div className="bg-white text-black px-6 py-3 text-[9px] uppercase tracking-widest font-bold">Quick add</div>
                </button>
              </div>
              <p className="text-[10px] uppercase tracking-widest font-bold mb-1">{item.name}</p>
              <p className="text-xs text-black/40">{item.price}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
