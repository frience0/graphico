'use client'
import Link from 'next/link'
import { useEffect, useState, useTransition, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import DeleteDialog from '@/components/shared/delete-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  deleteProduct,
  getAllProductsForAdmin,
} from '@/lib/actions/product.actions'
import { IProduct } from '@/lib/db/models/product.model'
import { formatDateTime, formatId } from '@/lib/utils'

// Types
type ProductListDataProps = {
  products: IProduct[]
  totalPages: number
  totalProducts: number
  to: number
  from: number
}

// Custom Debounce Hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

const ProductList = () => {
  const [page, setPage] = useState<number>(1)
  const [inputValue, setInputValue] = useState<string>('')
  const [data, setData] = useState<ProductListDataProps | undefined>(undefined)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const debouncedSearch = useDebounce(inputValue, 500)

  const fetchProducts = useCallback(
    async (query: string, currentPage: number) => {
      try {
        setError(null)
        const response = await getAllProductsForAdmin({
          query,
          page: currentPage,
        })
        setData(response)
      } catch (err) {
        setError('Failed to load products. Please try again.')
        console.error('Error fetching products:', err)
      }
    },
    []
  )

  const handlePageChange = (changeType: 'next' | 'prev') => {
    const newPage = changeType === 'next' ? page + 1 : page - 1
    setPage(newPage)
    startTransition(() => {
      fetchProducts(inputValue, newPage)
    })
  }

  const handleRefresh = () => {
    startTransition(() => {
      fetchProducts(inputValue, page)
    })
  }

  useEffect(() => {
    startTransition(() => {
      fetchProducts(debouncedSearch, 1)
    })
  }, [debouncedSearch, fetchProducts])

  useEffect(() => {
    startTransition(() => {
      fetchProducts('', 1)
    })
  }, [fetchProducts])

  return (
    <div className='space-y-4'>
      <div className='flex-between flex-wrap gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <h1 className='font-bold text-lg'>Products</h1>
          <div className='flex flex-wrap items-center gap-2'>
            <Input
              className='w-auto min-w-[200px]'
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='Filter name...'
            />
            {isPending ? (
              <p>Loading...</p>
            ) : error ? (
              <p className='text-red-500'>{error}</p>
            ) : (
              <p>
                {data?.totalProducts === 0
                  ? 'No'
                  : `${data?.from}-${data?.to} of ${data?.totalProducts}`}
                {' results'}
              </p>
            )}
          </div>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' onClick={handleRefresh}>
            Refresh
          </Button>
          <Button asChild variant='default'>
            <Link href='/admin/products/create'>Create Product</Link>
          </Button>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className='text-right'>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Last Update</TableHead>
              <TableHead className='w-[150px]'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending
              ? // Skeleton loading
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={9}>
                      <div className='h-8 w-full animate-pulse bg-gray-200 rounded' />
                    </TableCell>
                  </TableRow>
                ))
              : data?.products.map((product: IProduct) => (
                  <TableRow key={product._id}>
                    <TableCell>{formatId(product._id)}</TableCell>
                    <TableCell>
                      <Link href={`/admin/products/${product._id}`}>
                        {product.name}
                      </Link>
                    </TableCell>
                    <TableCell className='text-right'>
                      ${product.price}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.countInStock}</TableCell>
                    <TableCell>{product.avgRating}</TableCell>
                    <TableCell>{product.isPublished ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      {formatDateTime(product.updatedAt).dateTime}
                    </TableCell>
                    <TableCell className='flex gap-1'>
                      <Button asChild variant='outline' size='sm'>
                        <Link href={`/admin/products/${product._id}`}>
                          Edit
                        </Link>
                      </Button>
                      <Button asChild variant='outline' size='sm'>
                        <Link target='_blank' href={`/product/${product.slug}`}>
                          View
                        </Link>
                      </Button>
                      <DeleteDialog
                        id={product._id}
                        action={deleteProduct}
                        callbackAction={() => {
                          startTransition(() => {
                            fetchProducts(inputValue, page)
                          })
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {(data?.totalPages ?? 0) > 1 && (
        <div className='flex items-center justify-between gap-2'>
          <Button
            variant='outline'
            onClick={() => handlePageChange('prev')}
            disabled={page <= 1 || isPending}
            className='w-24'
          >
            <ChevronLeft /> Previous
          </Button>
          <span>
            Page {page} of {data?.totalPages}
          </span>
          <Button
            variant='outline'
            onClick={() => handlePageChange('next')}
            disabled={page >= (data?.totalPages ?? 0) || isPending}
            className='w-24'
          >
            Next <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  )
}

export default ProductList
