'use client'

import { useEffect, useState } from 'react'
import {
  UsersIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'

interface Metrics {
  totalUsers: number
  activeExchangeRates: number
  testimonials: number
  faqs: number
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics>({
    totalUsers: 0,
    activeExchangeRates: 0,
    testimonials: 0,
    faqs: 0,
  })

  useEffect(() => {
    // In a real app, this would fetch from your API
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/admin/metrics')
        const data = await response.json()
        setMetrics(data)
      } catch (error) {
        console.error('Failed to fetch metrics:', error)
      }
    }

    fetchMetrics()
  }, [])

  const stats = [
    {
      name: 'Total Users',
      value: metrics.totalUsers,
      icon: UsersIcon,
      change: '+4.75%',
      changeType: 'positive',
    },
    {
      name: 'Active Exchange Rates',
      value: metrics.activeExchangeRates,
      icon: CurrencyDollarIcon,
      change: '+54.02%',
      changeType: 'positive',
    },
    {
      name: 'Testimonials',
      value: metrics.testimonials,
      icon: ChatBubbleLeftRightIcon,
      change: '+12.05%',
      changeType: 'positive',
    },
    {
      name: 'FAQs',
      value: metrics.faqs,
      icon: QuestionMarkCircleIcon,
      change: '+3.45%',
      changeType: 'positive',
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
      
      <div className="mt-4">
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-blue-500 p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {item.value}
                </p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {item.change}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Add more dashboard components here */}
    </div>
  )
} 