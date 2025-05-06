import { FC, useState } from 'react';
import { Button } from '@telegram-apps/telegram-ui';
import styles from './index.module.css';
import { Product } from '@/types/store';
import { useStoreContext } from '@/context/StoreContext';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard: FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToCart, toggleFavorite, isInFavorites } = useStoreContext();
  const [isFavorite, setIsFavorite] = useState(isInFavorites(product.id));

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();
    addToCart(product);
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
        <Button 
          size="s" 
          stretched 
          onClick={handleAddToCart}
        >
          В корзину
        </Button>
      </div>
    </div>
  );
};