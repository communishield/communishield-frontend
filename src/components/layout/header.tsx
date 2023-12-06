import * as styles from './header.css';
import Logo from '../../assets/logo.png';
import { Flex, Heading } from '@radix-ui/themes';
import { Link } from '../link';
import { NavigationMenu } from './navigation-menu';

export function Header() {
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
        <NavigationMenu isCollapsed={false} />
      </header>
    </Flex>
  );
}
