'use client'

import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { dictionary } from '@/lib/utils/i18n'

export function Navigation() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const lang = pathname.split('/')[1] as 'en' | 'fa'
  const t = dictionary[lang].navigation
  const isRTL = lang === 'fa'

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const switchLanguage = () => {
    const newLang = lang === 'en' ? 'fa' : 'en'
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`)
    window.location.href = newPath
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const navigation = [
    { name: t.home, href: `/${lang}` },
    { name: t.about, href: `/${lang}/about` },
    { name: t.services, href: `/${lang}/services` },
    { name: t.testimonials, href: `/${lang}/testimonials` },
    { name: t.faqs, href: `/${lang}/faqs` },
    { name: t.contact, href: `/${lang}/contact` }
  ]

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href={`/${lang}`} className={`text-xl font-bold text-blue-600 ${isRTL ? 'font-vazirmatn' : ''}`}>
                {isRTL ? 'صرافی آوستا' : 'Avesta Exchange'}
              </Link>
            </div>
            <div className={`hidden sm:ml-6 sm:flex ${isRTL ? 'sm:mr-6 sm:ml-0 flex-row-reverse' : ''} sm:space-x-8 ${isRTL ? 'sm:space-x-reverse' : ''}`}>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                    isActive(item.href)
                      ? 'border-blue-500 text-gray-900 dark:text-gray-100'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-200'
                  } ${isRTL ? 'font-vazirmatn' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.72 9.72 0 003 11.25C3 16.635 7.365 21 12.75 21a9.72 9.72 0 01-1.998-3.748z" />
                </svg>
              )}
            </button>
            <button
              onClick={switchLanguage}
              className={`px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 ${isRTL ? 'font-vazirmatn' : ''}`}
            >
              {lang === 'en' ? 'فارسی' : 'English'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 