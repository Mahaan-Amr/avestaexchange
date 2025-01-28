import { Locale, locales } from '@/lib/utils/i18n'
import { dictionary } from '@/lib/utils/i18n'
import { notFound } from 'next/navigation'
import { logError } from '@/lib/utils/logger'
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel'
import { TestimonialGrid } from '@/components/sections/TestimonialGrid'

interface Props {
  params: {
    lang: string
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fa' }]
}

export default async function TestimonialsPage({ params }: Props) {
  const { lang } = params

  if (!locales.includes(lang as Locale)) {
    logError(`Invalid locale: ${lang}`, 'TestimonialsPage')
    notFound()
  }

  try {
    const locale = lang as Locale
    const t = dictionary[locale]
    const isRTL = locale === 'fa'

    return (
      <div className="bg-white dark:bg-gray-900">
        {/* Hero section */}
        <div className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
              <h1 className={`mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl ${isRTL ? 'font-vazirmatn' : ''}`}>
                {t.testimonials.title}
              </h1>
              <p className={`mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
                {t.testimonials.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Featured testimonials carousel */}
        <TestimonialsCarousel lang={locale} />

        {/* Grid of all testimonials */}
        <TestimonialGrid lang={locale} />
      </div>
    )
  } catch (error) {
    logError(error, 'TestimonialsPage')
    throw error
  }
} 