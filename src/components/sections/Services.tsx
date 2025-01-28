'use client'

import { ServiceCard } from '@/components/ui/ServiceCard'
import {
  AcademicCapIcon,
  ArrowPathIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'
import { dictionary } from '@/lib/utils/i18n'
import { Locale } from '@/lib/utils/i18n'

interface ServicesProps {
  locale: Locale
}

const serviceDescriptions = {
  en: {
    universityTuition: 'Secure and efficient tuition payments for international students.',
    personalRemittances: 'Fast and reliable personal money transfers worldwide.',
    corporateRemittances: 'Professional corporate transfer solutions for businesses.',
    cryptocurrencies: 'Modern cryptocurrency exchange and transfer services.',
    immigration: 'Hassle-free payments for immigration-related matters.',
    consulting: 'Expert financial advice and investment consulting.',
  },
  fa: {
    universityTuition: 'پرداخت امن و کارآمد شهریه برای دانشجویان بین‌المللی',
    personalRemittances: 'انتقال سریع و مطمئن پول شخصی در سراسر جهان',
    corporateRemittances: 'راهکارهای حرفه‌ای انتقال ارز برای کسب‌وکارها',
    cryptocurrencies: 'خدمات مدرن تبادل و انتقال ارزهای دیجیتال',
    immigration: 'پرداخت‌های آسان برای امور مهاجرتی',
    consulting: 'مشاوره تخصصی مالی و سرمایه‌گذاری',
  },
}

export function Services({ locale }: ServicesProps) {
  const t = dictionary[locale].services
  const descriptions = serviceDescriptions[locale]

  const services = [
    {
      title: t.universityTuition,
      icon: <AcademicCapIcon className="w-6 h-6" />,
      description: descriptions.universityTuition,
    },
    {
      title: t.personalRemittances,
      icon: <CurrencyDollarIcon className="w-6 h-6" />,
      description: descriptions.personalRemittances,
    },
    {
      title: t.corporateRemittances,
      icon: <BuildingOfficeIcon className="w-6 h-6" />,
      description: descriptions.corporateRemittances,
    },
    {
      title: t.cryptocurrencies,
      icon: <ArrowPathIcon className="w-6 h-6" />,
      description: descriptions.cryptocurrencies,
    },
    {
      title: t.immigration,
      icon: <GlobeAltIcon className="w-6 h-6" />,
      description: descriptions.immigration,
    },
    {
      title: t.consulting,
      icon: <ChartBarIcon className="w-6 h-6" />,
      description: descriptions.consulting,
    },
  ]

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className={`text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl ${locale === 'fa' ? "font-['Vazirmatn']" : ''}`}>
            {t.title}
          </h2>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 