'use client'

import { useState, useEffect } from 'react'
import { Locale, dictionary } from '@/lib/utils/i18n'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface ExchangeRateChartProps {
  lang: Locale
}

interface HistoricalRate {
  date: string
  rate: number
}

export function ExchangeRateChart({ lang }: ExchangeRateChartProps) {
  const [selectedPair, setSelectedPair] = useState('USD/IRR')
  const [period, setPeriod] = useState<'1W' | '1M' | '3M' | '1Y'>('1M')
  const [historicalData, setHistoricalData] = useState<HistoricalRate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const isRTL = lang === 'fa'
  const t = dictionary[lang].exchangeRates

  // Only show currency pairs we have rates for
  const currencyPairs = [
    'USD/IRR',
    'EUR/IRR',
    'GBP/IRR',
    'AED/IRR'
  ]

  // Fetch historical data
  useEffect(() => {
    let mounted = true
    let retryCount = 0
    const MAX_RETRIES = 3
    const RETRY_DELAY = 5000

    const fetchHistoricalData = async () => {
      try {
        setIsUpdating(true)
        const response = await fetch(`/api/exchange-rates/historical?pair=${selectedPair}&period=${period}`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch historical data: ${response.status}`)
        }

        const data = await response.json()
        
        if (mounted) {
          setHistoricalData(data)
          setError(null)
          retryCount = 0
        }
      } catch (err) {
        if (mounted) {
          console.error('Error fetching historical data:', err)
          retryCount++
          
          if (retryCount <= MAX_RETRIES) {
            setError(t.retrying)
            setTimeout(fetchHistoricalData, RETRY_DELAY)
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

    fetchHistoricalData()
    
    // Update historical data every 5 minutes
    const interval = setInterval(fetchHistoricalData, 5 * 60 * 1000)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [selectedPair, period, t.retrying, t.failedToFetch])

  const chartData = {
    labels: historicalData.map(d => {
      const date = new Date(d.date)
      return new Intl.DateTimeFormat(lang === 'fa' ? 'fa-IR' : 'en-US', {
        month: 'short',
        day: 'numeric'
      }).format(date)
    }),
    datasets: [
      {
        label: selectedPair,
        data: historicalData.map(d => d.rate),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3
      }
    ]
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(156, 163, 175)',
          font: {
            family: isRTL ? 'Vazirmatn' : 'Inter'
          }
        }
      },
      title: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        titleFont: {
          family: isRTL ? 'Vazirmatn' : 'Inter'
        },
        bodyFont: {
          family: isRTL ? 'Vazirmatn' : 'Inter'
        },
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US', {
                style: 'decimal',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(156, 163, 175, 0.1)'
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          font: {
            family: isRTL ? 'Vazirmatn' : 'Inter'
          },
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          display: true,
          color: 'rgba(156, 163, 175, 0.1)'
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          font: {
            family: isRTL ? 'Vazirmatn' : 'Inter'
          },
          callback: function(value) {
            return new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US', {
              style: 'decimal',
              notation: 'compact',
              compactDisplay: 'short',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(Number(value));
          }
        },
        beginAtZero: false
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className={`text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 ${isRTL ? 'font-vazirmatn' : ''}`}>
              {t.historicalRates}
            </h2>
            <p className={`mt-1 text-sm text-gray-500 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
              {t.historicalRatesDescription}
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

        <div className="flex flex-wrap gap-4 mb-8">
          <div>
            <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'font-vazirmatn text-right' : ''}`}>
              {t.currencyPair}
            </label>
            <select
              value={selectedPair}
              onChange={(e) => setSelectedPair(e.target.value)}
              className={`block rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${isRTL ? 'font-vazirmatn text-right' : ''}`}
            >
              {currencyPairs.map((pair) => (
                <option key={pair} value={pair}>
                  {pair}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'font-vazirmatn text-right' : ''}`}>
              {t.period}
            </label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as '1W' | '1M' | '3M' | '1Y')}
              className={`block rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${isRTL ? 'font-vazirmatn text-right' : ''}`}
            >
              <option value="1W">1 {t.week}</option>
              <option value="1M">1 {t.month}</option>
              <option value="3M">3 {t.months}</option>
              <option value="1Y">1 {t.year}</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/4 mb-8"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ) : error ? (
          <div className="text-center">
            <h2 className={`text-2xl font-semibold text-red-600 dark:text-red-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
              {error}
            </h2>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
            >
              {t.retry}
            </button>
          </div>
        ) : (
          <div className="relative h-[400px]">
            <Line data={chartData} options={options} />
          </div>
        )}
      </div>
    </div>
  )
} 