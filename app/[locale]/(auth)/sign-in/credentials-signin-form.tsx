'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useSettingStore from '@/hooks/use-setting-store'
import { toast } from '@/hooks/use-toast'
import { signInWithCredentials } from '@/lib/actions/user.actions'
import { UserSignInSchema } from '@/lib/validator'
import { IUserSignIn } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import Link from 'next/link'
import { redirect, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

const signInDefaultValues =
  process.env.NODE_ENV === 'development'
    ? {
        email: '',
        password: '',
      }
    : {
        email: '',
        password: '',
      }

export default function CredentialsSignInForm() {
  const {
    setting: { site },
  } = useSettingStore()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const form = useForm<IUserSignIn>({
    resolver: zodResolver(UserSignInSchema),
    defaultValues: signInDefaultValues,
  })

  const { control, handleSubmit } = form

  const onSubmit = async (data: IUserSignIn) => {
    try {
      await signInWithCredentials({
        email: data.email,
        password: data.password,
      })
      redirect(callbackUrl)
    } catch (error) {
      if (isRedirectError(error)) {
        throw error
      }
      toast({
        title: 'Error',
        description: 'Invalid email or password',
        variant: 'destructive',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 mt-4'>
        <input type='hidden' name='callbackUrl' value={callbackUrl} />
        <div className='flex items-center mb-4'>
          <hr className='w-full border-gray-300' />
          <span className='px-3 text-gray-500'>or</span>
          <hr className='w-full border-gray-300' />
        </div>
        <FormField
          control={control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-700'>Email address</FormLabel>
              <FormControl>
                <Input
                  className='border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-sm'
                  placeholder='Email address'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-700'>Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  className='border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-sm'
                  placeholder='Password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col sm:flex-row items-center justify-between mb-6 space-y-2 sm:space-y-0'>
          <label className='flex items-center'>
            <input type='checkbox' className='mr-2' />
            <span className='text-gray-600'>Remember for 30 days</span>
          </label>
          <Link href='#' className='text-blue-500 hover:underline'>
            Forgot password?
          </Link>
        </div>

        <Button
          type='submit'
          className='w-full bg-black hover:bg-gray-800 text-white rounded-sm'
        >
          Sign in
        </Button>

        <div className='text-sm text-gray-600'>
          <div>
            By signing in, you agree to {site.name}&rsquo;s{' '}
            <Link
              href='/page/conditions-of-use'
              className='text-blue-500 hover:underline'
            >
              Conditions of Use
            </Link>{' '}
            and{' '}
            <Link
              href='/page/privacy-policy'
              className='text-blue-500 hover:underline'
            >
              Privacy Notice
            </Link>
            .
          </div>
        </div>
      </form>
    </Form>
  )
}
