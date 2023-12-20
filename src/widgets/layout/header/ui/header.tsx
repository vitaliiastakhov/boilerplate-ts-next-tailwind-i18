import Link from 'next/link';

import { Text } from '@/ui/text';

import { navigation } from '../api';
import classes from './header.module.css';

export const Header = () => {
  return (
    <div className={classes.header}>
      <div aria-label='Home'>
        <Link href={navigation['home-page']}>
          <Text as='span' size='body-large'>
            Home Page
          </Text>
        </Link>
      </div>
      <nav>
        <Link href={navigation['home-page']}>
          <Text as='span' size='body-large'>
            Home Page
          </Text>
        </Link>
      </nav>
    </div>
  );
};
