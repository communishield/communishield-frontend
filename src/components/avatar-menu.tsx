import * as styles from './avatar-menu.css';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Avatar } from './avatar';
import { ExitIcon, LockOpen2Icon, PersonIcon } from '@radix-ui/react-icons';
import { useContext } from 'react';
import { UserContext } from '../contexts/user.context';

export function AvatarMenu() {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-haspopup
          type="button"
          className={styles.avatarButton}
          aria-label="Avatar"
          aria-expanded="false"
          aria-controls="avatar-menu"
        >
          <Avatar
            src="https://i.pravatar.cc/300"
            username={user.username}
            height={42}
            width={42}
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.dropdownContent}>
          {user.groups.includes('admin') && (
            <>
              <DropdownMenu.Item asChild className={styles.dropdownItem}>
                <a href="/admin">
                  <LockOpen2Icon /> Admin
                </a>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className={styles.dropdownSeparator} />
            </>
          )}
          <DropdownMenu.Item asChild className={styles.dropdownItem}>
            <a href="/profile">
              <PersonIcon /> Profile
            </a>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild className={styles.dropdownItem}>
            <a href="/signout">
              <ExitIcon /> Sign Out
            </a>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
