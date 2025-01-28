'use client'

import { motion } from 'framer-motion'
import { Locale } from '@/lib/utils/i18n'
import { dictionary } from '@/lib/utils/i18n'

interface StatisticsProps {
  lang: Locale
}

export function Statistics({ lang }: StatisticsProps) {
  const isRTL = lang === 'fa'
  const t = dictionary[lang].statistics

  const stats = [
    { id: 1, value: '50K+', label: t.customers },
    { id: 2, value: '$100M+', label: t.volume },
    { id: 3, value: '30+', label: t.countries },
    { id: 4, value: '99.9%', label: t.satisfaction },
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
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  }

  return (
    <section className="py-24 bg-blue-600 dark:bg-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={item}
              className="text-center"
            >
              <dt className={`text-4xl font-bold text-white mb-2 ${isRTL ? 'font-vazirmatn' : ''}`}>
                {stat.value}
              </dt>
              <dd className={`text-blue-100 ${isRTL ? 'font-vazirmatn' : ''}`}>
                {stat.label}
              </dd>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 