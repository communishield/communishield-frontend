import * as styles from './footer.css';

export function Footer() {
	return (
		<footer className={styles.footerStyle}>
			<p className={styles.copyrightTextStyle}>
				© {new Date().getFullYear()} CommuniShield. All rights reserved.
			</p>
		</footer>
	);
}
