import { notFound } from 'next/navigation'
import { Locale, locales } from '@/lib/utils/i18n'
import FAQSection from '@/components/sections/FAQSection'

interface Props {
  params: {
    lang: string
  }
}

export default async function FAQPage(props: Props) {
  const params = await Promise.resolve(props.params)
  const { lang } = params

  if (!locales.includes(lang as Locale)) {
    notFound()
  }

  return <FAQSection lang={lang as Locale} />
} 