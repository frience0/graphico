'use client'

import useSettingStore from '@/hooks/use-setting-store'
import { IProduct } from '@/lib/db/models/product.model'
import { round2 } from '@/lib/utils'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Rating from './rating'

interface BestSellerProps {
  title?: string
  products: IProduct[]
  hideDetails?: boolean
}

const BestSeller = ({ title = 'Best Sellers', products }: BestSellerProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      slidesToScroll: 1,
      align: 'start',
    },
    [Autoplay({ delay: 3000, stopOnInteraction: true })]
  )

  const { getCurrency } = useSettingStore()
  const currency = getCurrency()

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  return (
    <section className='w-full 2xl:max-w-[2400px] py-8 sm:px-6'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold md:text-3xl italic'>{title}</h2>
        <div className='flex items-center space-x-2'>
          <Link href='/search'>
            <button className='text-sm font-semibold hidden sm:flex hover:text-gray-700'>
              Shop
            </button>
          </Link>
          <div className='space-x-2'>
            <button
              onClick={scrollPrev}
              className='p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors'
              aria-label='Previous slide'
            >
              <ChevronLeft className='w-5 h-5' />
            </button>
            <button
              onClick={scrollNext}
              className='p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors'
              aria-label='Next slide'
            >
              <ChevronRight className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>

      <div className='relative'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex touch-pan-y'>
            {products.map((product) => {
              const convertedPrice = round2(
                currency.convertRate * product.price
              )
              const stringValue = convertedPrice.toString()
              const [intValue, floatValue] = stringValue.includes('.')
                ? stringValue.split('.')
                : [stringValue, '']

              return (
                <div
                  key={product.slug}
                  className='flex-[0_0_100%] min-w-0 px-2 
                             sm:flex-[0_0_50%] 
                             md:flex-[0_0_33.33%] 
                             lg:flex-[0_0_25%] 
                             2xl:flex-[0_0_20%]'
                >
                  <div
                    className='flex flex-col h-full transition-all duration-300 
                                hover:border hover:border-gray-300 hover:shadow-lg 
                                rounded-sm p-3 bg-white'
                  >
                    <Link
                      href={`/product/${product.slug}`}
                      className='flex flex-col flex-grow'
                    >
                      <div className='relative w-full aspect-square max-w-[300px] mx-auto'>
                        <Image
                          src={product.images[0] || '/placeholder.png'}
                          alt={product.name}
                          fill
                          className='rounded-lg object-contain'
                          sizes='(max-width: 640px) 100vw, 
                                 (max-width: 768px) 50vw, 
                                 (max-width: 1024px) 33vw, 
                                 (max-width: 1536px) 25vw, 
                                 20vw'
                        />
                      </div>
                      <div className='flex flex-col flex-grow mt-4'>
                        <h3 className='text-base font-semibold md:text-lg text-gray-800'>
                          {product.brand}
                        </h3>
                        <div
                          className='text-sm text-gray-600 overflow-hidden text-ellipsis'
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {product.name}
                        </div>
                      </div>
                    </Link>
                    <div className='mt-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2'>
                      <div className='text-2xl font-bold text-gray-900'>
                        <span className='text-xs align-super text-gray-700'>
                          {currency.symbol}
                        </span>
                        {intValue}
                        {floatValue && (
                          <span className='text-sm align-super text-gray-700'>
                            .{floatValue}
                          </span>
                        )}
                      </div>
                      <div className='flex items-center gap-2'>
                        <Rating rating={product.avgRating} />
                        <span className='text-sm text-gray-500 overflow-hidden'>
                          ({product.numReviews}k)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BestSeller
