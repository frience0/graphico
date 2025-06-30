'use client'

import React from 'react'
import CartSidebar from './cart-sidebar'
import AppInitializer from './app-initializer'
import { ClientSetting } from '@/types'
import { Toaster } from '../ui/sonner'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'

export default function ClientProviders({
  setting,
  children,
}: {
  setting: ClientSetting
  children: React.ReactNode
}) {
  return (
    <AppInitializer setting={setting}>
      <SessionProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme={setting.common.defaultTheme.toLowerCase()}
        >
          <div className='relative min-h-screen'>
            {children}
            <CartSidebar />
          </div>
          <Toaster />
        </ThemeProvider>
      </SessionProvider>
    </AppInitializer>
  )
}
