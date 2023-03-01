import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Head from 'next/head'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'

import { stripe } from '@/lib/stripe'
import {
  ImageContainer,
  SuccessContainer,
  Images,
} from '@/styles/pages/success'

import logoImg from '@/assets/logo.svg'

interface SuccessProps {
  customerName: string
  products: {
    id: string
    name: string
    imageUrl: string
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  const { clearCart } = useShoppingCart()

  const productsCount = products.length

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <header>
          <img src={logoImg.src} alt="" />
        </header>

        <Images>
          {products.map((product) => (
            <ImageContainer key={product.id}>
              <Image src={product.imageUrl} alt="" width={120} height={110} />
            </ImageContainer>
          ))}
        </Images>

        <h1>Compra efetuada!</h1>

        {productsCount > 1 ? (
          <p>
            Uhuul <strong>{customerName}</strong>, sua compra de {productsCount}{' '}
            camisetas já está a caminho da sua casa.
          </p>
        ) : (
          <p>
            Uhuul <strong>{customerName}</strong>, sua{' '}
            <strong>{products[0].name}</strong> já está a caminho da sua casa.
          </p>
        )}

        <Link href="/">
          <span onClick={clearCart}>Voltar ao catálogo</span>
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name
  const products = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
    }
  })

  return {
    props: {
      customerName,
      products,
    },
  }
}
