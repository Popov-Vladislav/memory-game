import { FC } from 'react';
import { Button } from '@telegram-apps/telegram-ui';
import { useNavigate } from 'react-router-dom';

import { Page } from '@/components/Page';
import { useStoreContext } from '@/context/StoreContext';
import styles from './index.module.css';
import { ProductCard } from '../StoreMainPage/components/ProductCard/ProductCard';

export const StoreFavoritePage: FC = () => {
  const navigate = useNavigate();
  const { favorites } = useStoreContext();

  return (
    <Page>
      <div className={styles.container}>
        <h1 className={styles.title}>Избранное</h1>
        
        {favorites.length === 0 ? (
          <div className={styles.emptyState}>
            <p>У вас пока нет избранных товаров</p>
            <Button onClick={() => navigate('/store')}>Перейти к покупкам</Button>
          </div>
        ) : (
          <div className={styles.grid}>
            {favorites.map(product => (
              <ProductCard 
                key={product.id}
                product={product} 
                onClick={() => navigate(`/store/product/${product.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </Page>
  );
};