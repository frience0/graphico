'use client'
import Image from 'next/image'
import { useState } from 'react'
import AddToCart from './add-to-cart'
import { IProduct } from '@/lib/db/models/product.model'
import { generateId, round2 } from '@/lib/utils'

const ImageHover = ({
  src,
  hoverSrc,
  alt,
  product,
}: {
  src: string
  hoverSrc: string
  alt: string
  product: IProduct
}) => {
  const [isHovered, setIsHovered] = useState(false)
  let hoverTimeout: NodeJS.Timeout | undefined

  const handleMouseEnter = () => {
    hoverTimeout = setTimeout(() => setIsHovered(true))
  }

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout)
    setIsHovered(false)
  }

  return (
    <div
      className='relative h-52'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes='80vw'
        className={`object-contain transition-opacity duration-500 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <Image
        src={hoverSrc}
        alt={alt}
        fill
        sizes='80vw'
        className={`absolute inset-0 object-contain transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Add to Cart Button with Smooth Bottom-to-Top Animation */}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out ${
          isHovered ? 'opacity-100 top-40' : 'opacity-0 top-full'
        }`}
      >
        <AddToCart
          minimal
          item={{
            clientId: generateId(),
            product: product._id,
            size: product.sizes[0],
            color: product.colors[0],
            countInStock: product.countInStock,
            name: product.name,
            slug: product.slug,
            category: product.category,
            price: round2(product.price),
            quantity: 1,
            image: product.images[0],
          }}
        />
      </div>
    </div>
  )
}

export default ImageHover
