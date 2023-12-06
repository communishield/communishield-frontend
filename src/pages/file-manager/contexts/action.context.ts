import { Dispatch, SetStateAction, createContext } from 'react';

export const ActionContext = createContext<{
	actionParams:
		| {
				action: 'create' | 'read' | 'update' | 'delete';
				path: string;
				type: 'file' | 'directory';
		  }
		| undefined;
	setActionParams: Dispatch<
		SetStateAction<
			| {
					action: 'create' | 'read' | 'update' | 'delete';
					path: string;
					type: 'file' | 'directory';
			  }
			| undefined
		>
	>;
}>({
	actionParams: undefined,
	setActionParams: () => {},
});
