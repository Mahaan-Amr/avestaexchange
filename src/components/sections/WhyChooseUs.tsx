'use client'

import { motion } from 'framer-motion'
import { ShieldCheckIcon, ClockIcon, GlobeAltIcon, BanknotesIcon } from '@heroicons/react/24/outline'
import { Locale } from '@/lib/utils/i18n'
import { dictionary } from '@/lib/utils/i18n'

interface WhyChooseUsProps {
  lang: Locale
}

export function WhyChooseUs({ lang }: WhyChooseUsProps) {
  const isRTL = lang === 'fa'
  const t = dictionary[lang].whyChooseUs

  const features = [
    {
      icon: ShieldCheckIcon,
      title: t.security.title,
      description: t.security.description,
    },
    {
      icon: ClockIcon,
      title: t.speed.title,
      description: t.speed.description,
    },
    {
      icon: GlobeAltIcon,
      title: t.global.title,
      description: t.global.description,
    },
    {
      icon: BanknotesIcon,
      title: t.rates.title,
      description: t.rates.description,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className={`text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl ${isRTL ? 'font-vazirmatn' : ''}`}>
            {t.title}
          </h2>
          <p className={`mt-4 text-lg text-gray-600 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
            {t.subtitle}
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="relative bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute top-6 left-6">
                <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <div className={`mt-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                <h3 className={`text-lg font-medium text-gray-900 dark:text-gray-100 ${isRTL ? 'font-vazirmatn' : ''}`}>
                  {feature.title}
                </h3>
                <p className={`mt-2 text-base text-gray-600 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 