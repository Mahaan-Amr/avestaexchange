import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { locales, defaultLocale } from '@/lib/utils/i18n'

export default async function RootPage() {
  const headersList = await headers()
  const negotiatorHeaders: Record<string, string> = {}
  
  for (const [key, value] of headersList.entries()) {
    negotiatorHeaders[key] = value
  }

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  const locale = matchLocale(languages, locales, defaultLocale)

  redirect(`/${locale}`)
}
