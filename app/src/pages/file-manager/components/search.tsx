import { Flex, IconButton } from '@radix-ui/themes';
import {
  Form,
  FormField,
  FormInput,
  FormSubmit,
} from '../../../components/form';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Dispatch, SetStateAction } from 'react';

export type SearchProps = {
  readonly onSubmit: (path: string) => void;
  readonly path: string;
  readonly setPath: Dispatch<SetStateAction<string>>;
};

export function Search({ onSubmit, path, setPath }: SearchProps) {
  return (
    <Form onSubmit={() => onSubmit(path)}>
      <Flex align="end" gap="4">
        <FormField
          name="path"
          label="Type the path to list files"
          messages={[]}
          input={
            <FormInput>
              <input
                type="text"
                value={path}
                onChange={e => setPath(e.target.value)}
              />
            </FormInput>
          }
        />
        <FormSubmit>
          <IconButton
            style={{ marginBottom: '15px' }}
            variant="soft"
            color="green"
          >
            <MagnifyingGlassIcon />
          </IconButton>
        </FormSubmit>
      </Flex>
    </Form>
  );
}
