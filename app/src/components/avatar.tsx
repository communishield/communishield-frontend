import { Flex } from '@radix-ui/themes';
import * as styles from './avatar.css';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

export type AvatarProps = {
	readonly src: string;
	readonly username: string;
	readonly height?: number;
	readonly width?: number;
} & Parameters<typeof AvatarPrimitive.Root>[0];

export function Avatar({
	src,
	username,
	height,
	width,
	className: incomingClassName,
	style: incomingStyle,
	...rest
}: AvatarProps) {
	const className = (incomingClassName ?? '')
		.split(' ')
		.filter(Boolean)
		.concat(styles.avatarContainer)
		.join(' ');
	const style = {
		...{ height: `${height}px`, width: `${width}px` },
		...incomingStyle,
	};

	return (
		<Flex asChild align="center" justify="center">
			<AvatarPrimitive.Root className={className} style={style} {...rest}>
				<AvatarPrimitive.Image
					src={src}
					alt={username}
					style={{ height: `${height}px`, width: `${width}px` }}
				/>
				<AvatarPrimitive.Fallback>
					{username
						.split(/\W+/)
						.slice(0, 2)
						.map(name => name[0].toUpperCase())
						.join('')}
				</AvatarPrimitive.Fallback>
			</AvatarPrimitive.Root>
		</Flex>
	);
}
