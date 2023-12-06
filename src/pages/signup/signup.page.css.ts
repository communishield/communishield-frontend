import { style } from '@vanilla-extract/css';

export const container = style({
  flex: 1,
  minWidth: '550px',
  width: '85%',
  marginLeft: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '50px',
});

export const text = style({
  gridArea: 'text',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  '& > h2': {
    color: 'var(--slate-12)',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '15px',
  },

  '& > p': {
    color: 'var(--slate-11)',
    fontSize: '16px',
    marginBottom: '15px',
  },
} as Record<string, unknown>);

export const form = style({
  gridArea: 'form',
});

export const formContainer = style({
  minWidth: '325px',
  maxWidth: '500px',
  maxHeight: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '20px',
  backgroundColor: 'var(--mauve-1)',
  borderRadius: '4px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
});

export const formField = style({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '15px',
});

export const checkboxField = style({
  flexDirection: 'row',
  gap: '5px',
  alignItems: 'center',
});

export const label = style({
  display: 'block',
  marginBottom: '5px',
  color: 'var(--slate-11)',
});

export const errorText = style({
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
});

export const inputWithIconContainer = style({
  display: 'flex',
  position: 'relative',
  alignItems: 'stretch',
});

export const input = style({
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid var(--slate-7)',

  ':focus': {
    outline: 'none',
    borderColor: 'var(--mauve-7)',
  },
  '&[data-invalid]': {
    borderColor: 'var(--red-7)',
  },
  '&[data-valid]': {
    borderColor: 'var(--green-7)',
  },
} as Record<string, unknown>);

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

export const submitButton = style({
  backgroundColor: 'var(--green-9)',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '10px',
  ':hover': {
    backgroundColor: 'var(--green-10)',
  },
  ':disabled': {
    backgroundColor: 'var(--slate-5)',
    cursor: 'not-allowed',
  },
});
