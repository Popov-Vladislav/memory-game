import { FC } from 'react';
import styles from './index.module.css';

interface StoreHeaderProps {
  title: string;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export const StoreHeader: FC<StoreHeaderProps> = ({ 
  title, 
  showSearch = false,
  searchValue = '',
  onSearchChange
}) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {showSearch && (
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            className={styles.searchInput} 
            placeholder="Поиск товаров..." 
            value={searchValue}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};