'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Locale, getDirection } from '@/lib/utils/i18n'
import { dictionary } from '@/lib/utils/i18n'

interface TeamProps {
  lang: Locale
}

export default function Team({ lang }: TeamProps) {
  const dict = dictionary[lang].about
  const isRTL = getDirection(lang) === 'rtl'

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
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${isRTL ? 'font-vazirmatn' : ''}`}>
            {dict.team.title}
          </h2>
          <p className={`text-lg text-gray-600 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
            {dict.team.subtitle}
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {dict.team.members.map((member) => (
            <motion.div
              key={member.id}
              variants={item}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${isRTL ? 'font-vazirmatn' : ''}`}>
                  {member.name}
                </h3>
                <p className={`text-blue-600 dark:text-blue-400 mb-4 ${isRTL ? 'font-vazirmatn' : ''}`}>
                  {member.role}
                </p>
                <p className={`text-gray-600 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 