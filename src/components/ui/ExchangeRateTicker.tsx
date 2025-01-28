'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Locale, dictionary } from '@/lib/utils/i18n'
import { ExchangeRate, getCachedRates } from '@/lib/services/exchangeRates'

interface ExchangeRateTickerProps {
  lang: Locale
}

export function ExchangeRateTicker({ lang }: ExchangeRateTickerProps) {
  const [rates, setRates] = useState<ExchangeRate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const isRTL = lang === 'fa'
  const t = dictionary[lang].exchangeRates

  // Fetch initial rates and set up polling
  useEffect(() => {
    let mounted = true
    let retryCount = 0
    const MAX_RETRIES = 3
    const RETRY_DELAY = 5000 // 5 seconds

    const fetchRates = async () => {
      try {
        setIsUpdating(true)
        const newRates = await getCachedRates()
        if (mounted) {
          setRates(newRates)
          setError(null)
          retryCount = 0 // Reset retry count on success
        }
      } catch (err) {
        if (mounted) {
          console.error('Error fetching rates:', err)
          retryCount++
          
          if (retryCount <= MAX_RETRIES) {
            setError(t.retrying)
            setTimeout(fetchRates, RETRY_DELAY)
          } else {
            setError(t.failedToFetch)
          }
        }
      } finally {
        if (mounted) {
          setLoading(false)
          setIsUpdating(false)
        }
      }
    }

    // Initial fetch
    fetchRates()

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchRates, 30000)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [t.failedToFetch, t.retrying])

  const formatNumber = (num: number) => {
    if (typeof num !== 'number' || isNaN(num)) {
      console.error('Invalid number received:', num)
      return '---'
    }
    return new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US').format(Math.round(num))
  }

  const formatChange = (change: number) => {
    if (typeof change !== 'number' || isNaN(change)) {
      return '0.0'
    }
    return change.toFixed(1)
  }

  if (loading) {
    return (
      <div className="w-full bg-white dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/4 mb-8"></div>
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full bg-white dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className={`text-2xl font-semibold text-red-600 dark:text-red-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
              {error}
            </h2>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className={`text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 ${isRTL ? 'font-vazirmatn' : ''}`}>
              {t.title}
            </h2>
            <p className={`mt-1 text-sm text-gray-500 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
              {t.description}
            </p>
          </div>
          {isUpdating && (
            <div className="mt-4 sm:mt-0 sm:ml-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                {t.updating}
              </span>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 rounded-md bg-red-50 dark:bg-red-900 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className={`text-sm font-medium text-red-800 dark:text-red-200 ${isRTL ? 'font-vazirmatn' : ''}`}>
                  {error}
                </h3>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                <thead>
                  <tr className={isRTL ? 'font-vazirmatn' : ''}>
                    <th scope="col" className={`py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 dark:text-gray-100 sm:pl-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t.currencyPair}
                    </th>
                    <th scope="col" className={`px-3 py-3.5 text-sm font-semibold text-gray-900 dark:text-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t.buy}
                    </th>
                    <th scope="col" className={`px-3 py-3.5 text-sm font-semibold text-gray-900 dark:text-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t.sell}
                    </th>
                    <th scope="col" className={`px-3 py-3.5 text-sm font-semibold text-gray-900 dark:text-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t.change}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {rates.map((rate) => (
                    <tr key={rate.pair} className={`${isRTL ? 'font-vazirmatn' : ''}`}>
                      <td className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-100 sm:pl-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {rate.pair}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={rate.buyRate}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-sm text-gray-900 dark:text-gray-100"
                          >
                            {formatNumber(rate.buyRate)}
                          </motion.div>
                        </AnimatePresence>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={rate.sellRate}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-sm text-gray-900 dark:text-gray-100"
                          >
                            {formatNumber(rate.sellRate)}
                          </motion.div>
                        </AnimatePresence>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={rate.change}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`text-sm font-medium ${
                              rate.change > 0 
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}
                          >
                            {rate.change > 0 ? '+' : ''}{formatChange(rate.change)}%
                          </motion.div>
                        </AnimatePresence>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}