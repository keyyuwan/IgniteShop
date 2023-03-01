import type { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'

import { Header } from '@/components/Header'
import { globalStyles } from '@/styles/global'
import { AppContainer } from '@/styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      currency="BRL"
      cartMode="checkout-session"
      shouldPersist={false}
      stripe={process.env.STRIPE_PUBLIC_KEY!}
    >
      <AppContainer>
        <Header />
        <Component {...pageProps} />
      </AppContainer>
    </CartProvider>
  )
}
