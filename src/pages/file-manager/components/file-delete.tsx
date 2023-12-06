import { Button, Flex, Text } from '@radix-ui/themes';
import { File } from '../../../third-parties/communishield/types/file';
import { useContext } from 'react';
import { LoadingContext } from '../../../contexts/loading.context';
import { ErrorContext } from '../../../contexts/error.context';
import { Communishield } from '../../../third-parties/communishield/client';
import { DialogContext } from '../../../contexts/dialog.context';

export type FileDeleteProps = {
	readonly file: File;
	readonly onDelete: () => void;
};

export function FileDelete({ file, onDelete }: FileDeleteProps) {
	const { setLoading } = useContext(LoadingContext);
	const { setError } = useContext(ErrorContext);
	const { setDialogProps } = useContext(DialogContext);

	const handleDelete = async () => {
		setLoading(true);
		try {
			await Communishield.deleteFile(file.path);

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
				<Text weight="bold">Path:</Text> {file.path}
			</Text>
			<Flex asChild direction="column">
				<Text color="yellow">
					<Text weight="bold">Are you sure you want to delete this file?</Text>
					<Text>This action cannot be undone.</Text>
				</Text>
			</Flex>

			<Button color="red" style={{ cursor: 'pointer' }} onClick={handleDelete}>
				Delete
			</Button>
		</Flex>
	);
}
