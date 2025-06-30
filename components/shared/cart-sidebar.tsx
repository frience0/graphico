'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Button, buttonVariants } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { TrashIcon } from 'lucide-react'
import useCartStore from '@/hooks/use-cart-store'
import useSettingStore from '@/hooks/use-setting-store'
import ProductPrice from './product/product-price'
import { useLocale, useTranslations } from 'next-intl'
import { getDirection } from '@/i18n-config'

export default function CartSidebar() {
  const {
    cart: { items, itemsPrice },
    updateItem,
    removeItem,
    showSidebar,
    toggleSidebar,
  } = useCartStore()
  const {
    setting: {
      common: { freeShippingMinPrice },
    },
  } = useSettingStore()

  const t = useTranslations()
  const locale = useLocale()
  const dir = getDirection(locale)

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (showSidebar && !target.closest('.cart-drawer')) {
        toggleSidebar(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showSidebar, toggleSidebar])

  return (
    <>
      {/* Overlay */}
      {showSidebar && (
        <div
          className='fixed inset-0 bg-gray-900/60 z-50'
          onClick={() => toggleSidebar(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 w-80 z-50 transform transition-transform duration-300 ease-in-out cart-drawer border border-gray-200',
          showSidebar ? 'translate-x-0' : 'translate-x-full',
          dir === 'rtl' ? 'left-0 right-auto' : 'right-0'
        )}
      >
        <div className='h-full flex flex-col bg-white'>
          {/* Header */}
          <div className='flex items-center justify-between p-4 mb-2 mt-2 border-b'>
            <h2 className='text-lg font-semibold text-gray-800'>
              Your Cart: ({items.reduce((acc, item) => acc + item.quantity, 0)}{' '}
              {t('Cart.Items')})
            </h2>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => toggleSidebar(false)}
              className='text-gray-600 hover:text-gray-800'
            >
              ✕
            </Button>
          </div>

          {/* Scrollable Items Section */}
          <ScrollArea className='flex-1 overflow-y-auto'>
            <div className='p-4 space-y-4'>
              {items.length === 0 ? (
                <p className='text-center text-gray-500'>{t('Cart.Empty')}</p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.clientId}
                    className='bg-white rounded-lg shadow-sm p-3'
                  >
                    <div className='flex items-center gap-3'>
                      {/* Product Image */}
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={() => toggleSidebar(false)}
                      >
                        <div className='relative w-16 h-16'>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes='20vw'
                            className='object-contain'
                          />
                        </div>
                      </Link>

                      {/* Product Details */}
                      <div className='flex-1'>
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={() => toggleSidebar(false)}
                        >
                          <p className='text-sm font-medium text-gray-800 hover:underline'>
                            {item.name}
                          </p>
                        </Link>
                        <div className='text-sm text-gray-600'>
                          <ProductPrice price={item.price} plain />
                        </div>
                        <div className='flex items-center gap-2 mt-1'>
                          <Select
                            value={item.quantity.toString()}
                            onValueChange={(value) =>
                              updateItem(item, Number(value))
                            }
                          >
                            <SelectTrigger className='text-xs w-16 h-8'>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: item.countInStock }).map(
                                (_, i) => (
                                  <SelectItem
                                    value={(i + 1).toString()}
                                    key={i + 1}
                                  >
                                    {i + 1}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => removeItem(item)}
                            className='border-gray-300 text-gray-600 hover:text-red-600 hover:border-red-300'
                          >
                            <TrashIcon className='w-4 h-4' />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className='p-4 bg-gray-100 border-t border-gray-200'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-lg font-semibold text-gray-800'>
                {t('Cart.Subtotal')}
              </h2>
              <div className='text-xl font-bold text-gray-800'>
                <ProductPrice price={itemsPrice} plain />
              </div>
            </div>
            <div className='text-center'>
              <Link
                href='/cart'
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'w-full bg-gray-900 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition duration-150 ease-in-out rounded-md border-none'
                )}
                onClick={() => toggleSidebar(false)}
              >
                {t('Cart.Go to Cart')}
              </Link>
            </div>
            {itemsPrice > freeShippingMinPrice && (
              <div className='text-center text-xs text-green-600 mt-2'>
                {t('Cart.Your order qualifies for FREE Shipping')}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
