import { keyframes, style } from '@vanilla-extract/css';

const spin = keyframes({
	'0%': { transform: 'rotate(0deg)' },
	'100%': { transform: 'rotate(360deg)' },
});

export const container = style({
	position: 'fixed',
	inset: 0,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	height: '100%',
	backgroundColor: 'var(--black-a5)',
	zIndex: 1,
});

export const symbol = style({
	width: '48px',
	height: '48px',
	animation: `${spin} 1s linear infinite`,
});
