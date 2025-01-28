import { notFound } from 'next/navigation'
import { Locale, locales } from '@/lib/utils/i18n'
import { ContactForm } from '@/components/sections/ContactForm'

interface Props {
  params: Promise<{
    lang: string
  }>
}

export default async function ContactPage(props: Props) {
  const params = await props.params
  const { lang } = params

  if (!locales.includes(lang as Locale)) {
    notFound()
  }

  return (
    <main>
      <ContactForm lang={lang as Locale} />
    </main>
  )
} 