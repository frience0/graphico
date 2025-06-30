import Image from 'next/image'

interface ProductGridProps {
  title?: string
}

const ProductGrid = ({ title = 'Best Sellers' }: ProductGridProps) => {
  const products = [
    { category: 'Forest Sanctuary', image: '/images/first.jpg' },
    { category: 'Pocket', image: '/images/second.jpg' },
    { category: 'Ringer', image: '/images/3rd.jpg' },
    { category: 'Oversized ', image: '/images/4th.jpg' },
    { category: 'Vintage', image: '/images/5th.jpg' },
  ]

  return (
    <div className='container mx-auto px-4 py-8 cursor-pointer'>
      <h2 className='text-2xl font-bold md:text-3xl italic'>{title}</h2>
      <div className='grid-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center mt-10 mx-auto'>
        {/* First column - tall item */}
        <div className='grid-item item-1 relative rounded-md shadow-lg group h-150 max-sm:h-80 lg:col-span-1'>
          <Image
            src={products[0].image}
            alt={products[0].category}
            fill
            className='w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-101'
          />
          <div className='absolute inset-0'>
            <div className='absolute bottom-0 left-0 right-0 p-4'>
              <h4 className='text-xl font-bold text-white italic'>
                {products[0].category.toUpperCase()}
              </h4>
              <p className='text-white bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                Moisture-wicking and breathable, built for peak performance.
              </p>
            </div>
          </div>
        </div>

        {/* Second column - tall item */}
        <div className='grid-item item-2 relative rounded-md shadow-lg group h-150 max-sm:h-80 lg:col-span-1'>
          <Image
            src={products[1].image}
            alt={products[1].category}
            fill
            className='w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-101'
          />
          <div className='absolute inset-0'>
            <div className='absolute bottom-0 left-0 right-0 p-4'>
              <h4 className='text-xl font-bold text-white italic'>
                {products[1].category.toUpperCase()}
              </h4>
              <p className='text-white bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                Rounded neckline that adds a soft, elegant touch
              </p>
            </div>
          </div>
        </div>

        {/* Third column - small item */}
        <div className='grid-item item-3 relative rounded-md shadow-lg group h-75 max-sm:h-40 lg:col-span-1'>
          <Image
            src={products[2].image}
            alt={products[2].category}
            fill
            className='w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-101'
          />
          <div className='absolute inset-0'>
            <div className='absolute bottom-0 left-0 right-0 p-4'>
              <h4 className='text-xl font-bold text-white italic'>
                {products[2].category.toUpperCase()}
              </h4>
              <p className='text-white bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                Style with contrasting sleeves, evoking classic baseball vibes.
              </p>
            </div>
          </div>
        </div>

        {/* Fourth column - small item */}
        <div className='grid-item item-4 relative rounded-md shadow-lg group h-75 max-sm:h-40 lg:col-span-1'>
          <Image
            src={products[3].image}
            alt={products[3].category}
            fill
            className='w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-101'
          />
          <div className='absolute inset-0'>
            <div className='absolute bottom-0 left-0 right-0 p-4'>
              <h4 className='text-xl font-bold text-white italic'>
                {products[3].category.toUpperCase()}
              </h4>
              <p className='text-white bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                Lightweight and breathable option, perfect for warm weather.
              </p>
            </div>
          </div>
        </div>

        {/* Last item - wide item */}
        <div className='grid-item item-5 relative rounded-md shadow-lg group h-70 max-sm:h-40 lg:col-span-2'>
          <Image
            src={products[4].image}
            alt={products[4].category}
            fill
            className='w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-101'
          />
          <div className='absolute inset-0'>
            <div className='absolute bottom-0 left-0 right-0 p-4'>
              <h4 className='text-xl font-bold text-white italic'>
                {products[4].category.toUpperCase()}
              </h4>
              <p className='text-white bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                Perfect for a casual, laid-back vibe with a hint of
                practicality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductGrid
