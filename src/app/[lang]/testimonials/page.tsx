import { notFound } from 'next/navigation'
import { Locale, locales } from '@/lib/utils/i18n'
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel'
import { TestimonialGrid } from '@/components/sections/TestimonialGrid'

interface Props {
  params: Promise<{
    lang: string
  }>
}

export default async function TestimonialsPage(props: Props) {
  const params = await props.params
  const { lang } = params

  if (!locales.includes(lang as Locale)) {
    notFound()
  }

  return (
    <>
      <TestimonialsCarousel lang={lang as Locale} />
      <TestimonialGrid lang={lang as Locale} />
    </>
  )
} 