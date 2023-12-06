import { PropsWithChildren } from 'react';
import * as styles from './main.css';

export function Main({ children }: PropsWithChildren) {
	return <main className={styles.mainLayoutStyle}>{children}</main>;
}
