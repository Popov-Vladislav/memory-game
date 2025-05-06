import { createContext, useContext, useState, ReactNode, FC, useCallback } from 'react';
import { Product, CartItem, DeliveryOption } from '@/types/store';

interface StoreContextType {
  cart: CartItem[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (product: Product) => void;
  isInFavorites: (productId: number) => boolean;
  isInCart: (productId: number) => boolean;
  getCartItemQuantity: (productId: number) => number;
  cartTotal: number;
  cartItemsCount: number;
  deliveryOptions: DeliveryOption[];
  selectedDeliveryOption: DeliveryOption | null;
  setSelectedDeliveryOption: (option: DeliveryOption | null) => void;
}

const defaultDeliveryOptions: DeliveryOption[] = [
  { id: 1, name: 'Стандартная доставка', price: 300, estimatedDays: '3-5 дней' },
  { id: 2, name: 'Экспресс доставка', price: 600, estimatedDays: '1-2 дня' },
  { id: 3, name: 'Самовывоз', price: 0, estimatedDays: 'Сегодня или завтра' }
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [deliveryOptions] = useState<DeliveryOption[]>(defaultDeliveryOptions);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<DeliveryOption | null>(null);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFavorite = (product: Product) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(item => item.id === product.id);
      
      if (isAlreadyFavorite) {
        return prevFavorites.filter(item => item.id !== product.id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  const isInFavorites = (productId: number) => {
    return favorites.some(item => item.id === productId);
  };

  const isInCart = useCallback((productId: number) => {
    return cart.some(item => item.product.id === productId);
  }, [cart]);

  const getCartItemQuantity = useCallback((productId: number) => {
    const item = cart.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }, [cart]);

  // Calculate cart total (including delivery if selected)
  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  ) + (selectedDeliveryOption?.price || 0);

  const cartItemsCount = cart.reduce(
    (total, item) => total + item.quantity, 
    0
  );

  const value = {
    cart,
    favorites,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    toggleFavorite,
    isInFavorites,
    isInCart,
    getCartItemQuantity,
    cartTotal,
    cartItemsCount,
    deliveryOptions,
    selectedDeliveryOption,
    setSelectedDeliveryOption
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStoreContext must be used within a StoreProvider');
  }
  return context;
};