import { style } from '@vanilla-extract/css';

export const form = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'stretch',
	padding: '20px',
	backgroundColor: 'var(--mauve-1)',
	borderRadius: '4px',
	boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
});

export const field = style({
	display: 'flex',
	flexDirection: 'column',
	marginBottom: '15px',
});

export const label = style({
	display: 'block',
	marginBottom: '5px',
	color: 'var(--slate-11)',
});

export const message = style({
	display: 'flex',
	alignItems: 'center',
	width: 'fit-content',
	marginLeft: 'auto',
	padding: '5px',
	marginBottom: '5px',
	gap: '5px',
	color: 'var(--red-11)',
	fontSize: '0.75em',
	backgroundColor: 'var(--red-3)',
	borderRadius: '2px',

	'& > svg': {
		height: '1em',
		width: '1em',
	},
} as Record<string, unknown>);

export const input = style({
	padding: '10px',
	borderRadius: '4px',
	border: '1px solid var(--slate-7)',
});

export const inputWithIcon = style({
	width: '100%',
	paddingRight: '30px',
});

export const inputIcon = style({
	position: 'absolute',
	top: '50%',
	transform: 'translateY(-25%)',
	right: '10px',
	cursor: 'pointer !important',
});

export const submit = style({
	color: 'white',
	padding: '10px 20px',
	border: 'none',
	borderRadius: '4px',
	cursor: 'pointer !important',
	marginTop: '10px',
});
