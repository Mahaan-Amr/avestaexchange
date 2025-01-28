'use client'

import { notFound } from 'next/navigation'
import { Locale, locales } from '@/lib/utils/i18n'
import { ContactForm } from '@/components/sections/ContactForm'

interface Props {
  params: {
    lang: Locale
  }
}

export default function ContactPage({ params: { lang } }: Props) {
  if (!locales.includes(lang)) {
    notFound()
  }

  return (
    <main>
      <ContactForm lang={lang} />
    </main>
  )
} 