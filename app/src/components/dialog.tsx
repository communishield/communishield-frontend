import * as styles from './dialog.css';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Button, Flex, Heading, Text } from '@radix-ui/themes';
import { ReactNode } from 'react';

export type DialogProps = {
	readonly isOpen: boolean;
	readonly title: string;
	readonly message: ReactNode;
	readonly color: Parameters<typeof Text>[0]['color'];
	readonly onDismiss: () => void;
};

export function Dialog({
	isOpen,
	title,
	message,
	color,
	onDismiss,
}: DialogProps) {
	return (
		<DialogPrimitive.Root open={isOpen} onOpenChange={onDismiss}>
			<DialogPrimitive.Overlay className={styles.overlay} />
			<DialogPrimitive.Content className={styles.content}>
				<DialogPrimitive.Title asChild>
					<Heading as="h2" color={color} mb="4">
						{title}
					</Heading>
				</DialogPrimitive.Title>
				<DialogPrimitive.Description asChild>
					{message}
				</DialogPrimitive.Description>
				<Flex mt="4" justify="end">
					<DialogPrimitive.Close asChild>
						<Button color={color} style={{ cursor: 'pointer' }}>
							Close
						</Button>
					</DialogPrimitive.Close>
				</Flex>
			</DialogPrimitive.Content>
		</DialogPrimitive.Root>
	);
}
