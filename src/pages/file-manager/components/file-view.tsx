import { Code, Flex, Text } from '@radix-ui/themes';
import { File } from '../../../third-parties/communishield/types/file';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/light';

export type FileViewProps = {
	readonly file: File;
};

export function FileView({ file }: FileViewProps) {
	return (
		<Flex direction="column" gap="1">
			<Text color="gray">
				<Text weight="bold">Path:</Text> {file.path}
			</Text>
			<Text color="gray">
				<Text weight="bold">Owner:</Text> {file.owner}
			</Text>
			<Text color="gray">
				<Text weight="bold">Group:</Text> {file.group}
			</Text>
			<Text color="gray">
				<Text weight="bold">Permissions:</Text>
			</Text>
			<Text color="gray" ml="4">
				<Text weight="bold">Owner:</Text>
			</Text>
			<Text color="gray" ml="8">
				<Text weight="bold">
					<Text weight="bold">Read:</Text>
				</Text>{' '}
				{file.permissions.owner.read ? 'Yes' : 'No'}
			</Text>
			<Text color="gray" ml="8">
				<Text weight="bold">
					<Text weight="bold">Write:</Text>
				</Text>{' '}
				{file.permissions.owner.write ? 'Yes' : 'No'}
			</Text>
			<Text color="gray" ml="4">
				<Text weight="bold">Group:</Text>
			</Text>
			<Text color="gray" ml="8">
				<Text weight="bold">Read:</Text>{' '}
				{file.permissions.group.read ? 'Yes' : 'No'}
			</Text>
			<Text color="gray" ml="8">
				<Text weight="bold">Write:</Text>{' '}
				{file.permissions.group.write ? 'Yes' : 'No'}
			</Text>
			<Text color="gray" ml="4">
				<Text weight="bold">Other:</Text>
			</Text>
			<Text color="gray" ml="8">
				<Text weight="bold">Read:</Text>{' '}
				{file.permissions.other.read ? 'Yes' : 'No'}
			</Text>
			<Text color="gray" ml="8">
				<Text weight="bold">Write:</Text>{' '}
				{file.permissions.other.write ? 'Yes' : 'No'}
			</Text>
			<Text color="gray">
				<Text weight="bold">Data:</Text>
			</Text>
			<Code color="gray" ml="4">
				<SyntaxHighlighter language="json">
					{JSON.stringify(file.data, null, 2)}
				</SyntaxHighlighter>
			</Code>
		</Flex>
	);
}
