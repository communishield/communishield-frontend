import { Dispatch, SetStateAction, createContext } from 'react';
import { User } from '../models/user';

export const UserContext = createContext<{
	user?: User;
	setUser: Dispatch<SetStateAction<User | undefined>>;
}>({
	user: undefined,
	setUser: () => {},
});
