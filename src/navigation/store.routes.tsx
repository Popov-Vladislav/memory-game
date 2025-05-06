import { StoreCartPage } from '@/pages/StoreCartPage';
import { Route } from './routes.interface';
import { StoreFavoritePage } from '@/pages/StoreFavoritePage';
import { StoreExplorePage } from '@/pages/StoreExplorePage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';

export const StoreRoutes: Route[] = [
  { path: '/store/cart', Component: StoreCartPage, title: 'Корзина', icon: 'cart'},
  { path: '/store/favorite', Component: StoreFavoritePage, title: 'Избранное', icon: 'favorite' },
  { path: '/store/explore', Component: StoreExplorePage, title: 'Поиск', icon: 'explore' },
  { path: '/store/product/:productId', Component: ProductDetailPage }
];