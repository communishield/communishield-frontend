/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, ScrollArea, Text } from '@radix-ui/themes';
import { File } from '../../../third-parties/communishield/types/file';
import { useContext, useState } from 'react';
import {
	Form,
	FormField,
	FormInput,
	FormMessage,
} from '../../../components/form';
import { Directory } from '../../../third-parties/communishield/types/directory';
import { UserContext } from '../../../contexts/user.context';
import { NewFile } from './new-file';
import { joinUrl } from '../../../utils/join-url';
import { LoadingContext } from '../../../contexts/loading.context';
import { ErrorContext } from '../../../contexts/error.context';
import { Communishield } from '../../../third-parties/communishield/client';
import { DialogContext } from '../../../contexts/dialog.context';
import { NewDirectory } from './new-directory';

export type NewEntityProps = {
	readonly directory: Directory;
	readonly onFinish: () => void;
};

export function NewEntity({ directory, onFinish }: NewEntityProps) {
	const { user } = useContext(UserContext);
	const { setLoading } = useContext(LoadingContext);
	const { setError } = useContext(ErrorContext);
	const { setDialogProps } = useContext(DialogContext);
	const [formData, setFormData] = useState<
		{ type: 'file' | 'directory' } & (
			| ({ data: string } & Omit<File, 'data'>)
			| Omit<Directory, 'contents'>
		)
	>({
		path: joinUrl(directory.path, 'new'),
		type: 'file',
		owner: user!.username,
		group: user!.groups[0] ?? 'admin',
		permissions: {
			owner: {
				read: true,
				write: true,
			},
			group: {
				read: true,
				write: false,
			},
			other: {
				read: false,
				write: false,
			},
		},
		data: '{}',
	});

	const handleSubmit = async () => {
		setLoading(true);
		if (formData.type === 'file') {
			try {
				const data = JSON.parse((formData as any).data);
				await Communishield.createFile({
					path: formData.path,
					owner: formData.owner,
					group: formData.group,
					permissions: formData.permissions,
					data,
				});
			} catch (error) {
				setError(error as Error);
			} finally {
				onFinish();
				setDialogProps(undefined);
				setLoading(false);
			}
		} else if (formData.type === 'directory') {
			try {
				await Communishield.createDirectory({
					path: formData.path,
					owner: formData.owner,
					group: formData.group,
					permissions: formData.permissions,
				});
			} catch (error) {
				setError(error as Error);
			} finally {
				onFinish();
				setDialogProps(undefined);
				setLoading(false);
			}
		} else {
			throw new Error('Invalid type');
		}
	};

	return (
		<ScrollArea style={{ maxHeight: 'calc(100vh - 200px)' }}>
			<Flex direction="column" gap="1">
				<Text color="gray">
					<Text weight="bold">Parent directory path:</Text> {directory.path}
				</Text>
				<Form onSubmit={handleSubmit}>
					<FormField
						name="type"
						label="Type"
						messages={[]}
						input={
							<select
								style={{
									padding: '10px',
									borderRadius: '4px',
									border: '1px solid var(--slate-7)',
								}}
								value={formData.type}
								onChange={e => {
									setFormData({
										...formData,
										type: e.target.value as 'file' | 'directory',
									});
								}}
							>
								<option value="file">File</option>
								<option value="directory">Directory</option>
							</select>
						}
					/>
					<FormField
						label="Path"
						name="path"
						messages={[
							<FormMessage
								key="entityPath"
								level="error"
								message="This field is required."
								match="valueMissing"
							/>,
							<FormMessage
								key="entityPathParentDirValidate"
								level="error"
								message={`Parent directory must be ${directory.path}.`}
								match={value =>
									!value.startsWith(directory.path) || value === directory.path
								}
							/>,
						]}
						input={
							<FormInput>
								<input
									type="text"
									value={formData.path}
									onChange={e =>
										setFormData({ ...formData, path: e.target.value })
									}
								/>
							</FormInput>
						}
					/>
					{formData.type === 'file' ? (
						<NewFile
							formData={formData as any}
							setFormData={setFormData as any}
						/>
					) : (
						<NewDirectory
							formData={formData as any}
							setFormData={setFormData as any}
						/>
					)}
				</Form>
			</Flex>
		</ScrollArea>
	);
}
