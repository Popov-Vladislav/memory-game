import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@telegram-apps/telegram-ui';

import { Page } from '@/components/Page';
import { useStoreContext } from '@/context/StoreContext';
import styles from './index.module.css';
import { Product } from '@/types/store';

// Sample product data - in a real app, this would come from an API
const sampleProducts: Product[] = [
  {
    id: 1,
    title: 'Смартфон XYZ Pro 12',
    price: 59999,
    image: 'https://placehold.co/200x200?text=Smartphone',
    description: 'Новейший смартфон с высокой производительностью и передовой камерой. Оснащен процессором последнего поколения, 8 ГБ оперативной памяти и 256 ГБ встроенной памяти. 6.7-дюймовый AMOLED-дисплей с частотой обновления 120 Гц обеспечивает плавное и яркое изображение. Основная камера 108 МП с оптической стабилизацией позволяет делать фотографии профессионального качества даже при слабом освещении.',
    category: 'Электроника'
  },
  {
    id: 2,
    title: 'Беспроводные наушники AudioMax',
    price: 8990,
    image: 'https://placehold.co/200x200?text=Headphones',
    description: 'Наушники с активным шумоподавлением и высоким качеством звука. Время работы до 30 часов от одного заряда. Поддерживают технологию быстрого заряда: 10 минут зарядки обеспечивают до 3 часов прослушивания. Имеют встроенные микрофоны для звонков с шумоподавлением и поддерживают мультиточечное подключение к нескольким устройствам одновременно.',
    category: 'Электроника'
  },
  {
    id: 3,
    title: 'Спортивные кроссовки RunFast',
    price: 5499,
    image: 'https://placehold.co/200x200?text=Sneakers',
    description: 'Удобные кроссовки для бега и занятий спортом. Амортизирующая подошва снижает нагрузку на суставы при беге. Верх из дышащего материала обеспечивает комфорт даже при длительной активности. Прочная конструкция и качественные материалы гарантируют долговечность использования.',
    category: 'Спорт'
  },
  {
    id: 4,
    title: 'Футболка Classic',
    price: 1299,
    image: 'https://placehold.co/200x200?text=T-shirt',
    description: 'Классическая футболка из 100% хлопка. Свободный крой, круглый вырез горловины. Подходит для повседневной носки. Доступна в разных цветах и размерах от S до XXL. Не теряет форму и цвет после многочисленных стирок.',
    category: 'Одежда'
  },
  {
    id: 5,
    title: 'Умные часы FitTrack',
    price: 12499,
    image: 'https://placehold.co/200x200?text=Smartwatch',
    description: 'Часы с мониторингом активности и здоровья. Отслеживают пульс, уровень кислорода в крови, качество сна и другие показатели. Водонепроницаемые, с защитой до 50 метров. Время работы от одного заряда до 14 дней. Поддерживают уведомления со смартфона и управление музыкой.',
    category: 'Электроника'
  },
  {
    id: 6,
    title: 'Книга "Мастер и Маргарита"',
    price: 799,
    image: 'https://placehold.co/200x200?text=Book',
    description: 'Классическое произведение русской литературы от Михаила Булгакова. Твердый переплет, качественная печать. В книге представлено полное издание без сокращений, с комментариями литературоведов и иллюстрациями.',
    category: 'Книги'
  }
];

export const ProductDetailPage: FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, isInFavorites } = useStoreContext();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productId) {
      const id = parseInt(productId);
      const foundProduct = sampleProducts.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setIsFavorite(isInFavorites(id));
      } else {
        // Product not found, redirect to store main page
        navigate('/store');
      }
    }
  }, [productId, navigate, isInFavorites]);

  if (!product) {
    return null; // Loading state or product not found
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate('/store/cart');
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    setIsFavorite(!isFavorite);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Page>
      <div className={styles.container}>
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
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.price}>{formatPrice(product.price)}</p>
          
          <div className={styles.description}>
            <h2>Описание</h2>
            <p>{product.description}</p>
          </div>
          
          <div className={styles.actions}>
            <div className={styles.quantity}>
              <span>Количество:</span>
              <div className={styles.quantityControls}>
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
            </div>
            
            <Button 
              size="l" 
              stretched 
              onClick={handleAddToCart}
            >
              В корзину
            </Button>
          </div>
        </div>
      </div>
    </Page>
  );
};