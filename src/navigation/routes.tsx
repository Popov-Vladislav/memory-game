import type { ComponentType, JSX } from 'react';

import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { InitDataPage } from '@/pages/InitDataPage.tsx';
import { MemoryGamePage } from '@/pages/MemoryGamePage/MemoryGamePage';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage },
  { path: '/memory-game', Component: MemoryGamePage, title: 'Игра на тренировку памяти' },
  { path: '/init-data', Component: InitDataPage, title: 'Init Data' },
];
