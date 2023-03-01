import { ButtonHTMLAttributes } from 'react'
import { Handbag } from 'phosphor-react'
import { useShoppingCart } from 'use-shopping-cart'

import { CartButtonContainer, CartCounter } from './styles'

interface CartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'green' | 'default'
}

export function CartButton({ color = 'default', ...rest }: CartButtonProps) {
  const { cartCount } = useShoppingCart()

  const isCartEmpty = cartCount === 0

  return (
    <CartButtonContainer
      mode={isCartEmpty ? 'empty' : 'full'}
      color={color}
      {...rest}
    >
      <Handbag weight="bold" size={24} />

      {!isCartEmpty && color !== 'green' && (
        <CartCounter>{cartCount}</CartCounter>
      )}
    </CartButtonContainer>
  )
}
