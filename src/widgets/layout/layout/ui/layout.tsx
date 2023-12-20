import type { PropsWithChildren } from 'react';

import { Footer } from '../../footer';
import { Header } from '../../header';
import classes from './layout.module.css';

type LayoutProps = PropsWithChildren;

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={classes.layout}>
      <Header />
      <main className={classes['layout-main']}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
