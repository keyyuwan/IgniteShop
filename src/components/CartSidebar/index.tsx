import * as DialogPrimitive from '@radix-ui/react-dialog'
import Image from 'next/legacy/image'
import { X } from 'phosphor-react'
import { useShoppingCart } from 'use-shopping-cart'

import {
  CartSidebarOverlay,
  CartSidebarContent,
  CartSidebarCloseButton,
  CartSidebarTitle,
  CartSidebarProductsList,
  CartSidebarProduct,
  CartSidebarFooter,
} from './styles'

export function CartSidebar() {
  const { cartCount, formattedTotalPrice, cartDetails, removeItem } =
    useShoppingCart()

  function handleRemoveProduct(productId: string) {
    removeItem(productId)
  }

  return (
    <DialogPrimitive.Portal>
      <CartSidebarOverlay />
      <CartSidebarContent>
        <CartSidebarCloseButton>
          <X weight="bold" size={24} />
        </CartSidebarCloseButton>

        <CartSidebarTitle>Sacola de compras</CartSidebarTitle>

        <CartSidebarProductsList>
          {Object.entries(cartDetails!).map(([_, product]) => {
            return (
              <CartSidebarProduct key={product.id}>
                <div className="image-container">
                  <Image src={product.image!} alt="" width={94} height={94} />
                </div>
                <div className="product">
                  <span className="name">{product.name}</span>
                  <span className="price">{product.formattedPrice}</span>
                  <button onClick={() => handleRemoveProduct(product.id)}>
                    Remover
                  </button>
                </div>
              </CartSidebarProduct>
            )
          })}
        </CartSidebarProductsList>

        <CartSidebarFooter>
          <div className="amount">
            <span>Quantidade</span>
            <span>
              {cartCount} {cartCount! > 1 ? 'itens' : 'item'}
            </span>
          </div>
          <div className="total">
            <span>Valor total</span>
            <span>{formattedTotalPrice}</span>
          </div>
          <button>Finalizar compra</button>
        </CartSidebarFooter>
      </CartSidebarContent>
    </DialogPrimitive.Portal>
  )
}
