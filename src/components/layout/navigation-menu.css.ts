import { style } from '@vanilla-extract/css';

export const link = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  textDecoration: 'none',
  color: 'var(--mauve-12)',
  fontSize: '1.25em',

  '&:hover': {
    color: 'var(--mauve-11)',
  },
} as Record<string, unknown>);
