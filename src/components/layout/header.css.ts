import { style } from '@vanilla-extract/css';
import { vars } from '../../config/themes.css';

export const headerContainer = style({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	padding: '32px',
	gap: vars.spacing.medium,
	width: '100%',
});

export const imageStyle = style({
	width: '96px',
	height: '96px',
});

export const titleStyle = style({
	fontFamily: vars.font.family,
	fontStyle: 'normal',
	fontWeight: vars.font.weight.bold,
	fontSize: vars.font.size.title,
	color: vars.color.primary,
});
