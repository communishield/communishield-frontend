import * as styles from './header.css';
import Logo from '../../assets/logo.png';
import { Flex, Heading } from '@radix-ui/themes';
import { Link } from '../link';
import { Navigation } from './navigation';
import { useState } from 'react';

export function Header() {
	const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 810);

	window.addEventListener('resize', () => {
		setIsCollapsed(window.innerWidth < 810);
	});

	return (
		<Flex asChild direction="row" gap="4" align="center" justify="between">
			<header className={styles.headerContainer}>
				<Flex
					asChild
					direction="row"
					gap="4"
					align="center"
					width="max-content"
				>
					<Link href="/">
						<img className={styles.imageStyle} src={Logo} />
						<Heading color="gray" size="9">
							CommuniShield
						</Heading>
					</Link>
				</Flex>
				<Navigation isCollapsed={isCollapsed} />
			</header>
		</Flex>
	);
}
