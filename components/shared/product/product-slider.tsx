'use client'

import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import ProductCard from './product-card'
import { IProduct } from '@/lib/db/models/product.model'

export default function ProductSlider({
  title,
  products,
  hideDetails = false,
}: {
  title?: string
  products: IProduct[]
  hideDetails?: boolean
}) {
  return (
    <div className='w-full bg-background space-x-2'>
      <h2 className='text-2xl font-bold md:text-3xl mb-2 italic'>{title}</h2>
      <Carousel
        opts={{
          align: 'start',
        }}
        className='w-full'
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.slug}
              className={
                hideDetails
                  ? 'md:basis-1/4 lg:basis-1/6 group hover:border rounded-sm hover:bg-border-300 transition-colors duration-200'
                  : 'md:basis-1/3 lg:basis-1/5 group hover:border rounded-sm hover:bg-border-300 transition-colors duration-200'
              }
            >
              <ProductCard
                hideDetails={hideDetails}
                hideAddToCart
                hideBorder
                product={product}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-0' />
        <CarouselNext className='right-0' />
      </Carousel>
    </div>
  )
}
