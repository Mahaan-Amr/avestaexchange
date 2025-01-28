'use client'

import { Locale } from '@/lib/utils/i18n'
import { dictionary } from '@/lib/utils/i18n'
import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

interface FooterProps {
  lang: Locale
}

export function Footer({ lang }: FooterProps) {
  const isRTL = lang === 'fa'
  const t = dictionary[lang]

  const navigation = {
    main: [
      { name: t.navigation.home, href: `/${lang}` },
      { name: t.navigation.services, href: `/${lang}/services` },
      { name: t.navigation.about, href: `/${lang}/about` },
      { name: t.navigation.faqs, href: `/${lang}/faqs` },
      { name: t.navigation.contact, href: `/${lang}/contact` },
    ],
    social: [
      {
        name: 'Facebook',
        href: '#',
        icon: FaFacebook,
      },
      {
        name: 'Twitter',
        href: '#',
        icon: FaTwitter,
      },
      {
        name: 'Instagram',
        href: '#',
        icon: FaInstagram,
      },
      {
        name: 'LinkedIn',
        href: '#',
        icon: FaLinkedin,
      },
    ],
  }

  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <Link
                href={item.href}
                className={`text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 ${isRTL ? 'font-vazirmatn' : ''}`}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>

        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </Link>
          ))}
        </div>

        <p className={`mt-10 text-center text-xs leading-5 text-gray-500 ${isRTL ? 'font-vazirmatn' : ''}`}>
          &copy; {new Date().getFullYear()} Avesta Exchange. All rights reserved.
        </p>
      </div>
    </footer>
  )
} 