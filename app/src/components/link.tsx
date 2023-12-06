import * as styles from './link.css';
import { Link as LinkPrimitive } from '@radix-ui/themes';

type LinkProps = Parameters<typeof LinkPrimitive>[0];

export function Link({ className: incomingClassName, ...res }: LinkProps) {
	const className = (incomingClassName ?? '')
		.split(' ')
		.concat(styles.link)
		.join(' ');

	return <LinkPrimitive {...res} className={className} />;
}
