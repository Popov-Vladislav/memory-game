import { FC } from 'react';
import { Button, Cell } from '@telegram-apps/telegram-ui';
import styles from './index.module.css';
import { CartItem as CartItemType } from '@/types/store';
import { useStoreContext } from '@/context/StoreContext';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: FC<CartItemProps> = ({ item }) => {
  const { updateCartItemQuantity, removeFromCart } = useStoreContext();
  const { product, quantity } = item;

  const handleQuantityChange = (newQuantity: number) => {
    updateCartItemQuantity(product.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <Cell
      className={styles.item}
      before={
        <div className={styles.imageContainer}>
          <img src={product.image} alt={product.title} className={styles.image} />
        </div>
      }
      multiline
    >
      <div className={styles.content}>
        <div className={styles.info}>
          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.price}>{product.price} ₽</p>
        </div>
        
        <div className={styles.actions}>
          <div className={styles.quantity}>
            <Button 
              size="s" 
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className={styles.quantityValue}>{quantity}</span>
            <Button 
              size="s" 
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </Button>
          </div>
          
          <Button 
            size="s"
            onClick={handleRemove}
          >
            Удалить
          </Button>
        </div>
      </div>
    </Cell>
  );
};