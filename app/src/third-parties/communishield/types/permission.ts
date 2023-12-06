export type Permission = {
	owner: {
		read: boolean;
		write: boolean;
	};
	group: {
		read: boolean;
		write: boolean;
	};
	other: {
		read: boolean;
		write: boolean;
	};
};
