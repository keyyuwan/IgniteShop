import { styled } from '@/styles'

export const CartButtonContainer = styled('button', {
  borderRadius: 6,
  padding: '0.75rem',
  cursor: 'pointer',
  border: 'none',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    mode: {
      empty: {},

      full: {
        position: 'relative',

        svg: {
          color: '$gray300',
        },
      },
    },

    color: {
      default: {
        backgroundColor: '$gray800',
        width: 48,
        height: 48,

        svg: {
          color: '$icon',
        },
      },

      green: {
        backgroundColor: '$green500',
        width: 56,
        height: 56,

        mode: {
          full: {
            svg: {
              color: '$gray300',
            },
          },
        },

        svg: {
          color: '$white',
        },

        '&:hover': {
          backgroundColor: '$green300',
          transition: 'background-color 0.2s',
        },
      },
    },
  },
})

export const CartCounter = styled('div', {
  width: 24,
  height: 24,
  borderRadius: '50%',
  backgroundColor: '$green500',
  color: '$white',
  border: '3px solid $gray900',
  fontSize: '0.875rem',
  fontWeight: 'bold',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'absolute',
  top: -7,
  left: 31,
})
