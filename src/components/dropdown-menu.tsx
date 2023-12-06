import * as styles from './dropdown-menu.css';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { PropsWithChildren, ReactNode } from 'react';

export type DropdownMenuProps = {
  readonly trigger: ReactNode;
} & PropsWithChildren;

export type DropdownMenuLinkProps = {
  readonly href: string;
} & PropsWithChildren;

export function DropdownMenu({ trigger, children }: DropdownMenuProps) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild className={styles.button}>
        <button aria-haspopup type="button">
          {trigger}
        </button>
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content className={styles.content}>
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

export function DropdownMenuLink({ href, children }: DropdownMenuLinkProps) {
  return (
    <DropdownMenuPrimitive.Item asChild className={styles.item}>
      <a href={href}>{children}</a>
    </DropdownMenuPrimitive.Item>
  );
}

export function DropdownMenuSeparator() {
  return <DropdownMenuPrimitive.Separator className={styles.separator} />;
}
