'use client'

import * as React from 'react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { ICarousel } from '@/types'

export function HomeCarousel({ items }: { items: ICarousel[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )
  const t = useTranslations('Home')

  return (
    <div className='relative group'>
      <Carousel
        dir='ltr'
        plugins={[plugin.current]}
        className='w-full mx-auto'
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.title}>
              <Link href={item.url}>
                <div className='flex aspect-[16/6] items-center justify-center p-6 relative -m-1'>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className='object-cover'
                    priority
                  />
                  <div className='absolute w-1/3 left-16 md:left-32 top-1/2 transform -translate-y-1/2'>
                    <h2
                      className={cn(
                        'text-lg sm:text-xl md:text-4xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-800'
                      )}
                    >
                      {t(`${item.title}`)}
                    </h2>
                    <div className='hidden md:flex justify-center w-30 bg-gray-200 py-2 font-semibold rounded-full hover:bg-transparent duration-300 relative group/button'>
                      {/* bg-white text-black hover:bg-gray-200 font-semibold */}
                      <button
                        type='button'
                        className='duration-500 group-hover/button:tracking-widest cursor-pointer relative after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 group-hover/button:after:w-full group-hover/button:after:left-0'
                      >
                        {t(`${item.buttonCaption}`)}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className='left-0 md:left-0 -translate-x-full group-hover:translate-x-10 
          transition-transform duration-300 opacity-0 group-hover:opacity-100'
        />
        <CarouselNext
          className='right-0 md:right-0 translate-x-full group-hover:-translate-x-10 
          transition-transform duration-300 opacity-0 group-hover:opacity-100'
        />
      </Carousel>
    </div>
  )
}
