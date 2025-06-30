import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { IProduct } from '@/lib/db/models/product.model'
// import Rating from './rating'
import ImageHover from './image-hover'
import ProductPrice from './product-price'

const ProductCard = ({
  product,
  hideBorder = false,
  hideDetails = false,
  // hideAddToCart = false,
}: {
  product: IProduct
  hideDetails?: boolean
  hideBorder?: boolean
  hideAddToCart?: boolean
}) => {
  const ProductImage = () => {
    const isDeal = product.tags.includes('todays-deal')
    const discountPercent =
      product.listPrice > 0
        ? Math.round(100 - (product.price / product.listPrice) * 100)
        : 0

    return (
      <Link href={`/product/${product.slug}`}>
        <div className='relative h-52 mt-10'>
          {product.images.length > 1 ? (
            <ImageHover
              src={product.images[0]}
              hoverSrc={product.images[1]}
              alt={product.name}
              product={product} // Add this prop
            />
          ) : (
            <div className='relative h-52'>
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes='80vw'
                className='object-contain'
              />
            </div>
          )}

          {isDeal && discountPercent > 0 && (
            <div className='absolute top-2 left-2'>
              <span className='bg-pink-700 text-white text-xs font-semibold px-2 py-1'>
                -{discountPercent}% OFF
              </span>
            </div>
          )}
        </div>
      </Link>
    )
  }

  const ProductDetails = () => (
    <div className='flex-1 space-y-1 text-left mt-10'>
      <p className='text-xs text-gray-500 uppercase'>{product.brand}</p>

      {/* Product Name */}
      <Link
        href={`/product/${product.slug}`}
        className='text-sm font-semibold text-gray-800 overflow-hidden text-ellipsis'
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {product.name}
      </Link>
      {/* <div className='flex gap-2 justify-center'>
        <Rating rating={product.avgRating} />
        <span>({formatNumber(product.numReviews)})</span>
      </div> */}

      <ProductPrice
        price={product.price}
        listPrice={product.listPrice}
        forListing
      />
    </div>
  )
  // const AddButton = () => (
  //   <div className='w-full text-center'>
  //     <AddToCart
  //       minimal
  //       item={{
  //         clientId: generateId(),
  //         product: product._id,
  //         size: product.sizes[0],
  //         color: product.colors[0],
  //         countInStock: product.countInStock,
  //         name: product.name,
  //         slug: product.slug,
  //         category: product.category,
  //         price: round2(product.price),
  //         quantity: 1,
  //         image: product.images[0],
  //       }}
  //     />
  //   </div>
  // )

  return hideBorder ? (
    <div className='flex flex-col'>
      <ProductImage />
      {!hideDetails && (
        <>
          <div className='p-3 flex-1 text-center'>
            <ProductDetails />
          </div>
          {/* {!hideAddToCart && <AddButton />} */}
        </>
      )}
    </div>
  ) : (
    <Card className='flex flex-col  '>
      <CardHeader className='p-3'>
        <ProductImage />
      </CardHeader>
      {!hideDetails && (
        <>
          <CardContent className='p-3 flex-1  text-center'>
            <ProductDetails />
          </CardContent>
          {/* <CardFooter className='p-3'>
            {!hideAddToCart && <AddButton />}
          </CardFooter> */}
        </>
      )}
    </Card>
  )
}

export default ProductCard
