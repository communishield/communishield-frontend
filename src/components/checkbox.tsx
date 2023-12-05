import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as styles from './checkbox.css';
import { CheckIcon } from '@radix-ui/react-icons';

export function Checkbox({ ...rest }: CheckboxPrimitive.CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      defaultChecked
      className={styles.checkboxRoot}
      {...rest}
    >
      <CheckboxPrimitive.Indicator className={styles.checkboxIndicator}>
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
