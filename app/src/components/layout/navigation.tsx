import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { User } from '../../models/user';
import {
	ArchiveIcon,
	EnterIcon,
	ExitIcon,
	HamburgerMenuIcon,
	LockOpen2Icon,
	PersonIcon,
	PlusCircledIcon,
} from '@radix-ui/react-icons';
import { AvatarMenu } from '../avatar-menu';
import {
	DropdownMenu,
	DropdownMenuLink,
	DropdownMenuSeparator,
} from '../dropdown-menu';
import {
	NavigationMenu,
	NavigationMenuLink,
	NavigationMenuSeparator,
} from '../navigation-menu';

export type NavigationMenuProps = {
	readonly isCollapsed: boolean;
};

function CollapsedNavigation({ user }: { readonly user?: User }) {
	return (
		<DropdownMenu
			trigger={<HamburgerMenuIcon style={{ height: '2em', width: '2em' }} />}
		>
			{user && user.groups.includes('admin') && (
				<>
					<DropdownMenuLink href="/admin">
						<LockOpen2Icon /> Admin
					</DropdownMenuLink>
					<DropdownMenuSeparator />
				</>
			)}
			{user && (
				<>
					<DropdownMenuLink href="/file-manager">
						<ArchiveIcon /> File Manager
					</DropdownMenuLink>
					<DropdownMenuSeparator />
					<DropdownMenuLink href="/profile">
						<PersonIcon /> Profile
					</DropdownMenuLink>
					<DropdownMenuLink href="/signout">
						<ExitIcon /> Sign Out
					</DropdownMenuLink>
				</>
			)}
			{!user && (
				<>
					<DropdownMenuLink href="/signup">
						<PlusCircledIcon /> Sign Up
					</DropdownMenuLink>
					<DropdownMenuLink href="/signin">
						<EnterIcon /> Sign In
					</DropdownMenuLink>
				</>
			)}
		</DropdownMenu>
	);
}

function FullNavigation({ user }: { readonly user?: User }) {
	return (
		<NavigationMenu>
			{user && (
				<>
					<NavigationMenuSeparator />
					<NavigationMenuLink href="/file-manager">
						<ArchiveIcon /> File Manager
					</NavigationMenuLink>
					<NavigationMenuSeparator />
					<AvatarMenu src="" username={user.username}>
						{user.groups.includes('admin') && (
							<>
								<DropdownMenuLink href="/admin">
									<LockOpen2Icon /> Admin
								</DropdownMenuLink>
								<DropdownMenuSeparator />
							</>
						)}
						<DropdownMenuLink href="/profile">
							<PersonIcon /> Profile
						</DropdownMenuLink>
						<DropdownMenuLink href="/signout">
							<ExitIcon /> Sign Out
						</DropdownMenuLink>
					</AvatarMenu>
				</>
			)}
			{!user && (
				<>
					<NavigationMenuSeparator />
					<NavigationMenuLink href="/signup">
						<PlusCircledIcon /> Sign Up
					</NavigationMenuLink>
					<NavigationMenuSeparator />
					<NavigationMenuLink href="/signin">
						<EnterIcon /> Sign In
					</NavigationMenuLink>
				</>
			)}
		</NavigationMenu>
	);
}

export function Navigation({ isCollapsed }: NavigationMenuProps) {
	const { user } = useContext(UserContext);

	if (isCollapsed) {
		return <CollapsedNavigation user={user} />;
	}

	return <FullNavigation user={user} />;
}
