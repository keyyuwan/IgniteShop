import { Handbag } from 'phosphor-react'
import { CartButton, CartCounter, HeaderContainer } from './styles'

import logoImg from '@/assets/logo.svg'

export function Header() {
  const isCartEmpty = true

  return (
    <HeaderContainer>
      <img src={logoImg.src} alt="" />

      <CartButton mode="empty">
        <Handbag weight="bold" size={24} />

        {!isCartEmpty && <CartCounter>1</CartCounter>}
      </CartButton>
    </HeaderContainer>
  )
}
