import { notFound } from 'next/navigation'
import { Locale, locales } from '@/lib/utils/i18n'
import { AboutUs } from '@/components/sections/AboutUs'

interface Props {
  params: {
    lang: string
  }
}

export default async function AboutPage({ params: { lang } }: Props) {
  if (!locales.includes(lang as Locale)) {
    notFound()
  }

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between ${lang === 'fa' ? 'font-vazirmatn' : 'font-sans'}`}>
      <div className="container">
        <AboutUs lang={lang as Locale} />
      </div>
    </main>
  )
} 