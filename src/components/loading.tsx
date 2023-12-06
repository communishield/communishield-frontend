import * as styles from './loading.css';
import { SymbolIcon } from '@radix-ui/react-icons';

export function Loading() {
	return (
		<div
			role="alert"
			aria-live="assertive"
			aria-label="Content is Loading"
			className={styles.container}
		>
			<SymbolIcon className={styles.symbol} />
			<span className="sr-only">Loading...</span>
		</div>
	);
}
