import { styled } from '@/styles'

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const CartButton = styled('button', {
  width: 48,
  height: 48,
  borderRadius: 6,
  padding: '0.75rem',
  cursor: 'pointer',
  background: '$gray800',
  border: 'none',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  svg: {
    color: '$icon',
  },

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
