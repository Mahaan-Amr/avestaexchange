import { notFound } from 'next/navigation'
import { Locale, locales } from '@/lib/utils/i18n'
import { Services } from '@/components/sections/Services'

interface Props {
  params: {
    lang: string
  }
}

export default async function ServicesPage(props: Props) {
  const params = await Promise.resolve(props.params)
  const { lang } = params

  if (!locales.includes(lang as Locale)) {
    notFound()
  }

  return <Services locale={lang as Locale} />
} 