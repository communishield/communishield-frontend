import { Footer } from './footer';
import { Header } from './header';
import { Main } from './main';
import * as styles from './root.css';
import { PropsWithChildren } from 'react';

export function Root({ children }: PropsWithChildren) {
  return (
    <div className={styles.rootLayoutStyle}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
