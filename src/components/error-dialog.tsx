import * as styles from './error-dialog.css';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ApplicationError } from '../errors/application.error';
import { UnexpectedError } from '../errors/unexpected.error';
import { Button, Flex, Heading, Text } from '@radix-ui/themes';

export type DialogProps = {
  readonly isOpen: boolean;
  readonly error: Error;
  readonly onDismiss: () => void;
};

export function Dialog({ isOpen, error, onDismiss }: DialogProps) {
  const errorMessage =
    error instanceof ApplicationError
      ? error.message
      : new UnexpectedError().message;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onDismiss}>
      <DialogPrimitive.Overlay className={styles.overlay} />
      <DialogPrimitive.Content className={styles.content}>
        <DialogPrimitive.Title asChild>
          <Heading as="h2" color="red" mb="4">
            Error
          </Heading>
        </DialogPrimitive.Title>
        <DialogPrimitive.Description>
          <Text color="gray">{errorMessage}</Text>
        </DialogPrimitive.Description>
        <Flex mt="4" justify="end">
          <DialogPrimitive.Close asChild>
            <Button color="red" style={{ cursor: 'pointer' }}>
              Close
            </Button>
          </DialogPrimitive.Close>
        </Flex>
      </DialogPrimitive.Content>
    </DialogPrimitive.Root>
  );
}
