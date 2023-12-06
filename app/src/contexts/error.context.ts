import { Dispatch, SetStateAction, createContext } from 'react';

export const ErrorContext = createContext<{
	error?: Error;
	setError: Dispatch<SetStateAction<Error | undefined>>;
}>({
	error: undefined,
	setError: () => {},
});
