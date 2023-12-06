import * as styles from './form.css';
import * as FormPrimitive from '@radix-ui/react-form';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { Button, Flex, IconButton } from '@radix-ui/themes';
import { FormEvent, PropsWithChildren, ReactNode } from 'react';

export type FormProps = {
	readonly onSubmit: (e: FormEvent) => void;
} & PropsWithChildren;

export type FormInputFieldProps = {
	readonly name: string;
	readonly label: ReactNode;
	readonly messages: ReactNode[];
	readonly input: ReactNode;
};

export type FormMessageProps = {
	readonly level: 'error';
	readonly message: ReactNode;
	readonly match: Parameters<typeof FormPrimitive.Message>[0]['match'];
};

export type FormInputWithIconProps = {
	readonly icon: ReactNode;
} & PropsWithChildren;

export type FormSelectInputProps = {
	readonly options: Array<{
		readonly label: string;
		readonly value: string;
	}>;
};

export type FormInputIconProps = {
	readonly ariaLabel: string;
	readonly onClick: () => void;
} & PropsWithChildren;

export type FormSubmitButtonProps = {
	readonly isDisabled?: boolean;
	readonly label: ReactNode;
};

const messageLevelToIcon = {
	error: <CrossCircledIcon />,
};

export function Form({ onSubmit, children }: FormProps) {
	return (
		<FormPrimitive.Root
			className={styles.form}
			onSubmit={e => {
				e.preventDefault();
				onSubmit(e);
			}}
		>
			{children}
		</FormPrimitive.Root>
	);
}

export function FormField({
	name,
	label,
	messages,
	input,
}: FormInputFieldProps) {
	return (
		<FormPrimitive.Field
			name={name}
			className={styles.field}
			onInvalid={e => {
				e.preventDefault();
			}}
		>
			<FormPrimitive.Label className={styles.label}>
				{label}
			</FormPrimitive.Label>
			{messages}
			{input}
		</FormPrimitive.Field>
	);
}

export function FormMessage({ level, message, match }: FormMessageProps) {
	return (
		<FormPrimitive.Message match={match} className={styles.message}>
			{messageLevelToIcon[level]}
			{message}
		</FormPrimitive.Message>
	);
}

export function FormInput({ children }: PropsWithChildren) {
	return (
		<FormPrimitive.Control asChild className={styles.input}>
			{children}
		</FormPrimitive.Control>
	);
}

export function FormInputWithIcon({ icon, children }: FormInputWithIconProps) {
	return (
		<Flex position="relative">
			<FormPrimitive.Control
				asChild
				className={`${styles.input} ${styles.inputWithIcon}`}
			>
				{children}
			</FormPrimitive.Control>
			{icon}
		</Flex>
	);
}

export function FormInputIcon({
	ariaLabel,
	onClick,
	children,
}: FormInputIconProps) {
	return (
		<IconButton
			aria-label={ariaLabel}
			className={styles.inputIcon}
			type="button"
			variant="ghost"
			color="green"
			onClick={onClick}
		>
			{children}
		</IconButton>
	);
}
export function FormSubmit({ children }: PropsWithChildren) {
	return (
		<FormPrimitive.Submit asChild className={styles.submit}>
			{children}
		</FormPrimitive.Submit>
	);
}

export function FormSubmitButton({ isDisabled, label }: FormSubmitButtonProps) {
	return (
		<FormPrimitive.Submit asChild className={styles.submit}>
			<Button disabled={isDisabled} color="green">
				{label}
			</Button>
		</FormPrimitive.Submit>
	);
}
