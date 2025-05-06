import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '@/components/Page';
import styles from './index.module.css';
import { Product } from '@/types/store';
import { ProductCard } from '../StoreMainPage/components/ProductCard/ProductCard';

// Sample product data - in a real app, this would come from an API
const sampleProducts: Product[] = [
  {
    id: 1,
    title: 'Смартфон XYZ Pro 12',
    price: 59999,
    image: 'https://placehold.co/200x200?text=Smartphone',
    description: 'Новейший смартфон с высокой производительностью и передовой камерой',
    category: 'Электроника'
  },
  {
    id: 2,
    title: 'Беспроводные наушники AudioMax',
    price: 8990,
    image: 'https://placehold.co/200x200?text=Headphones',
    description: 'Наушники с шумоподавлением и высоким качеством звука',
    category: 'Электроника'
  },
  {
    id: 3,
    title: 'Спортивные кроссовки RunFast',
    price: 5499,
    image: 'https://placehold.co/200x200?text=Sneakers',
    description: 'Удобные кроссовки для бега и занятий спортом',
    category: 'Спорт'
  },
  {
    id: 4,
    title: 'Футболка Classic',
    price: 1299,
    image: 'https://placehold.co/200x200?text=T-shirt',
    description: 'Классическая футболка из 100% хлопка',
    category: 'Одежда'
  },
  {
    id: 5,
    title: 'Умные часы FitTrack',
    price: 12499,
    image: 'https://placehold.co/200x200?text=Smartwatch',
    description: 'Часы с мониторингом активности и здоровья',
    category: 'Электроника'
  },
  {
    id: 6,
    title: 'Книга "Мастер и Маргарита"',
    price: 799,
    image: 'https://placehold.co/200x200?text=Book',
    description: 'Классическое произведение русской литературы',
    category: 'Книги'
  },
  {
    id: 7,
    title: 'Фитнес браслет ActiveBand',
    price: 3499,
    image: 'https://placehold.co/200x200?text=Fitband',
    description: 'Трекер активности с измерением пульса и шагомером',
    category: 'Электроника'
  },
  {
    id: 8,
    title: 'Кроссовки для бега Marathon',
    price: 7999,
    image: 'https://placehold.co/200x200?text=Running+Shoes',
    description: 'Профессиональные кроссовки для марафонов и длительных забегов',
    category: 'Спорт'
  }
];

export const StoreExplorePage: FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Extract unique categories from products
  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(sampleProducts.map(product => product.category))
    );
    setCategories(uniqueCategories);
  }, []);

  // Filter products based on search term, price range, and category
  useEffect(() => {
    const filtered = sampleProducts.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      
      return matchesSearch && matchesPrice && matchesCategory;
    });
    
    setFilteredProducts(filtered);
  }, [searchTerm, priceRange, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  return (
    <Page>
      <div className={styles.container}>
        <h1 className={styles.title}>Поиск товаров</h1>
        
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Поиск товаров..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className={styles.filters}>
          <div className={styles.filterSection}>
            <h3>Категории</h3>
            <div className={styles.categoryButtons}>
              {categories.map(category => (
                <button
                  key={category}
                  className={`${styles.categoryButton} ${selectedCategory === category ? styles.selected : ''}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className={styles.filterSection}>
            <h3>Цена</h3>
            <div className={styles.priceInputs}>
              <input
                type="number"
                placeholder="От"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                className={styles.priceInput}
              />
              <span>—</span>
              <input
                type="number"
                placeholder="До"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                className={styles.priceInput}
              />
            </div>
          </div>
        </div>
        
        <div className={styles.resultsHeader}>
          <h2>Результаты ({filteredProducts.length})</h2>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Товары не найдены</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredProducts.map(product => (
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