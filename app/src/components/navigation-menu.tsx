import * as styles from './navigation-menu.css';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { Flex, Separator } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';

export type NavigationMenuLinkProps = {
	readonly href: string;
} & PropsWithChildren;

export function NavigationMenu({ children }: PropsWithChildren) {
	return (
		<NavigationMenuPrimitive.Root>
			<Flex asChild gap="4" align="center">
				<NavigationMenuPrimitive.List>{children}</NavigationMenuPrimitive.List>
			</Flex>
		</NavigationMenuPrimitive.Root>
	);
}

export function NavigationMenuLink({
	href,
	children,
}: NavigationMenuLinkProps) {
	return (
		<NavigationMenuPrimitive.Link className={styles.link} href={href}>
			{children}
		</NavigationMenuPrimitive.Link>
	);
}

export function NavigationMenuSeparator() {
	return <Separator orientation="vertical" size="2" />;
}
