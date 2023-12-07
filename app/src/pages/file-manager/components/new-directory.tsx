import { Flex } from '@radix-ui/themes';
import { File } from '../../../third-parties/communishield/types/file';
import { Dispatch, SetStateAction } from 'react';
import {
  FormField,
  FormInput,
  FormMessage,
  FormSubmitButton,
} from '../../../components/form';
import { Checkbox } from '../../../components/checkbox';
import { joinUrl } from '../../../utils/join-url';

export type NewDirectoryProps = {
  readonly path: string;
  readonly formData: { type: 'file'; data: string } & Omit<
    File,
    'path' | 'data'
  >;
  readonly setFormData: Dispatch<
    SetStateAction<{ type: 'file'; data: string } & Omit<File, 'path' | 'data'>>
  >;
};

export function NewDirectory({
  path,
  formData,
  setFormData,
}: NewDirectoryProps) {
  return (
    <>
      <FormField
        label="Owner"
        name="owner"
        messages={[
          <FormMessage
            key={joinUrl(path, 'fileEditOwner')}
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
            key={joinUrl(path, 'fileEditGroup')}
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
    </>
  );
}
