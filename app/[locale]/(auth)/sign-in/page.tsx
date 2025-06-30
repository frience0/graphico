import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { getSetting } from '@/lib/actions/setting.actions'

import CredentialsSignInForm from './credentials-signin-form'
import { GoogleSignInForm } from './google-signin-form'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default async function SignInPage(props: {
  searchParams: Promise<{
    callbackUrl: string
  }>
}) {
  const searchParams = await props.searchParams
  const { site } = await getSetting()

  const { callbackUrl = '/' } = searchParams

  const session = await auth()
  if (session) {
    return redirect(callbackUrl)
  }

  return (
    <div className='flex flex-col md:flex-row w-full max-w-4xl mx-auto'>
      {/* Left Section: Login Form */}
      <div className='w-full md:w-1/2 p-6 md:p-8'>
        {/* Logo */}
        <div className='flex items-center mb-6'>
          <span className='text-2xl font-bold text-gray-800'>{site.name}</span>
        </div>

        <h2 className='text-2xl font-bold text-gray-800 mb-2'>Welcome back</h2>
        <p className='text-gray-500 mb-6'>Please enter your details</p>
        <div className='mt-4'>
          <GoogleSignInForm />
        </div>
        <CredentialsSignInForm />

        <div className='mt-4 text-center'>
          <p className='text-gray-600'>
            Don’t have an account?{' '}
            <Link
              href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              className='text-blue-500 hover:underline'
            >
              Sign up for {site.name}
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section: Promotional Image and Text */}
      <div className='hidden md:block w-full md:w-1/2 relative min-h-[300px]'>
        <Image
          src='/images/signup.jpg'
          alt='Promotional Image'
          layout='fill'
          objectFit='cover'
          className=''
        />
        <div className='absolute bottom-8 left-8 text-white'>
          <h3 className='text-2xl font-bold mb-2'>Bring your ideas to life.</h3>
          <p className='text-sm'>
            Sign up for free and enjoy access to all features for 30 days. No
            credit card required.
          </p>
        </div>
      </div>
    </div>
  )
}
