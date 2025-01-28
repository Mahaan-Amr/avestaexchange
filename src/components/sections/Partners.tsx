'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Locale } from '@/lib/utils/i18n'
import { dictionary } from '@/lib/utils/i18n'

interface PartnersProps {
  lang: Locale
}

export function Partners({ lang }: PartnersProps) {
  const isRTL = lang === 'fa'
  const t = dictionary[lang].partners

  // Example partner logos - replace with actual partner logos
  const partners = [
    { id: 1, name: 'Partner 1', logo: '/partners/partner1.svg' },
    { id: 2, name: 'Partner 2', logo: '/partners/partner2.svg' },
    { id: 3, name: 'Partner 3', logo: '/partners/partner3.svg' },
    { id: 4, name: 'Partner 4', logo: '/partners/partner4.svg' },
    { id: 5, name: 'Partner 5', logo: '/partners/partner5.svg' },
    { id: 6, name: 'Partner 6', logo: '/partners/partner6.svg' },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className={`text-2xl font-semibold text-gray-900 dark:text-gray-100 ${isRTL ? 'font-vazirmatn' : ''}`}>
            {t.title}
          </h2>
          <p className={`mt-2 text-base text-gray-600 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
            {t.subtitle}
          </p>
        </div>
        
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              variants={item}
              className="flex items-center justify-center col-span-1 p-4"
            >
              <div className="relative w-32 h-12">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain filter dark:invert"
                  priority
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 