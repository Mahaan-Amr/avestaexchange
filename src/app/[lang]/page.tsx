import { Services } from '@/components/sections/Services'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { Statistics } from '@/components/sections/Statistics'
import { Partners } from '@/components/sections/Partners'
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel'
import { Certification } from '@/components/sections/Certification'
import { dictionary } from '@/lib/utils/i18n'
import { Locale, locales } from '@/lib/utils/i18n'
import { notFound } from 'next/navigation'
import { logError } from '@/lib/utils/logger'
import { ExchangeRateTicker } from '@/components/ui/ExchangeRateTicker'
import { ExchangeCalculator } from '@/components/ui/ExchangeCalculator'
import { ExchangeRateChart } from '@/components/ui/ExchangeRateChart'

interface Props {
  params: Promise<{
    lang: string
  }>
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fa' }]
}

export default async function HomePage(props: Props) {
  const params = await props.params
  const { lang } = params

  if (!locales.includes(lang as Locale)) {
    logError(`Invalid locale: ${lang}`, 'HomePage')
    notFound()
  }

  try {
    const locale = lang as Locale
    const t = dictionary[locale]
    const isRTL = locale === 'fa'

    return (
      <>
        <div className="relative isolate">
          {/* Background gradient */}
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className={`relative ${isRTL ? 'right' : 'left'}-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:${isRTL ? 'right' : 'left'}-[calc(50%-30rem)] sm:w-[72.1875rem]`}
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>

          {/* Hero content */}
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className={`text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl ${isRTL ? "font-['Vazirmatn']" : ''}`}>
                {t.hero.title}
              </h1>
              <p className={`mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 ${isRTL ? "font-['Vazirmatn']" : ''}`}>
                {t.hero.subtitle}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className={`rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${isRTL ? "font-['Vazirmatn']" : ''}`}
                >
                  {t.hero.getQuote}
                </a>
                <a
                  href="#"
                  className={`text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 ${isRTL ? "font-['Vazirmatn']" : ''}`}
                >
                  {isRTL && <span aria-hidden="true">←</span>}
                  {t.hero.contactUs}
                  {!isRTL && <span aria-hidden="true">→</span>}
                </a>
              </div>
            </div>
          </div>

          {/* Background gradient (bottom) */}
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className={`relative ${isRTL ? 'right' : 'left'}-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:${isRTL ? 'right' : 'left'}-[calc(50%+36rem)] sm:w-[72.1875rem]`}
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>

        {/* Partners Section */}
        <Partners lang={locale} />

        {/* Exchange Rate Table */}
        <ExchangeRateTicker lang={locale} />

        {/* Exchange Rate Calculator */}
        <ExchangeCalculator lang={locale} />

        {/* Historical Rate Chart */}
        <ExchangeRateChart lang={locale} />

        {/* Why Choose Us Section */}
        <WhyChooseUs lang={locale} />

        {/* Statistics Section */}
        <Statistics lang={locale} />

        {/* Services Section */}
        <Services locale={locale} />

        {/* Testimonials Section */}
        <TestimonialsCarousel lang={locale} />

        {/* Certification Section */}
        <Certification lang={locale} />
      </>
    )
  } catch (error) {
    logError(error, 'HomePage')
    throw error
  }
}