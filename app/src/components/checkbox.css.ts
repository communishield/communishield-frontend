import { style } from '@vanilla-extract/css';

export const checkboxRoot = style({
	all: 'unset',
	backgroundColor: 'white',
	width: '20px',
	height: '20px',
	borderRadius: '4px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	boxShadow: '0 2px 10px var(--black-a5)',
	':hover': {
		backgroundColor: 'var(--green-3)',
	},
	':focus': {
		boxShadow: '0 0 0 2px var(--green-a7)',
	},
});

export const checkboxIndicator = style({
	color: 'var(--green-11)',
	lineHeight: 0.25,
});
