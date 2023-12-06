import { style } from '@vanilla-extract/css';

export const avatarButton = style({
  cursor: 'pointer',
  backgroundColor: 'transparent',
  width: 'fit-content',
  height: 'fit-content',
  margin: 0,
  padding: 0,
  border: 'none',
  userSelect: 'none',
});

export const dropdownContent = style({
  minWidth: '10rem',
  backgroundColor: 'var(--green-1)',
  boxShadow: '0 4px 8px var(--black-a1)',
  padding: '8px 0',
});

export const dropdownItem = style({
  display: 'block',
  fontSize: '1.125em',
  padding: '8px 16px',
  color: 'var(--green-11)',
  textDecoration: 'none',
  userSelect: 'none',
  outline: 'none',

  '&[data-highlighted]': {
    backgroundColor: 'var(--green-9)',
    color: 'var(--green-1)',
  },
} as Record<string, unknown>);

export const dropdownSeparator = style({
  height: '1px',
  backgroundColor: 'var(--green-9)',
  margin: '4px 0',
});
