import * as styles from './header.css';
import Logo from '../../assets/logo.png';

export function Header() {
	return (
		<div className={styles.headerContainer}>
			<img className={styles.imageStyle} src={Logo} />
			<h1 className={styles.titleStyle}>CommuniShield</h1>
		</div>
	);
}
