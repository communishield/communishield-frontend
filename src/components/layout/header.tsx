import * as styles from './header.css';
import Logo from '../../assets/logo.png';
import { Flex, Heading } from '@radix-ui/themes';
import { Link } from '../link';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <Flex asChild direction="row" gap="4" align="center" width="max-content">
        <Link href="/">
          <img className={styles.imageStyle} src={Logo} />
          <Heading color="gray" size="9">
            CommuniShield
          </Heading>
        </Link>
      </Flex>
    </header>
  );
}
