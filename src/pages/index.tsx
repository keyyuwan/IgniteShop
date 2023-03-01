import { MouseEvent } from 'react'
import { GetStaticProps } from 'next'
import Image from 'next/legacy/image'
import Link from 'next/link'
import Head from 'next/head'
import Stripe from 'stripe'
import { useKeenSlider } from 'keen-slider/react'
import { useShoppingCart } from 'use-shopping-cart'

import { stripe } from '@/lib/stripe'
import { CartButton } from '@/components/CartButton'
import { HomeContainer, Product, ProductFooter } from '@/styles/pages/home'

import 'keen-slider/keen-slider.min.css'

interface IProduct {
  id: string
  name: string
  description: string
  imageUrl: string
  price: number
  priceFormatted: string
  defaultPriceId: string
}

interface HomeProps {
  products: IProduct[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  const { addItem } = useShoppingCart()

  function handleAddProductToCart(event: MouseEvent, product: IProduct) {
    event.preventDefault() // prevent to going to link href

    const { name, id, imageUrl, price, description, defaultPriceId } = product

    addItem({
      id,
      name,
      description,
      price,
      price_id: defaultPriceId,
      image: imageUrl,
      currency: 'BRL',
    })
  }

  return (
    <>
      <Head>
        <title>Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            prefetch={false}
          >
            <Product className="keen-slider__slide">
              <Image
                src={product.imageUrl}
                width={520}
                height={480}
                alt="Camiseta"
              />

              <ProductFooter>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.priceFormatted}</span>
                </div>

                <CartButton
                  color="green"
                  onClick={(event) => handleAddProductToCart(event, product)}
                />
              </ProductFooter>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.images[0],
      price: price.unit_amount,
      priceFormatted: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
