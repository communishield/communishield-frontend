import { Flex, ScrollArea, Text, TextArea } from '@radix-ui/themes';
import { File } from '../../../third-parties/communishield/types/file';
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

export type FileEditProps = {
	readonly file: File;
};

export function FileEdit({ file }: FileEditProps) {
	const { setLoading } = useContext(LoadingContext);
	const { setError } = useContext(ErrorContext);
	const [formData, setFormData] = useState<
		{ data: string } & Omit<File, 'path' | 'data'>
	>({
		owner: file.owner,
		group: file.group,
		permissions: file.permissions,
		data: JSON.stringify(file.data, null, 2),
	});

	const handleSubmit = async () => {
		setLoading(true);
		const data = JSON.parse(formData.data);

		try {
			await Communishield.updateFile(file.path, {
				owner: formData.owner,
				group: formData.group,
				permissions: formData.permissions,
				data,
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
					<Text weight="bold">Path:</Text> {file.path}
				</Text>
				<Form onSubmit={handleSubmit}>
					<FormField
						label="Owner"
						name="owner"
						messages={[
							<FormMessage
								key="fileEditOwner"
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
								key="fileEditGroup"
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
					<FormField
						label="Data"
						name="data"
						messages={[
							<FormMessage
								key="fileEditData"
								level="error"
								message="This field is required."
								match="valueMissing"
							/>,
							<FormMessage
								key="fileEditDataJsonValidation"
								level="error"
								message="Invalid JSON."
								match={(value: string) => {
									try {
										JSON.parse(value);
										return false;
									} catch (error) {
										return true;
									}
								}}
							/>,
						]}
						input={
							<FormInput>
								<TextArea
									value={formData.data}
									rows={10}
									onChange={e =>
										setFormData({ ...formData, data: e.target.value })
									}
								/>
							</FormInput>
						}
					/>
					<FormSubmitButton label="Save" />
				</Form>
			</Flex>
		</ScrollArea>
	);
}
