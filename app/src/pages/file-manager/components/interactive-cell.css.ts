import { style } from '@vanilla-extract/css';

export const interactiveCell = style({
	cursor: 'pointer',

	':hover': {
		textDecoration: 'underline',
	},

	'&[color="red"]': {
		color: 'var(--red-11)',
	},
	'&[color="red"]:hover': {
		backgroundColor: 'var(--red-3)',
	},

	'&[color="green"]': {
		color: 'var(--green-11)',
	},
	'&[color="green"]:hover': {
		backgroundColor: 'var(--green-3)',
	},

	'&[color="blue"]': {
		color: 'var(--blue-11)',
	},
	'&[color="blue"]:hover': {
		backgroundColor: 'var(--blue-3)',
	},
} as Record<string, unknown>);
