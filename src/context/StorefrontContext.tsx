import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CMSData {
  global: {
    logoText: string;
    logoImage: string;
  };
  hero: {
    heading: string;
    subheading: string;
    buttonText: string;
    buttonUrl: string;
    bgImage: string;
  };
  flashSale: {
    heading: string;
    subheading: string;
    discountText: string;
  };
  trending: {
    sectionName: string;
    heading: string;
    buttonText: string;
    buttonUrl: string;
  };
  featuredProducts: {
    sectionName: string;
    heading: string;
    buttonText: string;
    buttonUrl: string;
    availableCategories: string[];
    products: Array<{
      id: string;
      name: string;
      price: string;
      image: string;
      tag: string;
      category: string;
    }>;
  };
  paymentIntegrations: {
    paypalEmail: string;
    stripeApiKey: string;
    creditCardInfo: string;
    bkashNumber: string;
    nagadNumber: string;
  };
  telegramBotToken: string;
  newsletter: {
    bgImage: string;
    block1Title: string;
    block1Heading: string;
    block1Text: string;
    block2Title: string;
    block2Heading: string;
    block2Text: string;
    block3Title: string;
    block3Heading: string;
    block3Text: string;
  };
  homeCategories: Array<{
    id: string;
    title: string;
    image: string;
    url: string;
    countText: string;
  }>;
  testimonialsSection: {
    sectionName: string;
    heading: string;
    subheading: string;
  };
  testimonials: Array<{
    id: string;
    quote: string;
    author: string;
    role: string;
    avatar: string;
    rating: number;
  }>;
  blogSection: {
    heading: string;
    subheading: string;
    featuredImage: string;
  };
  blogPosts: Array<{
    id: string;
    date: string;
    author: string;
    title: string;
    description: string;
    image: string;
  }>;
  featuredCategories: Array<{ id: string; title: string; url: string; }>;
  about: {
    heading: string;
    description: string;
  };
  footer: {
    description: string;
  };
}

const defaultCMSData: CMSData = {
  global: {
    logoText: "FHS FASHION",
    logoImage: "",
  },
  hero: {
    heading: "Unveiling apparel that\ndances to your beat",
    subheading: "Discover the new standard in premium menswear. Tailored for the modern gentleman who embraces bold minimalism. Where architectured shapes meet fluid movement.",
    buttonText: "Shop Collection",
    buttonUrl: "/shop",
    bgImage: "https://images.unsplash.com/photo-1617137968427-85920b726485?auto=format&fit=crop&q=80&w=2000"
  },
  flashSale: {
    heading: "Shop now, save more, enjoy life",
    subheading: "Act now! Shop and save big during our electrifying Flash Sale as time runs out.",
    discountText: "UP TO 50% OFF"
  },
  trending: {
    sectionName: "Trending Now",
    heading: "Trendy styles, incredible savings",
    buttonText: "View more",
    buttonUrl: "/shop"
  },
  featuredProducts: {
    sectionName: "PRODUCT",
    heading: "Your fashion, our product",
    buttonText: "More collection",
    buttonUrl: "/shop",
    availableCategories: ['Jacket', 'Shirt', 'Suit', 'Pants', 'Shoes', 'Wallet', 'Bag', 'Belt', 'Hat', 'Glasses', 'Tie'],
    products: [
      { id: 'f1', name: 'Premium Oxford Shirt', price: '$89.00', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c717658?auto=format&fit=crop&q=80&w=800', tag: 'New Season', category: 'Shirt' },
      { id: 'f2', name: 'Heavyweight Cotton Tee', price: '$45.00', image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800', tag: 'Essentials', category: 'Shirt' },
      { id: 'f3', name: 'Tapered Wool Trousers', price: '$129.00', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800', tag: 'Limited', category: 'Pants' },
      { id: 'f4', name: 'Sculptural Eyewear', price: '$189.00', image: 'https://images.unsplash.com/photo-1511499767390-a73a25830ce4?auto=format&fit=crop&q=80&w=800', tag: 'Accessories', category: 'Glasses' },
      { id: 'f5', name: 'Technical Bomber Jacket', price: '$245.00', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800', tag: 'Archive', category: 'Jacket' },
      { id: 'f6', name: 'Minimalist Leather Tote', price: '$320.00', image: 'https://images.unsplash.com/photo-1584917666455-5201625902b6?auto=format&fit=crop&q=80&w=800', tag: 'Handcrafted', category: 'Bag' },
      { id: 'f7', name: 'Structural Overshirt', price: '$110.00', image: 'https://images.unsplash.com/photo-1617137968427-859247f04322?auto=format&fit=crop&q=80&w=800', tag: 'New Season', category: 'Shirt' },
      { id: 'f8', name: 'Linen Utility Shorts', price: '$75.00', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800', tag: 'Summer 24', category: 'Pants' },
    ]
  },
  paymentIntegrations: {
    paypalEmail: "",
    stripeApiKey: "",
    creditCardInfo: "",
    bkashNumber: "",
    nagadNumber: "",
  },
  telegramBotToken: "",
  newsletter: {
    bgImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=2000",
    block1Title: "NEW ARRIVAL",
    block1Heading: "Fresh finds",
    block1Text: "Explore new trends, elevate your wardrobe with our exceptional arrivals.",
    block2Title: "LATEST TRENDING",
    block2Heading: "Hot fashion picks",
    block2Text: "Explore the latest trends with our captivating trending fashion collection.",
    block3Title: "FASHION NEWS",
    block3Heading: "Worker trends",
    block3Text: "Discover sophisticated trends defining modern corporate attire for the contemporary gentleman.",
  },
  homeCategories: [
    { id: '1', title: 'Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800', url: '/category/shirts', countText: '12 Pieces' },
    { id: '2', title: 'Outerwear', image: 'https://images.unsplash.com/photo-1544022613-e87f17a7845f?auto=format&fit=crop&q=80&w=800', url: '/category/outerwear', countText: '08 Pieces' },
    { id: '3', title: 'Trousers', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800', url: '/category/pants', countText: '15 Pieces' },
    { id: '4', title: 'Footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800', url: '/category/shoes', countText: '06 Pieces' },
  ],
  testimonialsSection: {
    sectionName: "TESTIMONIAL",
    heading: "Real fashion\nexperiences,\nReal men",
    subheading: "Read authentic stories from men who have experienced our fashion, embodying style, quality, and confidence."
  },
  testimonials: [
    { id: "01", quote: "The attention to material detail is unparalleled. Every piece feels like a lifelong investment rather than a seasonal trend.", author: "Frank Klin", role: "Architect", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200", rating: 5 },
    { id: "02", quote: "Minimalism redefined. The structural integrity of the Japanese heavy cotton is exactly what I've been searching for years.", author: "Linda Anand", role: "Designer", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200", rating: 5 },
    { id: "03", quote: "Luxury is often loud, but FHS Fashion understands the power of silence. The silhouettes speak for themselves.", author: "David Gueta", role: "Artist", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200", rating: 4 },
  ],
  blogSection: {
    heading: "Writing source for\nmen's fashion\ninsights",
    subheading: "Explore trends, tips, and more. Elevate your style journey with our insightful men's fashion blog.",
    featuredImage: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&q=80&w=1000"
  },
  blogPosts: [
    { id: '1', date: 'Sep 28, 2023', author: 'Robert Fox', title: 'Stay updated on latest styles', description: 'Be part of the style conversation our fashion news that brings flair to your fingertips.', image: 'https://images.unsplash.com/photo-1479064566235-aa6a42b5a30e?auto=format&fit=crop&q=80&w=600' },
    { id: '2', date: 'August 20, 2023', author: 'Jacob Jonas', title: '2023 Men\'s Fashion Trends', description: 'Step into the world of men\'s beauty with our news, revealing the latest trends and stories.', image: 'https://images.unsplash.com/photo-1543132220-4bf3de6e10ae?auto=format&fit=crop&q=80&w=600' },
  ],
  featuredCategories: [
    { id: '1', title: 'Outerwear', url: '/category/outerwear' },
    { id: '2', title: 'Knitwear', url: '/category/knitwear' },
    { id: '3', title: 'Accessories', url: '/category/accessories' },
  ],
  about: {
    heading: "Redefining Masculine Elegance",
    description: "At MENNY, we believe that clothing is more than just fabric—it's an expression of identity, confidence, and purpose. We started with a simple idea: to create menswear that bridges the gap between classic tailoring and modern minimalism."
  },
  footer: {
    description: "Curating premium menswear for the modern gentleman. Elevate your everyday style with our timeless pieces designed for purpose."
  }
};

interface StorefrontContextType {
  cmsData: CMSData;
  updateCMSData: (newData: CMSData) => void;
}

const StorefrontContext = createContext<StorefrontContextType | undefined>(undefined);

export function StorefrontProvider({ children }: { children: ReactNode }) {
  const [cmsData, setCmsData] = useState<CMSData>(() => {
    const saved = localStorage.getItem('storefront_cms');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...defaultCMSData,
          ...parsed,
          global: { ...defaultCMSData.global, ...parsed.global },
          hero: { ...defaultCMSData.hero, ...parsed.hero },
          flashSale: { ...defaultCMSData.flashSale, ...parsed.flashSale },
          trending: { ...defaultCMSData.trending, ...parsed.trending },
          featuredProducts: { 
            ...defaultCMSData.featuredProducts, 
            ...parsed.featuredProducts,
            products: parsed.featuredProducts?.products || defaultCMSData.featuredProducts.products
          },
          paymentIntegrations: { ...defaultCMSData.paymentIntegrations, ...parsed.paymentIntegrations },
          telegramBotToken: parsed.telegramBotToken || defaultCMSData.telegramBotToken,
          newsletter: { ...defaultCMSData.newsletter, ...parsed.newsletter },
          homeCategories: parsed.homeCategories || defaultCMSData.homeCategories,
          testimonialsSection: { ...defaultCMSData.testimonialsSection, ...parsed.testimonialsSection },
          testimonials: parsed.testimonials || defaultCMSData.testimonials,
          blogSection: { ...defaultCMSData.blogSection, ...parsed.blogSection },
          blogPosts: parsed.blogPosts || defaultCMSData.blogPosts,
          about: { ...defaultCMSData.about, ...parsed.about },
          footer: { ...defaultCMSData.footer, ...parsed.footer },
        };
      } catch (e) {
        return defaultCMSData;
      }
    }
    return defaultCMSData;
  });

  useEffect(() => {
    localStorage.setItem('storefront_cms', JSON.stringify(cmsData));
  }, [cmsData]);

  return (
    <StorefrontContext.Provider value={{ cmsData, updateCMSData: setCmsData }}>
      {children}
    </StorefrontContext.Provider>
  );
}

export function useStorefront() {
  const context = useContext(StorefrontContext);
  if (!context) throw new Error('useStorefront must be used within StorefrontProvider');
  return context;
}
