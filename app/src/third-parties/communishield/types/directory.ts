import { Permission } from './permission';

export type Directory = {
	path: string;
	contents: DirectoryContent[];
	owner: string;
	group: string;
	permissions: Permission;
};

export type DirectoryContent = {
	name: string;
	type: 'file' | 'directory';
	owner: string;
	group: string;
	permissions: Permission;
};
