import { Dispatch, SetStateAction, createContext } from 'react';

export const UserContext = createContext<{
  user?: { token: string };
  setUser: Dispatch<SetStateAction<{ token: string } | undefined>>;
}>({
  user: undefined,
  setUser: () => { },
});
