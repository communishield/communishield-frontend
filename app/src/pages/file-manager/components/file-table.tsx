import { Flex, Heading, Table, Text } from '@radix-ui/themes';
import { Directory } from '../../../third-parties/communishield/types/directory';
import {
	ArchiveIcon,
	CubeIcon,
	FileIcon,
	Pencil1Icon,
	PersonIcon,
	PlusCircledIcon,
	TrashIcon,
} from '@radix-ui/react-icons';
import { InteractiveCell } from './interactive-cell';
import { useContext } from 'react';
import { ActionContext } from '../contexts/action.context';
import { joinUrl } from '../../../utils/join-url';
import { DialogContext } from '../../../contexts/dialog.context';
import { NewEntity } from './new-entity';

export type FileTableProps = {
	readonly directory?: Directory;
	readonly onFinish: () => void;
};

const filetypeIcon = {
	file: <FileIcon />,
	directory: <ArchiveIcon />,
};

export function FileTable({ directory, onFinish }: FileTableProps) {
	const { setActionParams } = useContext(ActionContext);
	const { setDialogProps } = useContext(DialogContext);

	const handleClick = (
		path: string,
		type: 'file' | 'directory',
		action: 'read' | 'create' | 'update' | 'delete'
	) => {
		setActionParams({
			path,
			type,
			action,
		});
	};

	if (!directory) {
		return (
			<>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
							<Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
							<Table.ColumnHeaderCell>Owner</Table.ColumnHeaderCell>
							<Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
							<Table.ColumnHeaderCell />
							<Table.ColumnHeaderCell />
						</Table.Row>
					</Table.Header>
				</Table.Root>

				<Heading color="gray" size="5" mt="4">
					No directory selected
				</Heading>
				<Text color="gray">
					After you search for a directory, it will be shown here
				</Text>
			</>
		);
	}

	return (
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>Owner</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell />
					<Table.ColumnHeaderCell />
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{directory.contents.map(file => (
					<Table.Row key={file.name}>
						{file.type === 'file' ? (
							<InteractiveCell
								color="blue"
								onClick={() => {
									handleClick(
										joinUrl(directory.path, file.name),
										file.type,
										'read'
									);
								}}
							>
								{file.name}
							</InteractiveCell>
						) : (
							<Table.Cell> {file.name} </Table.Cell>
						)}
						<Table.Cell>
							<Flex align="center" gap="2">
								{filetypeIcon[file.type]} {file.type}
							</Flex>
						</Table.Cell>
						<Table.Cell>
							<Flex align="center" gap="2">
								<PersonIcon />
								{file.owner}
							</Flex>
						</Table.Cell>
						<Table.Cell>
							<Flex align="center" gap="2">
								<CubeIcon />
								{file.group}
							</Flex>
						</Table.Cell>
						<InteractiveCell
							color="green"
							onClick={() => {
								handleClick(
									joinUrl(directory.path, file.name),
									file.type,
									'update'
								);
							}}
						>
							<Pencil1Icon /> Edit
						</InteractiveCell>
						<InteractiveCell
							color="red"
							onClick={() => {
								handleClick(
									joinUrl(directory.path, file.name),
									file.type,
									'delete'
								);
							}}
						>
							<TrashIcon /> Delete
						</InteractiveCell>
					</Table.Row>
				))}
				<Table.Row>
					<InteractiveCell
						color="blue"
						onClick={() => {
							setDialogProps({
								title: 'Create new file / directory',
								isOpen: true,
								color: 'blue',
								message: (
									<NewEntity directory={directory!} onFinish={onFinish} />
								),
								onDismiss: () => {},
							});
						}}
					>
						<PlusCircledIcon /> Create
					</InteractiveCell>
					<Table.Cell />
					<Table.Cell />
					<Table.Cell />
					<Table.Cell />
					<Table.Cell />
				</Table.Row>
			</Table.Body>
		</Table.Root>
	);
}
