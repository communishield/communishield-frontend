import { Avatar } from './avatar';
import { PropsWithChildren } from 'react';
import { DropdownMenu } from './dropdown-menu';

export type AvatarMenuProps = {
  readonly src: string;
  readonly username: string;
} & PropsWithChildren;

export function AvatarMenu({ src, username, children }: AvatarMenuProps) {
  return (
    <DropdownMenu
      trigger={<Avatar src={src} username={username} height={42} width={42} />}
    >
      {children}
    </DropdownMenu>
  );
}
