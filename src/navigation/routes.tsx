import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { InitDataPage } from '@/pages/InitDataPage';
import { MemoryGamePage } from '@/pages/MemoryGamePage/MemoryGamePage';
import { StoreRoutes } from './store.routes';
import { Route } from './routes.interface';
import { StoreMainPage } from '@/pages/StoreMainPage';


export const routes: Route[] = [
  { path: '/', Component: IndexPage },
  { path: '/store', Component: StoreMainPage, title: 'Интернет магазин' },
  { path: '/memory-game', Component: MemoryGamePage, title: 'Игра на тренировку памяти' },
  { path: '/init-data', Component: InitDataPage, title: 'О пользователе' },
  ...StoreRoutes
];