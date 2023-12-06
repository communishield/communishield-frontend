import * as styles from './interactive-cell.css';
import { Flex, Table, Text } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';

export type InteractiveCellProps = {
	readonly onClick: () => void;
	readonly color: Parameters<typeof Text>[0]['color'];
} & PropsWithChildren;

export function InteractiveCell({
	onClick,
	color,
	children,
}: InteractiveCellProps) {
	return (
		<Table.Cell
			className={styles.interactiveCell}
			aria-label="Interactive cell"
			aria-controls="file-table"
			color={color}
			onClick={onClick}
		>
			<Flex align="center" gap="2">
				{children}
			</Flex>
		</Table.Cell>
	);
}
