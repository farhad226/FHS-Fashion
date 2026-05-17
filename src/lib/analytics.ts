export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Mock implementation of Google Analytics 4 tracking
type EventParams = Record<string, any>;

export const trackEvent = (eventName: string, params?: EventParams) => {
  if (typeof window === 'undefined') return;
  
  // In a real app we'd call window.gtag('event', eventName, params);
  console.log(`[GA4 Event Tracker] ${eventName}`, params || {});
};

export const trackEcommerceEvent = {
  viewItem: (product: any) => {
    trackEvent('view_item', {
      currency: 'USD',
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: 1
        }
      ]
    });
  },
  
  addToCart: (product: any, quantity: number = 1) => {
    trackEvent('add_to_cart', {
      currency: 'USD',
      value: product.price * quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: quantity
        }
      ]
    });
  },

  beginCheckout: (cartItems: any[], totalValue: number) => {
    trackEvent('begin_checkout', {
      currency: 'USD',
      value: totalValue,
      items: cartItems.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: parseFloat(item.price.replace('$', '')),
        quantity: item.quantity
      }))
    });
  },

  purchase: (transactionId: string, cartItems: any[], totalValue: number) => {
    trackEvent('purchase', {
      transaction_id: transactionId,
      currency: 'USD',
      value: totalValue,
      items: cartItems.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: parseFloat(item.price.replace('$', '')),
        quantity: item.quantity
      }))
    });
  }
};
