import { useState } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import Image from 'next/legacy/image'
import { X } from 'phosphor-react'
import { useShoppingCart } from 'use-shopping-cart'
import axios from 'axios'

import {
  CartSidebarOverlay,
  CartSidebarContent,
  CartSidebarCloseButton,
  CartSidebarTitle,
  CartSidebarProductsList,
  CartSidebarProduct,
  CartSidebarFooter,
  CartSidebarEmptyText,
} from './styles'

export function CartSidebar() {
  const { cartCount, formattedTotalPrice, cartDetails, removeItem } =
    useShoppingCart()

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  function handleRemoveProduct(productId: string) {
    removeItem(productId)
  }

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const productsFormatted = Object.entries(cartDetails!).map(
        ([_, product]) => {
          return {
            price: product.price_id as string,
            quantity: 1,
          }
        },
      )

      const response = await axios.post('/api/checkout', {
        products: JSON.stringify(productsFormatted),
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      // Conectar com uma ferramenta de observabilidade (Datadog, Sentry)

      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout')
      console.log(err)
    }
  }

  const isCartEmpty = cartCount === 0

  return (
    <DialogPrimitive.Portal>
      <CartSidebarOverlay />
      <CartSidebarContent>
        <CartSidebarCloseButton>
          <X weight="bold" size={24} />
        </CartSidebarCloseButton>

        <CartSidebarTitle>Sacola de compras</CartSidebarTitle>

        {!isCartEmpty ? (
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
        ) : (
          <CartSidebarEmptyText>
            Adicione produtos ao seu carrinho para vê-los aqui
          </CartSidebarEmptyText>
        )}

        {!isCartEmpty && (
          <CartSidebarFooter>
            <div className="amount">
              <span>Quantidade</span>
              <span>
                {cartCount} {cartCount === 1 ? 'item' : 'itens'}
              </span>
            </div>
            <div className="total">
              <span>Valor total</span>
              <span>{formattedTotalPrice}</span>
            </div>
            <button
              disabled={isCreatingCheckoutSession}
              onClick={handleBuyProduct}
            >
              Finalizar compra
            </button>
          </CartSidebarFooter>
        )}
      </CartSidebarContent>
    </DialogPrimitive.Portal>
  )
}
