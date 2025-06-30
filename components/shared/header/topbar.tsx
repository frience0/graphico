'use client'

import { useState, useEffect } from 'react'

const TopBar = () => {
  // Reduced redundancy in messages for better readability
  const messages = [
    'WORLDWIDE SHIPPING!',
    'UP TO 25% OFF EVERYTHING ⚡',
    'LIMITED TIME ONLY',
    'WORLDWIDE SHIPPING!',
    'UP TO 25% OFF EVERYTHING ⚡',
    'LIMITED TIME ONLY',
    'WORLDWIDE SHIPPING!',
    'UP TO 25% OFF EVERYTHING ⚡',
    'LIMITED TIME ONLY',
  ]

  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down and past 50px
        setIsVisible(false)
      } else if (currentScrollY < 50) {
        // Near the top (within 50px)
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={`bg-black text-white py-2 fixed top-0 left-0 right-0 transition-all duration-300 z-50 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Container to prevent overflow */}
      <div className='w-full overflow-hidden'>
        {/* Duplicate messages for seamless scrolling */}
        <div className='inline-flex animate-scroll whitespace-nowrap'>
          {[...messages, ...messages].map((message, index) => (
            <span
              key={index}
              className={`mx-2 text-[10px] sm:mx-4 sm:text-xs md:mx-6 md:text-sm font-semibold ${
                message.includes('25%') ? 'text-yellow-400' : 'text-white'
              }`}
            >
              {message}
              {index < messages.length * 2 - 1 && (
                <span className='inline-block mx-1 sm:mx-2 md:mx-3 text-gray-500'>
                  •
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopBar
