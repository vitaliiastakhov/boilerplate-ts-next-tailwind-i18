
import classes from './home-page.module.css';

export interface HomePageProps {
}

export const HomePage = () => {
  return (
    <div className={classes['home-page']}>
      <h1>Home Page</h1>
    </div>
  );
};
