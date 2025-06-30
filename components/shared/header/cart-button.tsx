'use client'

import { Button } from '@/components/ui/button'
import useCartStore from '@/hooks/use-cart-store'
import useIsMounted from '@/hooks/use-is-mounted'
import { getDirection } from '@/i18n-config'
import { cn } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'
import { useLocale } from 'next-intl'

export default function CartButton() {
  const isMounted = useIsMounted()
  const {
    cart: { items },
    toggleSidebar,
  } = useCartStore()
  const cartItemsCount = items.reduce((a, c) => a + c.quantity, 0)
  const locale = useLocale()

  return (
    <div className='relative'>
      <Button
        variant='ghost'
        size='icon'
        className='flex focus:outline-none items-center justify-center w-10 h-10 relative hover:bg-white'
        onClick={() => toggleSidebar(true)}
      >
        <ShoppingCart className='h-5 w-5' />
        {isMounted && (
          <span
            className={cn(
              `bg-[#22b92f] px-2 py-0.5 rounded-full text-white absolute ${
                getDirection(locale) === 'rtl' ? 'right-[5px]' : 'left-[20px]'
              } top-[-4px] z-10`,
              cartItemsCount >= 10 && 'text-sm px-1 py-0.5'
            )}
          >
            {cartItemsCount}
          </span>
        )}
      </Button>
    </div>
  )
}
