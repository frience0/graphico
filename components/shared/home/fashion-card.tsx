'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

// Define the type for each category
interface Category {
  name: string
  image: string
  href: string
}

const FashionSection: React.FC = () => {
  const categories: Category[] = [
    {
      name: "Men's",
      image: '/images/nike1.jpg',
      href: '/search?tag=todays-deal',
    },
    {
      name: "Women's",
      image: '/images/nike3.png',
      href: '/search?tag=new-arrival',
    },
    {
      name: 'Unisex',
      image: '/images/nike2.png',
      href: '/search?tag=featured',
    },
  ]

  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  // Handle arrow navigation
  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const item = scrollRef.current.children[index] as HTMLDivElement
      const itemWidth = item.offsetWidth
      const gap = 24 // Tailwind's gap-6 = 24px
      const scrollPosition = index * (itemWidth + gap)
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      })
      setActiveIndex(index)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollPosition = scrollRef.current.scrollLeft
        const item = scrollRef.current.children[0] as HTMLDivElement
        const itemWidth = item.offsetWidth
        const gap = 24
        const index = Math.round(scrollPosition / (itemWidth + gap))
        setActiveIndex(index)
      }
    }

    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll)
      return () => scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='py-10'>
      <div className='max-w-7xl mx-auto px-4 relative'>
        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className='flex flex-nowrap overflow-x-auto gap-6 lg:grid lg:grid-cols-3 lg:overflow-x-hidden snap-x snap-mandatory scroll-smooth'
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className='flex-shrink-0 w-[80vw] lg:w-full snap-center'
            >
              <div className='relative w-full'>
                <Link href={category.href}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    height={500}
                    width={500}
                    className='w-full h-auto object-cover'
                  />
                  <button className='absolute bottom-4 left-1/4 transform -translate-x-1/2 bg-white text-black hover:bg-gray-200 font-semibold py-2 px-6 rounded-full'>
                    {category.name}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className='absolute bottom-6 right-4 flex space-x-2 p-2 lg:hidden'>
          <button
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            className='bg-black text-white p-2 rounded-full opacity-75 hover:opacity-100 disabled:opacity-50'
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === categories.length - 1}
            className='bg-black text-white p-2 rounded-full opacity-75 hover:opacity-100 disabled:opacity-50'
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FashionSection
