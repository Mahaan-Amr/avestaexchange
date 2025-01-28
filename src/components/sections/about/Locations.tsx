'use client'

import { motion } from 'framer-motion'
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { Locale, getDirection } from '@/lib/utils/i18n'
import { dictionary } from '@/lib/utils/i18n'

interface LocationsProps {
  lang: Locale
}

export default function Locations({ lang }: LocationsProps) {
  const dict = dictionary[lang].about
  const isRTL = getDirection(lang) === 'rtl'

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
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${isRTL ? 'font-vazirmatn' : ''}`}>
            {dict.locations.title}
          </h2>
          <p className={`text-lg text-gray-600 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
            {dict.locations.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Headquarters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h3 className={`text-xl font-bold mb-4 ${isRTL ? 'font-vazirmatn' : ''}`}>
              {dict.locations.headquarters.title}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div>
                  <p className={`text-gray-600 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
                    {dict.locations.headquarters.address}
                  </p>
                  <p className={`text-gray-600 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
                    {dict.locations.headquarters.city}, {dict.locations.headquarters.country}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <p className="text-gray-600 dark:text-gray-400" dir="ltr">
                  {dict.locations.headquarters.phone}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <p className="text-gray-600 dark:text-gray-400" dir="ltr">
                  {dict.locations.headquarters.email}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Branches */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {dict.locations.branches.map((branch) => (
              <motion.div
                key={branch.id}
                variants={item}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <h4 className={`text-lg font-bold mb-2 ${isRTL ? 'font-vazirmatn' : ''}`}>
                  {branch.city}
                </h4>
                <p className={`text-gray-500 dark:text-gray-400 mb-2 ${isRTL ? 'font-vazirmatn' : ''}`}>
                  {branch.country}
                </p>
                <p className={`text-gray-600 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
                  {branch.address}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 