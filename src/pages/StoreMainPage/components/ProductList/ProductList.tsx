import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import { Product } from '@/types/store';
import { ProductCard } from '../ProductCard/ProductCard';

interface ProductListProps {
  products: Product[];
}

export const ProductList: FC<ProductListProps> = ({ products }) => {
  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    navigate(`/store/product/${productId}`);
  };

  return (
    <div className={styles.productList}>
      {products.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Товары не найдены</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {products.map(product => (
            <ProductCard 
              key={product.id}
              product={product} 
              onClick={() => handleProductClick(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};