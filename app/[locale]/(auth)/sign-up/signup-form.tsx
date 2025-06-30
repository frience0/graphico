'use client'
import { redirect, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import useSettingStore from '@/hooks/use-setting-store'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { IUserSignUp } from '@/types'
import { registerUser, signInWithCredentials } from '@/lib/actions/user.actions'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSignUpSchema } from '@/lib/validator'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

const signUpDefaultValues =
  process.env.NODE_ENV === 'development'
    ? {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }
    : {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }

export default function CredentialsSignUpForm() {
  const {
    setting: { site },
  } = useSettingStore()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const form = useForm<IUserSignUp>({
    resolver: zodResolver(UserSignUpSchema),
    defaultValues: signUpDefaultValues,
  })

  const { control, handleSubmit } = form

  const onSubmit = async (data: IUserSignUp) => {
    try {
      const res = await registerUser(data)
      if (!res.success) {
        toast({
          title: 'Error',
          description: res.error,
          variant: 'destructive',
        })
        return
      }
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

        <FormField
          control={control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-700'>Name</FormLabel>
              <FormControl>
                <Input
                  className='border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-sm'
                  placeholder='Enter name'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-700'>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  className='border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-sm'
                  placeholder='Confirm Password'
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
            <span className='text-gray-600 text-sm'>Remember for 30 days</span>
          </label>
          <Link href='#' className='text-blue-500 hover:underline text-sm'>
            Forgot password?
          </Link>
        </div>

        <Button
          type='submit'
          className='w-full bg-black hover:bg-gray-800 text-white rounded-sm'
        >
          Sign Up
        </Button>

        <div className='text-sm text-gray-600'>
          By creating an account, you agree to {site.name}’s{' '}
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
          <div className='mt-4 text-center'>
            <p className='text-gray-600'>
              Already have an account?{' '}
              <Link
                className='text-blue-500 hover:underline'
                href={`/sign-in?callbackUrl=${callbackUrl}`}
              >
                Sign In for {site.name}
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Form>
  )
}
