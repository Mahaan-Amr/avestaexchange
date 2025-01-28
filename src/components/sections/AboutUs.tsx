'use client'

import { motion } from 'framer-motion'
import { Locale } from '@/lib/utils/i18n'
import { dictionary } from '@/lib/utils/i18n'
import { BuildingOffice2Icon, UserGroupIcon, ChartBarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

interface AboutUsProps {
  lang: Locale
}

export function AboutUs({ lang }: AboutUsProps) {
  const dict = dictionary[lang]

  const features = [
    {
      name: dict.about.features.experience.title,
      description: dict.about.features.experience.description,
      icon: BuildingOffice2Icon,
    },
    {
      name: dict.about.features.team.title,
      description: dict.about.features.team.description,
      icon: UserGroupIcon,
    },
    {
      name: dict.about.features.rates.title,
      description: dict.about.features.rates.description,
      icon: ChartBarIcon,
    },
    {
      name: dict.about.features.security.title,
      description: dict.about.features.security.description,
      icon: ShieldCheckIcon,
    },
  ]

  return (
    <section className="py-24 sm:py-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {dict.about.title}
        </h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {dict.about.description}
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
      >
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          {features.map((feature) => (
            <motion.div 
              key={feature.name}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col rounded-xl border bg-card p-8 shadow-sm transition-all duration-200 hover:shadow-lg"
            >
              <dt className="flex items-center gap-x-4 text-lg font-semibold leading-7 text-card-foreground">
                <feature.icon className="h-6 w-6 flex-none text-primary" aria-hidden="true" />
                {feature.name}
              </dt>
              <dd className="mt-6 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                <p className="flex-auto">{feature.description}</p>
              </dd>
            </motion.div>
          ))}
        </dl>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mx-auto mt-16 max-w-2xl text-center sm:mt-20"
      >
        <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {dict.about.mission.title}
        </h3>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {dict.about.mission.description}
        </p>
      </motion.div>
    </section>
  )
}