import { Section, Cell, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';

export const IndexPage: FC = () => {
  return (
    <Page back={false}>
      <List>
        <Section header="Меню">
          <Link to="/memory-game">
            <Cell subtitle="Проверьте свою память в нашей игре">Игра на память</Cell>
          </Link>
          <Link to="/init-data">
            <Cell subtitle="User data, chat information, technical data">Init Data</Cell>
          </Link>
        </Section>
      </List>
    </Page>
  );
};
