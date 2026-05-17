import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CMSData {
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
    return saved ? JSON.parse(saved) : defaultCMSData;
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
