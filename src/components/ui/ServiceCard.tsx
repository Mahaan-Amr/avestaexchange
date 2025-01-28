'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface ServiceCardProps {
  title: string
  description: string
  icon: ReactNode
  href?: string
}

export function ServiceCard({ title, description, icon, href }: ServiceCardProps) {
  const pathname = usePathname()
  const isRTL = pathname.startsWith('/fa')

  const Card = (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      <div className="relative px-7 py-6 bg-white dark:bg-gray-800 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
        <div className="flex-shrink-0 w-6 h-6 text-blue-600 dark:text-blue-400">
          {icon}
        </div>
        <div className={`flex-1 space-y-2 ${isRTL ? 'font-vazirmatn text-right' : ''}`}>
          <div className="block font-semibold text-gray-900 dark:text-gray-100 transition duration-150 ease-in-out group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {title}
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        {Card}
      </Link>
    )
  }

  return Card
} 