import { Permission } from './permission';

export type File = {
	path: string;
	data: Record<string, unknown>;
	owner: string;
	group: string;
	permissions: Permission;
};
