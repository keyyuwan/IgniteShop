import * as DialogPrimitive from '@radix-ui/react-dialog'
import { useShoppingCart } from 'use-shopping-cart'

import { CartButton } from '../CartButton'
import { CartSidebar } from '../CartSidebar'
import { HeaderContainer } from './styles'

import logoImg from '@/assets/logo.svg'

export function Header() {
  const { cartCount } = useShoppingCart()

  const isCartEmpty = cartCount === 0

  return (
    <HeaderContainer>
      <img src={logoImg.src} alt="" />

      <DialogPrimitive.Root>
        <DialogPrimitive.Trigger asChild disabled={isCartEmpty}>
          <CartButton />
        </DialogPrimitive.Trigger>

        <CartSidebar />
      </DialogPrimitive.Root>
    </HeaderContainer>
  )
}
