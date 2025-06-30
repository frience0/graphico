'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import TopBar from './topbar'
import { MenuItem } from '@/types'
import DropdownMenu from './dropdown'
import Sidebar from './sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import LanguageSwitcher from './language-switcher'
import UserButtonClient from './user-client-button'
import CartButton from './cart-button'

interface Site {
  logo: string
  name: string
}

interface NavbarProps {
  site: Site
  headerMenus: MenuItem[]
  categories: string[]
  translations: {
    all: string
    searchSite: string
  }
}

export default function Navbar({
  site,
  headerMenus,
  categories,
  translations,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false)
      }
    }

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSearchOpen])

  const logo = site?.logo || '/icons/logo.svg'
  const name = site?.name || 'Default Site'

  return (
    <>
      <div
        className={`transition-all duration-100 ${isScrolled ? '-top-10 opacity-0' : 'top-0 opacity-100'}`}
      >
        <TopBar />
      </div>

      <nav
        className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all bg-white ${
          isScrolled
            ? 'fixed top-0 left-0 right-0 shadow-md z-40 duration-100'
            : 'relative duration-100 mt-10'
        }`}
      >
        <div className='flex justify-between items-center h-16'>
          {/* Left Section: Hamburger Menu and Search Icon */}
          <div className='flex items-center space-x-4'>
            <div className='lg:hidden mt-1'>
              <Sidebar headerMenus={headerMenus} site={site} />
            </div>

            {/* MObile Search Icon (visible on mobile and tablet, moves to right on lg) */}
            <div className='lg:hidden'>
              <Button
                variant='ghost'
                size='icon'
                className=' hover:bg-white'
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className='h-5 w-5 max-sm:mr-4' />
              </Button>
            </div>
          </div>

          {/* Logo (centered on mobile/tablet, left on desktop) */}
          <div className='flex-1 flex justify-center lg:justify-start'>
            <Link href='/'>
              <Image
                src={site.logo}
                alt={`${site.name} logo`}
                width={150}
                height={50}
              />
            </Link>

            {/* Desktop Navigation (visible only on lg and above) */}
            <nav className='hidden lg:flex space-x-8 lg:ml-10'>
              {headerMenus.map((menu) => (
                <DropdownMenu
                  key={menu.name}
                  label={menu.name}
                  items={menu.subItems}
                />
              ))}
            </nav>
          </div>

          {/* Right Section: Icons */}
          <div className='flex items-center space-x-4 hover:bg-white'>
            {/* Flag and Currency (visible only on lg and above) */}
            <div className='hidden xl:flex'>
              <LanguageSwitcher />
            </div>

            {/* Search Icon (visible on lg and above, moves to left on mobile) */}
            <Button
              variant='ghost'
              size='icon'
              className=' hover:bg-white !important hidden lg:block'
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className='h-5 w-5 ml-2' />
            </Button>

            {/* User Icon (visible on md and above) */}
            <UserButtonClient />
            <CartButton />
          </div>
        </div>
      </nav>

      {/* Expanded Search Bar */}
      <div
        ref={searchRef}
        className={`fixed top-0 right-0 h-[50vh] bg-white transition-all duration-500 ease-in-out z-50 ${
          isSearchOpen
            ? 'translate-y-0 opacity-100 w-full'
            : '-translate-y-full opacity-0 w-0'
        } overflow-hidden`}
      >
        <div className='flex items-center justify-between px-4 py-2'>
          {/* Logo */}
          <div className='animateIn' style={{ animationDelay: '0s' }}>
            <Link href='/'>
              <Image
                src={logo}
                alt={`${name} logo`}
                width={150}
                height={50}
                className='hidden sm:flex '
              />
            </Link>
          </div>

          {/* Search Form */}
          <form
            action='/search'
            method='GET'
            className='animateIn flex-1 mx-4'
            style={{ animationDelay: '0.5s' }}
          >
            <div className='relative max-w-md mx-auto'>
              {/* Combined Input with Dropdown */}
              <div className='relative flex items-center rounded-full border border-gray-400 focus-within:ring-2 focus-within:ring-gray-400 bg-white'>
                {/* Hidden Select Input for Form Submission */}
                <Select name='category'>
                  <SelectTrigger
                    className='border-none bg-transparenttext-gray-600 focus:ring-0 rounded-l-full pl-4 pr-2 h-10 w-auto'
                    style={{ boxShadow: 'none' }}
                  >
                    <SelectValue placeholder={translations.all} />
                  </SelectTrigger>
                  <SelectContent position='popper'>
                    <SelectItem value='all'>{translations.all}</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Vertical Divider */}
                <div className='h-6 w-px bg-gray-300 mx-2' />

                {/* Search Input */}
                <Input
                  type='search'
                  name='q'
                  placeholder={translations.searchSite}
                  className='border-none rounded-r-full bg-transparent text-gray-900 focus:ring-0 flex-1 py-2 pr-10 pl-2 h-10'
                  style={{ boxShadow: 'none' }}
                />

                {/* Search Button */}
                <button
                  type='submit'
                  className='absolute right-3 top-1/2 transform -translate-y-1/2'
                >
                  <Search className='h-5 w-5 text-gray-400' />
                </button>
              </div>
            </div>
          </form>

          {/* Cancel Button */}
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setIsSearchOpen(false)}
            className='animateIn text-black hover:text-gray-600'
            style={{ animationDelay: '1s' }}
          >
            Cancel
          </Button>
        </div>

        {/* Popular Search Terms */}
        {isSearchOpen && (
          <div className='absolute top-12 left-0 w-full px-4 py-6 text-center transform translate-y-0 sm:top-1/3 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 md:py-4 z-10'>
            <p
              className='animateIn text-xs font-semibold text-gray-400 sm:text-sm'
              style={{ animationDelay: '0.5s' }}
            >
              Popular Search Terms
            </p>
            <div className='flex gap-2 mt-2 flex-wrap justify-center'>
              {[
                'vintage aesthetic',
                'nike',
                'anime streetwear',
                'retro wave',
                'grunge skull',
                'hanes',
                'psychedelic prints',
                'dickies',
              ].map((term, index) => (
                <span
                  key={term}
                  className='animateIn px-2 py-1 bg-[#1F1E20] rounded-full text-xs text-white cursor-pointer hover:bg-gray-600 sm:px-3 sm:text-sm'
                  style={{ animationDelay: `${1 + index * 0.1}s` }}
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
