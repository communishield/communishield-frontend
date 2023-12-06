import { Dispatch, SetStateAction, createContext } from 'react';

export const LoadingContext = createContext<{
	loading: boolean;
	setLoading: Dispatch<SetStateAction<boolean>>;
}>({
	loading: false,
	setLoading: () => {},
});
