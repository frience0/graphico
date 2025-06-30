import { getSetting } from '@/lib/actions/setting.actions'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import Image from 'next/image'
import SignUpForm from './signup-form'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default async function SignUpPage(props: {
  searchParams: Promise<{
    callbackUrl: string
  }>
}) {
  const searchParams = await props.searchParams
  const { site } = await getSetting()

  const { callbackUrl } = searchParams

  const session = await auth()
  if (session) {
    return redirect(callbackUrl || '/')
  }

  return (
    <div className='flex flex-col md:flex-row w-full max-w-4xl mx-auto'>
      {/* Left Section: Sign Up Form */}
      <div className='w-full md:w-1/2 p-6 md:p-8'>
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>
          Create {site.name} Account
        </h2>
        <SignUpForm />
      </div>

      {/* Right Section: Promotional Image and Text */}
      <div className='hidden md:block w-full md:w-1/2 relative min-h-[300px]'>
        <Image
          src='/images/login.jpg'
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
