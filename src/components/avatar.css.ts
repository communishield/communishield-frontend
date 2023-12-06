import { keyframes, style } from '@vanilla-extract/css';

const pulseAnimation = keyframes({
  '0%': { boxShadow: '0 0 2px 0 var(--black-a7)' },
  '50%': { boxShadow: '0 0 4px 0 var(--black-a7)' },
  '100%': { boxShadow: '0 0 2px 0 var(--black-a7)' },
});

export const avatarContainer = style({
  backgroundColor: 'var(--green-2)',
  borderRadius: '50%',
  boxShadow: '0 0 2px 0 var(--black-a7)',

  '&:hover': {
    animation: `${pulseAnimation} 2s infinite`,
  },

  '& > img': {
    borderRadius: '50%',
  },
} as Record<string, unknown>);
