'use client'

import { motion } from 'framer-motion'
import { ShieldCheckIcon, SparklesIcon, RocketLaunchIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { Locale, getDirection } from '@/lib/utils/i18n'
import { dictionary } from '@/lib/utils/i18n'

interface ValuesProps {
  lang: Locale
}

export default function Values({ lang }: ValuesProps) {
  const dict = dictionary[lang].about
  const isRTL = getDirection(lang) === 'rtl'

  const icons = {
    'value-1': ShieldCheckIcon,  // Trust
    'value-2': SparklesIcon,     // Excellence
    'value-3': RocketLaunchIcon, // Innovation
    'value-4': LockClosedIcon,   // Security
  }

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
    <section className="py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${isRTL ? 'font-vazirmatn' : ''}`}>
            {dict.values.title}
          </h2>
          <p className={`text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto ${isRTL ? 'font-vazirmatn' : ''}`}>
            {dict.values.mission}
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {dict.values.items.map((value) => {
            const Icon = icons[value.id as keyof typeof icons]
            return (
              <motion.div
                key={value.id}
                variants={item}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
              >
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 mb-4">
                  <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isRTL ? 'font-vazirmatn' : ''}`}>
                  {value.title}
                </h3>
                <p className={`text-gray-600 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
                  {value.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
} 