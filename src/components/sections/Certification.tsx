'use client'

import { motion } from 'framer-motion'
import { Locale } from '@/lib/utils/i18n'
import { dictionary } from '@/lib/utils/i18n'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'

interface CertificationProps {
  lang: Locale
}

export function Certification({ lang }: CertificationProps) {
  const dict = dictionary[lang]
  const isRTL = lang === 'fa'

  const FINTRAC_URL = 'https://www10.fintrac-canafe.gc.ca/msb-esm/public/detailed-information/msb-details/7b226d73624f72674e756d626572223a3137303231382c227072696d617279536561726368223a7b226f72674e616d65223a22417665737461222c2273656172636854797065223a317d7d/'

  return (
    <div className={`py-24 sm:py-32 ${isRTL ? 'font-vazirmatn' : ''}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className={`text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl ${isRTL ? 'font-vazirmatn' : ''}`}>
            {dict.certification.title}
          </h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 dark:ring-gray-700 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none"
        >
          <div className="p-8 sm:p-10 lg:flex-auto">
            <div className="flex items-center gap-x-4">
              <h3 className={`flex-none text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 ${isRTL ? 'font-vazirmatn' : ''}`}>
                {dict.certification.fintrac.title}
              </h3>
              <div className="h-px flex-auto bg-gray-100 dark:bg-gray-700" />
              <CheckBadgeIcon className="h-8 w-8 flex-none text-blue-600" aria-hidden="true" />
            </div>
            <p className={`mt-6 text-base leading-7 text-gray-600 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
              {dict.certification.fintrac.description}
            </p>
            <div className="mt-8">
              <p className={`font-semibold text-gray-900 dark:text-gray-100 ${isRTL ? 'font-vazirmatn' : ''}`}>
                {dict.certification.fintrac.code}
              </p>
            </div>
            <div className="mt-10 flex items-center gap-x-4">
              <a
                href={FINTRAC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${isRTL ? 'font-vazirmatn' : ''}`}
              >
                {dict.certification.fintrac.verifyText}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 