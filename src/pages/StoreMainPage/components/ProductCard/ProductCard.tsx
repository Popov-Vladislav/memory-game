import { FC, useState, useEffect } from 'react';
import { Button } from '@telegram-apps/telegram-ui';
import styles from './index.module.css';
import { Product } from '@/types/store';
import { useStoreContext } from '@/context/StoreContext';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard: FC<ProductCardProps> = ({ product, onClick }) => {
  const { cart, addToCart, removeFromCart, updateCartItemQuantity, toggleFavorite, isInFavorites } = useStoreContext();
  const [isFavorite, setIsFavorite] = useState(isInFavorites(product.id));
  const [quantity, setQuantity] = useState(0);

  // Обновляем количество товара при изменении корзины
  useEffect(() => {
    const cartItem = cart.find(item => item.product.id === product.id);
    setQuantity(cartItem ? cartItem.quantity : 0);
  }, [cart, product.id]);

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();
    addToCart(product);
  };

  const handleIncreaseQuantity = (event: React.MouseEvent) => {
    event.stopPropagation();
    addToCart(product);
  };

  const handleDecreaseQuantity = (event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (quantity === 1) {
      removeFromCart(product.id);
    } else {
      updateCartItemQuantity(product.id, quantity - 1);
    }
  };

  const handleToggleFavorite = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleFavorite(product);
    setIsFavorite(!isFavorite);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} className={styles.image} />
        <button 
          className={`${styles.favoriteButton} ${isFavorite ? styles.favorite : ''}`}
          onClick={handleToggleFavorite}
        >
          ♥
        </button>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>{formatPrice(product.price)}</p>
        
        {quantity === 0 ? (
          <Button 
            size="s" 
            stretched 
            onClick={handleAddToCart}
          >
            В корзину
          </Button>
        ) : (
          <div className={styles.quantityControls}>
            <Button 
              size="s" 
              onClick={handleDecreaseQuantity}
            >
              -
            </Button>
            <span className={styles.quantityValue}>{quantity}</span>
            <Button 
              size="s" 
              onClick={handleIncreaseQuantity}
            >
              +
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}