import { style } from '@vanilla-extract/css';

export const rootLayoutStyle = style({
	display: 'flex',
	flexDirection: 'column',
	minHeight: '100vh',
	width: '100vw',
	overflowX: 'hidden',
});
