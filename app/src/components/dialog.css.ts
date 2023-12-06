import { style } from '@vanilla-extract/css';

export const overlay = style({
	backgroundColor: 'var(--black-a5)',
	position: 'fixed',
	inset: 0,
	zIndex: 1,
});

export const content = style({
	backgroundColor: 'white',
	boxShadow: '0 2px 10px var(--black-a7)',
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '400px',
	padding: '20px',
	borderRadius: '8px',
	zIndex: 1,
});
