'use client'

import { motion } from 'framer-motion'
import { ClockIcon } from '@heroicons/react/24/outline'
import { Locale, getDirection } from '@/lib/utils/i18n'
import { dictionary } from '@/lib/utils/i18n'

interface HistoryProps {
  lang: Locale
}

export default function History({ lang }: HistoryProps) {
  const dict = dictionary[lang].about
  const isRTL = getDirection(lang) === 'rtl'

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="inline-block p-3 rounded-full bg-blue-100 dark:bg-blue-900 mb-6">
          <ClockIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className={`text-3xl font-bold mb-6 ${isRTL ? 'font-vazirmatn' : ''}`}>
          {dict.history.title}
        </h2>
        <p className={`text-lg text-gray-600 dark:text-gray-400 leading-relaxed ${isRTL ? 'font-vazirmatn' : ''}`}>
          {dict.history.content}
        </p>
      </motion.div>
    </section>
  )
} 