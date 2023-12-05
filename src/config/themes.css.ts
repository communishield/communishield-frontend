import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
	color: {
		background: '#FBFDFC',
		primary: '#000000',
	},
	font: {
		family: 'Inter, sans-serif',
		size: {
			title: '64px',
		},
		weight: {
			bold: '700',
		},
	},
	spacing: {
		small: '8px',
		medium: '16px',
		large: '32px',
	},
});
