import * as styles from './navigation-menu.css';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { User } from '../../models/user';
import { Flex, Separator } from '@radix-ui/themes';
import { ArchiveIcon, EnterIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { AvatarMenu } from '../avatar-menu';

export type NavigationMenuProps = {
  readonly isCollapsed: boolean;
};

function CollapsedNavigationMenu({ user }: { readonly user?: User }) {
  return <h1>Collapsed {user?.groups}</h1>;
}

function FullNavigationMenu({ user }: { readonly user?: User }) {
  return (
    <NavigationMenuPrimitive.Root>
      <Flex asChild direction="row" gap="4" align="center">
        <NavigationMenuPrimitive.List>
          <NavigationMenuPrimitive.Link
            className={styles.link}
            href="file-manager"
          >
            <ArchiveIcon style={{ height: '1em', width: '1em' }} /> File Manager
            <Separator orientation="vertical" />
          </NavigationMenuPrimitive.Link>
          {user ? (
            <AvatarMenu />
          ) : (
            <>
              <NavigationMenuPrimitive.Link
                className={styles.link}
                href="/signup"
              >
                <PlusCircledIcon style={{ height: '1em', width: '1em' }} /> Sign
                Up
              </NavigationMenuPrimitive.Link>
              <Separator orientation="vertical" />
              <NavigationMenuPrimitive.Link
                className={styles.link}
                href="/signin"
              >
                <EnterIcon style={{ height: '1em', width: '1em' }} /> Sign In
              </NavigationMenuPrimitive.Link>
            </>
          )}
        </NavigationMenuPrimitive.List>
      </Flex>
    </NavigationMenuPrimitive.Root>
  );
}

export function NavigationMenu({ isCollapsed }: NavigationMenuProps) {
  const { user } = useContext(UserContext);

  if (isCollapsed) {
    return <CollapsedNavigationMenu user={user} />;
  }

  return <FullNavigationMenu user={user} />;
}
