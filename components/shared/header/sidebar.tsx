'use client'

import { Button } from '@/components/ui/button'
import { SignOut } from '@/lib/actions/user.actions'
import { MenuItem } from '@/types'
import { ChevronRight, UserCircle, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface Site {
  logo: string
  name: string
}

interface SidebarProps {
  headerMenus: MenuItem[]
  site: Site
}

export default function Sidebar({ headerMenus, site }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const { data: session } = useSession()
  const t = useTranslations()
  const locale = useLocale()
  const direction = locale === 'ar' ? 'right' : 'left'

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setExpandedMenu(null)
      setExpandedCategory(null)
    }
  }

  const toggleMenuAccordion = (menuName: string) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName)
    setExpandedCategory(null)
  }

  const toggleCategoryAccordion = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName)
  }

  return (
    <>
      {/* Trigger Button */}
      <div className='lg:hidden'>
        <button
          onClick={toggleDrawer}
          className='focus:outline-none text-gray-700 relative w-5 h-4 mb-0.5'
        >
          <span className='sr-only'>Toggle menu</span>
          <div className='absolute top-1/2 left-0 w-full transform -translate-y-1/2'>
            <span
              className={`block absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${
                isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${
                isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Drawer Content */}
      <div
        className={`fixed top-0 ${
          direction === 'right' ? 'right-0' : 'left-0'
        } h-full w-[350px] bg-white text-gray-900 z-50 transform transition-transform duration-300 ease-in-out shadow-lg ${
          isOpen
            ? 'translate-x-0'
            : direction === 'right'
              ? 'translate-x-full'
              : '-translate-x-full'
        }`}
      >
        <div className='flex flex-col h-full'>
          {/* Close Button */}
          <div className='flex absolute right-0 p-4'>
            <Button
              variant='ghost'
              size='icon'
              className='text-gray-600 hover:bg-gray-100'
              onClick={toggleDrawer}
            >
              <X className='h-5 w-5' />
              <span className='sr-only'>Close</span>
            </Button>
          </div>

          {/* Branded Section with Image */}
          <div className='border-t border-gray-200'>
            <Link
              href='/'
              className='flex items-center px-6 py-4 text-lg font-medium hover:bg-gray-100 transition-colors'
              onClick={toggleDrawer}
            >
              <Image
                src={site.logo}
                alt={`${site.name} logo`}
                width={150}
                height={50}
              />
            </Link>
          </div>

          {/* Categories Section with Two-Level Accordion */}
          <nav className='flex-1 overflow-y-auto'>
            <ul className='flex flex-col'>
              {headerMenus.map((menu) => (
                <li key={menu.name}>
                  {/* Top-Level Menu Accordion */}
                  <button
                    onClick={() => toggleMenuAccordion(menu.name)}
                    className='w-full flex items-center justify-between px-6 py-4 text-lg font-medium text-gray-800 hover:bg-gray-100 transition-colors focus:outline-none'
                  >
                    <span>{menu.name}</span>
                    <ChevronRight
                      className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${
                        expandedMenu === menu.name ? 'rotate-90' : 'rotate-0'
                      }`}
                    />
                  </button>

                  {/* Categories Accordion */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedMenu === menu.name
                        ? 'max-h-[1000px] opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <ul className='pl-6 bg-gray-50'>
                      {menu.subItems.map((category) => (
                        <li key={category.category}>
                          {/* Category Accordion */}
                          <button
                            onClick={() =>
                              toggleCategoryAccordion(category.category)
                            }
                            className='w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors focus:outline-none'
                          >
                            <span>{category.category}</span>
                            <ChevronRight
                              className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${
                                expandedCategory === category.category
                                  ? 'rotate-90'
                                  : 'rotate-0'
                              }`}
                            />
                          </button>

                          {/* Subitems */}
                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              expandedCategory === category.category
                                ? 'max-h-[500px] opacity-100'
                                : 'max-h-0 opacity-0'
                            }`}
                          >
                            <ul className='pl-6'>
                              {category.items.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    className='block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors'
                                    onClick={toggleDrawer}
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer Links */}
          <div className='border-t border-gray-200 p-4 flex justify-around text-sm text-gray-700'>
            <Link
              href='/page/customer-service'
              className='flex items-center hover:underline'
              onClick={toggleDrawer}
            >
              <span className='mr-2'>?</span> {t('Header.Customer Service')}
            </Link>
            <Link
              href='/account'
              className='flex items-center hover:underline'
              onClick={toggleDrawer}
            >
              <UserCircle className='h-4 w-4 mr-2' /> {t('Header.Your account')}
            </Link>
          </div>

          {/* Call to Action Section */}
          <div className='border-t border-gray-200 p-6'>
            <p className='text-sm text-gray-600 mb-4'>
              {session
                ? `${t('Header.Hello')}, ${session.user?.name}`
                : 'Become a Graphico Member for the best products, inspiration and stories in sport.'}
            </p>
            <div className='flex flex-col space-y-4'>
              {!session ? (
                <>
                  <Button
                    asChild
                    className='w-full bg-gray-900 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition duration-150 ease-in-out rounded-md border-none'
                  >
                    <Link href='/sign-in' onClick={toggleDrawer}>
                      Join Us
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className='w-full bg-gray-900 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition duration-150 ease-in-out rounded-md border-none'
                  >
                    <Link href='/sign-in' onClick={toggleDrawer}>
                      Sign In
                    </Link>
                  </Button>
                </>
              ) : (
                <form action={SignOut} className='w-full'>
                  <Button
                    className='w-full bg-gray-900 text-white font-semibold hover:bg-gray-700 border-none'
                    onClick={toggleDrawer}
                  >
                    {t('Header.Sign out')}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay with Blur Effect */}
      {isOpen && (
        <div
          className='fixed inset-0 backdrop-blur-sm bg-gray-500/20 z-40'
          onClick={toggleDrawer}
        />
      )}
    </>
  )
}
