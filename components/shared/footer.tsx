'use client'
import { ChevronUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import useSettingStore from '@/hooks/use-setting-store'
import { i18n } from '@/i18n-config'
import { usePathname, useRouter } from '@/i18n/routing'
import { SelectValue } from '@radix-ui/react-select'
import { useLocale, useTranslations } from 'next-intl'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'

export default function Footer() {
  const router = useRouter()
  const pathname = usePathname()
  const {
    setting: { site, availableCurrencies, currency },
    setCurrency,
  } = useSettingStore()
  const { locales } = i18n

  const locale = useLocale()
  const t = useTranslations()

  return (
    <footer className='bg-gray-100 text-black underline-link'>
      <div className='w-full'>
        {/* Back to Top Button */}
        <div className='flex py-4 justify-end mr-5'>
          <Button
            variant='ghost'
            className='bg-white left-0 text-black w-12 h-12 rounded-full justify-center border border-gray-300 shadow-md hover:bg-gray-200 transition-colors'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ChevronUp className='h-6 w-6' />
            <span className='sr-only'>{t('Footer.Back to top')}</span>
          </Button>
        </div>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto'>
          {/* Shop Column */}
          <div>
            <h3 className='font-bold mb-2 uppercase'>
              {t('Footer.Get to Know Us')}
            </h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/shop/popular-now'>{t('Footer.Careers')}</Link>
              </li>
              <li>
                <Link href='/shop/new-arrivals'>{t('Footer.Blog')}</Link>
              </li>
              <li>
                <Link href='/shop/sale'>Sale</Link>
              </li>
              <li>
                <Link href='/shop/graphic-tees'>Graphic Tees</Link>
              </li>
              <li>
                <Link href='/shop/blank-tees'>Blank Tees</Link>
              </li>
              <li>
                <Link href='/shop/custom-tees'>Custom Tees</Link>
              </li>
              <li>
                <Link href='/shop/accessories'>Accessories</Link>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h3 className='font-bold mb-2 uppercase'>
              {t('Footer.Let Us Help You')}
            </h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/page/shipping'>
                  {t('Footer.About name', { name: site.name })}
                </Link>
              </li>
              <li>
                <Link href='/page/returns-policy'>
                  {t('Footer.Returns & Replacements')}
                </Link>
              </li>
              <li>
                <Link href='/track-order'>Track Your Order</Link>
              </li>
              <li>
                <Link href='/account'>Your Account</Link>
              </li>
              <li>
                <Link href='/faqs'>FAQs</Link>
              </li>
              <li>
                <Link href='/policies'>Policies</Link>
              </li>
              <li>
                <Link href='/page/help'>Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h3 className='font-bold mb-2 uppercase'>
              {t('Footer.Make Money with Us')}
            </h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/wholesale'>
                  {t('Footer.Sell products on', { name: site.name })}
                </Link>
              </li>
              <li>
                <Link href='/wholesale-login'>
                  {t('Footer.Become an Affiliate')}
                </Link>
              </li>
              <li>
                <Link href='/bulk-custom'>
                  {t('Footer.Advertise Your Products')}
                </Link>
              </li>
              <li>
                <Link href='/gift-cards'>Gift Cards</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup Column */}
          <div>
            <div className='flex items-center space-x-4 mb-2'>
              <Image
                src='/icons/logo.svg'
                alt={`${site.name} logo`}
                width={52}
                height={52}
                className='w-15'
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
              <h3 className='font-bold uppercase'>Newsletter</h3>
            </div>
            <p className='mb-4'>High energy ✨</p>
            <div className='flex space-x-2'>
              <input
                type='email'
                placeholder='Enter email address'
                className='border border-gray-300 px-2 flex-1'
              />
              <Button className='border rounded-none border-gray-300 bg-white text-black hover:bg-gray-200'>
                Sign Up
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='border-t border-gray-300'>
          <div className='max-w-7xl mx-auto py-4 px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            {/* Social Media Icons */}
            <div className='flex items-center space-x-4'>
              <Link href='https://facebook.com'>
                <Image
                  src='/icons/facebook.svg'
                  alt='Mastercard'
                  width={20}
                  height={20}
                />
              </Link>
              <Link href='https://instagram.com'>
                <Image
                  src='/icons/instagram.svg'
                  alt='Mastercard'
                  width={20}
                  height={20}
                />
              </Link>
              <Link href='https://tiktok.com'>
                <Image
                  src='/icons/tiktok.svg'
                  alt='Mastercard'
                  width={20}
                  height={20}
                />
              </Link>
            </div>

            {/* Language and Currency Selectors */}
            <div className='flex items-center space-x-10'>
              <p className='text-sm hidden md:block'>© {site.copyright}</p>

              <Select
                value={locale}
                onValueChange={(value) => {
                  router.push(pathname, { locale: value })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('Footer.Select a language')} />
                </SelectTrigger>
                <SelectContent>
                  {locales.map((lang, index) => (
                    <SelectItem key={index} value={lang.code}>
                      <Link
                        className='w-full flex items-center gap-1'
                        href={pathname}
                        locale={lang.code}
                      >
                        <span className='text-lg'>{lang.icon}</span> {lang.name}
                      </Link>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={currency}
                onValueChange={(value) => {
                  setCurrency(value)
                  window.scrollTo(0, 0)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('Footer.Select a currency')} />
                </SelectTrigger>
                <SelectContent>
                  {availableCurrencies
                    .filter((x) => x.code)
                    .map((currency, index) => (
                      <SelectItem key={index} value={currency.code}>
                        {currency.name} ({currency.code})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Payment Icons */}
            <div className='flex items-center space-x-2'>
              <Image
                src='/icons/apple-pay.svg'
                alt='Apple Pay'
                width={32}
                height={20}
              />
              <Image
                src='/icons/google-pay.svg'
                alt='Google Pay'
                width={32}
                height={20}
              />
              <Image
                src='/icons/mastercard.svg'
                alt='Mastercard'
                width={32}
                height={20}
              />
              <Image
                src='/icons/paypal.svg'
                alt='Paypal'
                width={32}
                height={10}
              />
              <Image
                src='/icons/shopify-pay.svg'
                alt='Shopify Pay'
                width={32}
                height={20}
              />
              <Image src='/icons/visa.svg' alt='Visa' width={32} height={20} />
              <Image src='/icons/amex.svg' alt='Amex' width={32} height={20} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
