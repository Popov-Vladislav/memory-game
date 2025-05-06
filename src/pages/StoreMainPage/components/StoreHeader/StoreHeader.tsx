import { FC } from 'react';
import styles from './index.module.css';

interface StoreHeaderProps {
  title: string;
}

export const StoreHeader: FC<StoreHeaderProps> = ({ title }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.searchContainer}>
        <input 
          type="text" 
          className={styles.searchInput} 
          placeholder="Поиск товаров..." 
        />
      </div>
    </div>
  );
};