import { styled } from '@/styles'

import * as DialogPrimitive from '@radix-ui/react-dialog'

export const CartSidebarOverlay = styled(DialogPrimitive.Overlay, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
})

export const CartSidebarContent = styled(DialogPrimitive.Content, {
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  maxWidth: 480,
  width: '100%',
  padding: '4.5rem 3rem 3rem',

  backgroundColor: '$gray800',

  willChange: 'transform',
  overflow: 'auto',

  display: 'flex',
  flexDirection: 'column',
})

export const CartSidebarCloseButton = styled(DialogPrimitive.Close, {
  position: 'absolute',
  top: 24,
  right: 24,

  background: 'none',
  border: 0,
  lineHeight: 0,
  cursor: 'pointer',

  svg: {
    color: '$icon',
  },
})

export const CartSidebarTitle = styled(DialogPrimitive.Title, {
  fontWeight: 'bold',
  fontSize: '$lg',
  color: '$gray100',
})

export const CartSidebarProductsList = styled('div', {
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
})

export const CartSidebarProduct = styled('div', {
  height: 93,

  display: 'flex',
  alignItems: 'center',
  gap: 20,

  'div.image-container': {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
      objectFit: 'cover',
    },
  },

  'div.product': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',

    'span.name': {
      fontSize: '$md',
      color: '$gray300',
    },

    'span.price': {
      display: 'block',
      marginTop: 2,
      fontWeight: 'bold',
      fontSize: '$md',
      color: '$gray100',
    },

    button: {
      marginTop: 8,
      background: 'none',
      border: 0,
      cursor: 'pointer',
      color: '$green500',
      fontWeight: 'bold',

      '&:hover': {
        color: '$green300',
        transition: 'color 0.2s',
      },
    },
  },
})

export const CartSidebarFooter = styled('footer', {
  marginTop: 198,

  'div.amount, div.total': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '$gray100',
  },

  'div.amount': {
    'span:last-child': {
      fontSize: '$md',
    },
  },

  'div.total': {
    marginTop: 8,
    fontWeight: 'bold',

    'span:first-child': {
      fontSize: '$md',
    },

    'span:last-child': {
      fontSize: '$xl',
    },
  },

  button: {
    marginTop: 56,
    width: '100%',
    height: 69,
    cursor: 'pointer',
    border: 0,
    borderRadius: 8,

    background: '$green500',
    color: '$white',

    fontWeight: 'bold',
    fontSize: '$md',

    '&:not(:disabled):hover': {
      background: '$green300',
      transition: 'background-color 0.2s',
    },

    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
})

export const CartSidebarEmptyText = styled('p', {
  marginTop: '3rem',
  fontSize: '$md',
  fontWeight: 'bold',
})
