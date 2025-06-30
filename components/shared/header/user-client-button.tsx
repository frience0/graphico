'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserRound } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function UserButtonClient() {
  const { data: session } = useSession()
  const t = useTranslations('Header')

  const userImage = session?.user?.image

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='relative w-10 h-10focus:outline-none rounded-full max-sm:mr-[-4px]'
        >
          {userImage ? (
            <Image
              src={userImage}
              alt='Profile'
              width={20}
              height={20}
              className='rounded-full'
            />
          ) : (
            <UserRound className='h-5 w-5' />
          )}
        </Button>
      </DropdownMenuTrigger>
      {session ? (
        <DropdownMenuContent
          className='w-56 bg-white border-gray-200 shadow-lg rounded-none mt-2 p-2'
          align='end'
        >
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuLabel className='font-normal px-4 py-2 text-sm text-gray-600'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {session.user.name ?? 'User'}
              </p>
              <p className='text-xs leading-none text-gray-500'>
                {session.user.email ?? 'No email'}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href='/account'>
                <Button
                  variant='ghost'
                  className='w-full text-left px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:text-white transition duration-150 ease-in-out rounded-md border-none'
                >
                  {t('Your account')}
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/account/orders'>
                <Button
                  variant='ghost'
                  className='w-full text-left px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:text-white transition duration-150 ease-in-out rounded-md border-none'
                >
                  {t('Your orders')}
                </Button>
              </Link>
            </DropdownMenuItem>
            {session.user.role === 'Admin' && (
              <DropdownMenuItem asChild>
                <Link href='/admin/overview'>
                  <Button
                    variant='ghost'
                    className='w-full text-left px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:text-white transition duration-150 ease-in-out rounded-md border-none'
                  >
                    {t('Admin')}
                  </Button>
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
          <DropdownMenuItem className='p-2'>
            <Button
              variant='ghost'
              className='w-full h-auto py-2 px-4 text-left text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:text-white transition duration-150 ease-in-out rounded-md border-none'
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              {t('Sign out')}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent
          className='w-56 mt-2 bg-white border border-gray-200 shadow-lg rounded-none p-2'
          align='end'
        >
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href='/sign-in'>
                <Button
                  variant='ghost'
                  className='w-full text-left px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:text-white transition duration-150 ease-in-out rounded-md border-none'
                >
                  {t('Sign in')}
                </Button>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuLabel className='font-normal px-4 py-2 text-sm text-gray-600 border-t border-gray-100 flex items-center justify-between'>
            <span>{t('New Customer')}?</span>
            <Link
              href='/sign-up'
              className='text-blue-600 hover:text-blue-800 hover:underline font-medium transition duration-150 ease-in-out'
            >
              {t('Sign up')}
            </Link>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}
