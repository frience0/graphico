import { BiLeaf } from 'react-icons/bi'
import { FaShirtsinbulk } from 'react-icons/fa'
import { IoBagCheckOutline } from 'react-icons/io5'
import { LiaShippingFastSolid } from 'react-icons/lia'

const Features = () => {
  const features = [
    {
      icon: (
        <FaShirtsinbulk className='w-12 h-12 md:w-14 md:h-14 xl:w-16 xl:h-16 text-gray-800' />
      ),
      text: 'Dreamy Quality',
    },
    {
      icon: (
        <LiaShippingFastSolid className='w-12 h-12 md:w-14 md:h-14 xl:w-16 xl:h-16 text-gray-800' />
      ),
      text: 'Fast Worldwide Shipping',
    },
    {
      icon: (
        <IoBagCheckOutline className='w-12 h-12 md:w-14 md:h-14 xl:w-16 xl:h-16 text-gray-800' />
      ),
      text: 'Free Returns',
    },
    {
      icon: (
        <BiLeaf className='w-12 h-12 md:w-14 md:h-14 xl:w-16 xl:h-16 text-gray-800' />
      ),
      text: 'Made-to-Order Sustainably',
    },
  ]

  return (
    <div className='py-10 bg-white'>
      <div className='max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 2xl:gap-12 text-center'>
          {features.map((feature, index) => (
            <div key={index} className='flex flex-col items-center'>
              <div className='mb-4 2xl:mb-6'>{feature.icon}</div>
              <p className='text-sm md:text-base xl:text-lg font-bold uppercase italic tracking-wide text-gray-900 max-w-[200px] 2xl:max-w-[240px]'>
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
