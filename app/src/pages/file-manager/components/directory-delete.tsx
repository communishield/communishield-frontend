import { Button, Flex, Text } from '@radix-ui/themes';
import { Directory } from '../../../third-parties/communishield/types/directory';
import { useContext } from 'react';
import { LoadingContext } from '../../../contexts/loading.context';
import { ErrorContext } from '../../../contexts/error.context';
import { Communishield } from '../../../third-parties/communishield/client';
import { DialogContext } from '../../../contexts/dialog.context';

export type DirectoryDeleteProps = {
	readonly directory: Directory;
	readonly onDelete: () => void;
};

export function DirectoryDelete({ directory, onDelete }: DirectoryDeleteProps) {
	const { setLoading } = useContext(LoadingContext);
	const { setError } = useContext(ErrorContext);
	const { setDialogProps } = useContext(DialogContext);

	const handleDelete = async () => {
		setLoading(true);
		try {
			await Communishield.deleteDirectory(directory.path);

			setDialogProps(undefined);
		} catch (error) {
			setError(error as Error);
		} finally {
			onDelete();
			setLoading(false);
		}
	};

	return (
		<Flex direction="column" gap="1">
			<Text color="gray">
				<Text weight="bold">Path:</Text> {directory.path}
			</Text>
			<Flex asChild direction="column">
				<Text color="yellow">
					<Text weight="bold">
						Are you sure you want to delete this directory?
					</Text>
					<Text>This action cannot be undone.</Text>
				</Text>
			</Flex>

			<Button color="red" style={{ cursor: 'pointer' }} onClick={handleDelete}>
				Delete
			</Button>
		</Flex>
	);
}
