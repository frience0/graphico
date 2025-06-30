/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useCartStore from '@/hooks/use-cart-store'
import { useToast } from '@/hooks/use-toast'
import { OrderItem } from '@/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AddToCart({
  item,
  minimal = false,
}: {
  item: OrderItem
  minimal?: boolean
}) {
  const router = useRouter()
  const { toast } = useToast()

  const { addItem } = useCartStore()
  const [quantity, setQuantity] = useState(1)

  return minimal ? (
    <Button
      className='rounded-full w-auto uppercase hover:bg-black'
      onClick={() => {
        try {
          addItem(item, 1)
          toast({
            title: 'Added to Cart',
            action: {
              label: 'Go to Cart',
              onClick: () => router.push('/cart'),
            },
            duration: 3000,
            position: 'top-right',
          })
        } catch (error: any) {
          toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
            duration: 3000,
            position: 'top-right',
          })
        }
      }}
    >
      Add to Cart
    </Button>
  ) : (
    <div className='w-full space-y-2'>
      <Select
        value={quantity.toString()}
        onValueChange={(i) => setQuantity(Number(i))}
      >
        <SelectTrigger className=''>
          <SelectValue>Quantity: {quantity}</SelectValue>
        </SelectTrigger>
        <SelectContent position='popper'>
          {Array.from({ length: item.countInStock }).map((_, i) => (
            <SelectItem key={i + 1} value={`${i + 1}`}>
              {i + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        className='rounded-full w-full'
        type='button'
        onClick={async () => {
          try {
            const itemId = await addItem(item, quantity)
            router.push(`/cart/${itemId}`)
            toast({
              title: 'Added to Cart',
              description: `${quantity} item${
                quantity > 1 ? 's' : ''
              } added successfully`,
              action: {
                label: 'View Cart',
                onClick: () => router.push(`/cart`),
              },
              duration: 3000,
              position: 'top-right',
            })
          } catch (error: any) {
            toast({
              title: 'Error',
              description: error.message,
              variant: 'destructive',
              duration: 3000,
              position: 'top-right',
            })
          }
        }}
      >
        Add to Cart
      </Button>
      <Button
        variant='secondary'
        onClick={() => {
          try {
            addItem(item, quantity)
            router.push(`/checkout`)
            toast({
              title: 'Proceeding to Checkout',
              description: `${quantity} item${quantity > 1 ? 's' : ''} added`,
              duration: 3000,
              position: 'top-right',
            })
          } catch (error: any) {
            toast({
              title: 'Error',
              description: error.message,
              variant: 'destructive',
              duration: 3000,
              position: 'top-right',
            })
          }
        }}
        className='w-full rounded-full'
      >
        Buy Now
      </Button>
    </div>
  )
}
