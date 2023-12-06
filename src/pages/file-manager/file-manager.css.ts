import { style } from '@vanilla-extract/css';

export const container = style({
	flex: 1,
	width: '100%',
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	gridTemplateRows: 'auto 1fr',
	gridTemplateAreas: `
    "search ."
    "file-manager file-manager"
  `,
});

export const search = style({
	gridArea: 'search',
});

export const fileManager = style({
	gridArea: 'file-manager',
});
