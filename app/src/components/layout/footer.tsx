import { Text } from '@radix-ui/themes';
import * as styles from './footer.css';

export function Footer() {
	return (
		<footer className={styles.footerStyle}>
			<Text color="gray">
				© {new Date().getFullYear()} CommuniShield. All rights reserved.
			</Text>
		</footer>
	);
}
