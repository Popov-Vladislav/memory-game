import { FC, useState } from 'react';
import { Button, Cell, List, Radio, Section } from '@telegram-apps/telegram-ui';
import { useNavigate } from 'react-router-dom';

import { Page } from '@/components/Page';
import { useStoreContext } from '@/context/StoreContext';
import styles from './index.module.css';
import { DeliveryOption } from '@/types/store';
import { CartItem } from './components/CartItem/CartItem';

export const StoreCartPage: FC = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    cartTotal, 
    clearCart,
    deliveryOptions,
    selectedDeliveryOption,
    setSelectedDeliveryOption
  } = useStoreContext();
  
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleDeliveryChange = (option: DeliveryOption) => {
    setSelectedDeliveryOption(option);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Корзина пуста');
      return;
    }

    if (!selectedDeliveryOption) {
      alert('Выберите способ доставки');
      return;
    }

    if (selectedDeliveryOption.id !== 3 && !address.trim()) { // If not pickup
      alert('Введите адрес доставки');
      return;
    }

    // Here you would typically send the order to your backend
    alert('Заказ успешно оформлен!');
    clearCart();
    navigate('/');
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );

  return (
    <Page>
      <div className={styles.cartContainer}>
        <h1 className={styles.title}>Корзина</h1>
        
        {cart.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Ваша корзина пуста</p>
            <Button onClick={() => navigate('/store')}>Перейти к покупкам</Button>
          </div>
        ) : (
          <>
            <List>
              <Section header="Товары">
                {cart.map(item => (
                  <CartItem 
                    key={item.product.id} 
                    item={item} 
                  />
                ))}
              </Section>

              <Section header="Способ доставки">
                {deliveryOptions.map(option => (
                  <Cell
                    Component="label"
                    key={option.id}
                    after={
                      <Radio 
                        checked={selectedDeliveryOption?.id === option.id}
                        onChange={() => handleDeliveryChange(option)}
                      />
                    }
                    subtitle={`${option.price > 0 ? `${option.price} ₽` : 'Бесплатно'} • ${option.estimatedDays}`}
                  >
                    {option.name}
                  </Cell>
                ))}
              </Section>

              {selectedDeliveryOption && selectedDeliveryOption.id !== 3 && (
                <Section header="Адрес доставки">
                  <div className={styles.addressWrapper}>
                    <textarea
                        className={styles.addressInput}
                        placeholder="Введите адрес доставки"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={3}
                      />
                  </div>
                </Section>
              )}

              <Section header="Способ оплаты">
                <Cell
                  Component="label"
                  after={
                    <Radio 
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                  }
                >
                  Банковская карта
                </Cell>
                <Cell
                  Component="label"
                  after={
                    <Radio 
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                    />
                  }
                >
                  Наличными при получении
                </Cell>
              </Section>
            </List>

            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>Подытог:</span>
                <span>{subtotal} ₽</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Доставка:</span>
                <span>{selectedDeliveryOption?.price || 0} ₽</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Итого:</span>
                <span>{cartTotal} ₽</span>
              </div>

              <Button stretched size="l" onClick={handleCheckout}>
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </div>
    </Page>
  );
};