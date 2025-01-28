import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Locale, locales } from '@/lib/utils/i18n'
import { notFound } from 'next/navigation'
import { logError } from '@/lib/utils/logger'
import { Providers } from '@/components/Providers'
import { inter, vazirmatn } from '@/styles/fonts'
import type { Metadata } from 'next'
import '@/styles/globals.css'

interface Props {
  children: React.ReactNode
  params: Promise<{
    lang: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params

  if (!locales.includes(lang as Locale)) {
    notFound()
  }

  return {
    title: 'Avesta Exchange',
    description: 'Your Trusted Currency Exchange Partner',
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fa' }]
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params

  if (!locales.includes(lang as Locale)) {
    logError(`Invalid locale: ${lang}`, 'RootLayout')
    notFound()
  }

  try {
    const locale = lang as Locale
    const isRTL = locale === 'fa'

    return (
      <html lang={lang} dir={isRTL ? 'rtl' : 'ltr'} className={`h-full ${inter.variable} ${vazirmatn.variable}`}>
        <body className={`h-full bg-background text-foreground ${isRTL ? 'font-vazirmatn' : 'font-sans'}`}>
          <Providers>
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-grow">
                {children}
              </main>
              <Footer lang={locale} />
            </div>
          </Providers>
        </body>
      </html>
    )
  } catch (error) {
    logError(error, 'RootLayout')
    throw error
  }
} 