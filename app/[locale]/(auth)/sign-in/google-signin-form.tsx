'use client'
import { useFormStatus } from 'react-dom'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SignInWithGoogle } from '@/lib/actions/user.actions'

export function GoogleSignInForm() {
  const SignInButton = () => {
    const { pending } = useFormStatus()
    return (
      <Button disabled={pending} className='w-full' variant='outline'>
        <Image
          src='/icons/google.svg'
          alt='Google Icon'
          width={20}
          height={20}
          className='mr-2'
        />
        {pending ? 'Redirecting to Google...' : 'Sign In with Google'}
      </Button>
    )
  }
  return (
    <form action={SignInWithGoogle}>
      <SignInButton />
    </form>
  )
}
