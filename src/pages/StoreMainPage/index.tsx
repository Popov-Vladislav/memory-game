import { FC, useState } from 'react';
import { Button, TabsList } from '@telegram-apps/telegram-ui';
import { useNavigate } from 'react-router-dom';

import { Page } from '@/components/Page';
import styles from './index.module.css';
import { Product } from '@/types/store';
import { StoreHeader } from '@/pages/StoreMainPage/components/StoreHeader/StoreHeader';
import { ProductList } from './components/ProductList/ProductList';

// Sample product data
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
  }
];

// Categories for filtering
const categories = ['Все', 'Электроника', 'Спорт', 'Одежда', 'Книги'];

export const StoreMainPage: FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('Все');
  
  const filteredProducts = activeTab === 'Все' 
    ? sampleProducts 
    : sampleProducts.filter(product => product.category === activeTab);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const navigateToCart = () => {
    navigate('/store/cart');
  };

  const navigateToFavorites = () => {
    navigate('/store/favorite');
  };
  
  const navigateToExplore = () => {
    navigate('/store/explore');
  };

  return (
    <Page>
      <div className={styles.storeContainer}>
        <StoreHeader title="Интернет магазин" />
        
        <TabsList>
          {categories.map(category => (
            <TabsList.Item
              key={category}
              selected={activeTab === category}
              onClick={() => handleTabChange(category)}
            >
              {category}
            </TabsList.Item>
          ))}
        </TabsList>
        
        <ProductList products={filteredProducts} />
        
        <div className={styles.bottomNav}>
          <Button onClick={navigateToFavorites}>Избранное</Button>
          <Button onClick={navigateToCart}>Корзина</Button>
          <Button onClick={navigateToExplore}>Поиск</Button>
        </div>
      </div>
    </Page>
  );
};