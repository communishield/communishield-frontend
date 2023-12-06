import { Flex, ScrollArea, Text } from '@radix-ui/themes';
import { Directory } from '../../../third-parties/communishield/types/directory';
import { useContext, useState } from 'react';
import {
	Form,
	FormField,
	FormInput,
	FormMessage,
	FormSubmitButton,
} from '../../../components/form';
import { Checkbox } from '../../../components/checkbox';
import { Communishield } from '../../../third-parties/communishield/client';
import { LoadingContext } from '../../../contexts/loading.context';
import { ErrorContext } from '../../../contexts/error.context';

export type DirectoryEditProps = {
	readonly directory: Directory;
};

export function DirectoryEdit({ directory }: DirectoryEditProps) {
	const { setLoading } = useContext(LoadingContext);
	const { setError } = useContext(ErrorContext);
	const [formData, setFormData] = useState<
		Omit<Directory, 'path' | 'contents'>
	>({
		owner: directory.owner,
		group: directory.group,
		permissions: directory.permissions,
	});

	const handleSubmit = async () => {
		setLoading(true);

		try {
			console.log(directory.path);
			await Communishield.updateDirectory(directory.path, {
				owner: formData.owner,
				group: formData.group,
				permissions: formData.permissions,
			});
		} catch (error) {
			setError(error as Error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<ScrollArea style={{ maxHeight: 'calc(100vh - 200px)' }}>
			<Flex direction="column" gap="1">
				<Text color="gray">
					<Text weight="bold">Path:</Text> {directory.path}
				</Text>
				<Form onSubmit={handleSubmit}>
					<FormField
						label="Owner"
						name="owner"
						messages={[
							<FormMessage
								key="directoryEditOwner"
								level="error"
								message="This field is required."
								match="valueMissing"
							/>,
						]}
						input={
							<FormInput>
								<input
									type="text"
									value={formData.owner}
									onChange={e =>
										setFormData({ ...formData, owner: e.target.value })
									}
								/>
							</FormInput>
						}
					/>
					<FormField
						label="Group"
						name="group"
						messages={[
							<FormMessage
								key="directoryEditGroup"
								level="error"
								message="This field is required."
								match="valueMissing"
							/>,
						]}
						input={
							<FormInput>
								<input
									type="text"
									value={formData.group}
									onChange={e =>
										setFormData({ ...formData, group: e.target.value })
									}
								/>
							</FormInput>
						}
					/>
					<Flex>
						<FormField
							label="Owner Read Permission"
							name="group"
							messages={[]}
							input={
								<Checkbox
									checked={formData.permissions.owner.read}
									onCheckedChange={(checked: boolean) => {
										setFormData({
											...formData,
											permissions: {
												...formData.permissions,
												owner: { ...formData.permissions.owner, read: checked },
											},
										});
									}}
								/>
							}
						/>
						<FormField
							label="Owner Write Permission"
							name="group"
							messages={[]}
							input={
								<Checkbox
									checked={formData.permissions.owner.write}
									onCheckedChange={(checked: boolean) => {
										setFormData({
											...formData,
											permissions: {
												...formData.permissions,
												owner: {
													...formData.permissions.owner,
													write: checked,
												},
											},
										});
									}}
								/>
							}
						/>
					</Flex>
					<Flex>
						<FormField
							label="Group Read Permission"
							name="group"
							messages={[]}
							input={
								<Checkbox
									checked={formData.permissions.group.read}
									onCheckedChange={(checked: boolean) => {
										setFormData({
											...formData,
											permissions: {
												...formData.permissions,
												group: { ...formData.permissions.group, read: checked },
											},
										});
									}}
								/>
							}
						/>
						<FormField
							label="Group Write Permission"
							name="group"
							messages={[]}
							input={
								<Checkbox
									checked={formData.permissions.group.write}
									onCheckedChange={(checked: boolean) => {
										setFormData({
											...formData,
											permissions: {
												...formData.permissions,
												group: {
													...formData.permissions.group,
													write: checked,
												},
											},
										});
									}}
								/>
							}
						/>
					</Flex>
					<Flex>
						<FormField
							label="Other Read Permission"
							name="other"
							messages={[]}
							input={
								<Checkbox
									checked={formData.permissions.other.read}
									onCheckedChange={(checked: boolean) => {
										setFormData({
											...formData,
											permissions: {
												...formData.permissions,
												other: { ...formData.permissions.other, read: checked },
											},
										});
									}}
								/>
							}
						/>
						<FormField
							label="Other Write Permission"
							name="other"
							messages={[]}
							input={
								<Checkbox
									checked={formData.permissions.other.write}
									onCheckedChange={(checked: boolean) => {
										setFormData({
											...formData,
											permissions: {
												...formData.permissions,
												other: {
													...formData.permissions.other,
													write: checked,
												},
											},
										});
									}}
								/>
							}
						/>
					</Flex>
					<FormSubmitButton label="Save" />
				</Form>
			</Flex>
		</ScrollArea>
	);
}
