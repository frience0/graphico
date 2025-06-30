import { getSetting } from '@/lib/actions/setting.actions'
import { getAllCategories } from '@/lib/actions/product.actions'
import { getTranslations } from 'next-intl/server'
import Navbar from './navbar'
import data from '@/lib/data'

export default async function Header() {
  const settings = await getSetting()
  const site = settings?.site || {
    logo: '/icons/logo.svg',
    name: 'Default Site',
  }
  const categories = await getAllCategories()
  const t = await getTranslations('Header')

  const translations = {
    all: t('All'),
    searchSite: t('Search Site', { name: site.name }),
  }

  return (
    <header className='sticky top-0 z-50'>
      <Navbar
        site={site}
        headerMenus={data.headerMenus}
        categories={categories}
        translations={translations}
      />
    </header>
  )
}
