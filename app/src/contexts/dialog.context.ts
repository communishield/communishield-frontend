import { Dispatch, SetStateAction, createContext } from 'react';
import { DialogProps } from '../components/dialog';

export const DialogContext = createContext<{
	dialogProps: DialogProps | undefined;
	setDialogProps: Dispatch<SetStateAction<DialogProps | undefined>>;
}>({
	dialogProps: undefined,
	setDialogProps: () => {},
});
