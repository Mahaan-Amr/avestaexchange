'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline'
import { Locale, dictionary } from '@/lib/utils/i18n'
import { ExchangeRate, getCachedRates } from '@/lib/services/exchangeRates'

interface ExchangeCalculatorProps {
  lang: Locale
}

export function ExchangeCalculator({ lang }: ExchangeCalculatorProps) {
  const [amount, setAmount] = useState<string>('')
  const [fromCurrency, setFromCurrency] = useState<string>('USD')
  const [toCurrency, setToCurrency] = useState<string>('IRR')
  const [result, setResult] = useState<number | null>(null)
  const [rates, setRates] = useState<ExchangeRate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const isRTL = lang === 'fa'
  const t = dictionary[lang].exchangeRates

  // Only show currencies we have rates for
  const currencies = ['USD', 'EUR', 'GBP', 'AED', 'IRR']

  // Fetch rates with retry logic
  useEffect(() => {
    let mounted = true
    let retryCount = 0
    const MAX_RETRIES = 3
    const RETRY_DELAY = 5000

    const fetchRates = async () => {
      try {
        setIsUpdating(true)
        const newRates = await getCachedRates()
        if (mounted) {
          setRates(newRates)
          setError(null)
          retryCount = 0
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

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  // Calculate result whenever inputs change
  useEffect(() => {
    if (amount && fromCurrency && toCurrency && rates.length > 0) {
      const numAmount = parseFloat(amount)
      if (isNaN(numAmount)) {
        setResult(null)
        return
      }

      try {
        if (fromCurrency === toCurrency) {
          setResult(numAmount)
          return
        }

        // If converting to IRR
        if (toCurrency === 'IRR') {
          const rate = rates.find(r => r.pair === `${fromCurrency}/IRR`)
          if (rate) {
            setResult(numAmount * rate.buyRate)
            return
          }
        }

        // If converting from IRR
        if (fromCurrency === 'IRR') {
          const rate = rates.find(r => r.pair === `${toCurrency}/IRR`)
          if (rate) {
            setResult(numAmount / rate.sellRate)
            return
          }
        }

        // Cross rate conversion (e.g., EUR to USD)
        const fromRate = rates.find(r => r.pair === `${fromCurrency}/IRR`)
        const toRate = rates.find(r => r.pair === `${toCurrency}/IRR`)
        
        if (fromRate && toRate) {
          // Convert to IRR first, then to target currency
          const irrAmount = numAmount * fromRate.buyRate
          setResult(irrAmount / toRate.sellRate)
        } else {
          setResult(null)
        }
      } catch (err) {
        console.error('Error calculating exchange:', err)
        setResult(null)
      }
    } else {
      setResult(null)
    }
  }, [amount, fromCurrency, toCurrency, rates])

  if (loading) {
    return (
      <div className="w-full bg-white dark:bg-gray-900 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full bg-white dark:bg-gray-900 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center mb-8">
          <div className="sm:flex-auto">
            <h2 className={`text-2xl font-semibold leading-6 text-gray-900 dark:text-gray-100 ${isRTL ? 'font-vazirmatn text-right' : ''}`}>
              {t.calculator}
            </h2>
            <p className={`mt-2 text-sm text-gray-700 dark:text-gray-300 ${isRTL ? 'font-vazirmatn text-right' : ''}`}>
              {t.calculatorDescription}
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

        <div className="grid grid-cols-1 gap-6">
          {/* Amount Input */}
          <div>
            <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'font-vazirmatn text-right' : ''}`}>
              {t.amount}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${isRTL ? 'font-vazirmatn text-right' : ''}`}
              placeholder="0.00"
            />
          </div>

          {/* Currency Selection */}
          <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
            <div>
              <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'font-vazirmatn text-right' : ''}`}>
                {t.from}
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${isRTL ? 'font-vazirmatn text-right' : ''}`}
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSwapCurrencies}
              className="mt-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowsRightLeftIcon className="h-5 w-5 text-gray-500" />
            </button>

            <div>
              <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'font-vazirmatn text-right' : ''}`}>
                {t.to}
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${isRTL ? 'font-vazirmatn text-right' : ''}`}
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result */}
          {result !== null && (
            <div className="mt-4">
              <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'font-vazirmatn text-right' : ''}`}>
                {t.result}
              </label>
              <AnimatePresence mode="wait">
                <motion.div
                  key={result}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`text-2xl font-semibold text-gray-900 dark:text-gray-100 ${isRTL ? 'font-vazirmatn text-right' : ''}`}
                >
                  {formatNumber(result)} {toCurrency}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 