import { logError } from '@/lib/utils/logger'

// API configuration
const API_URL = 'https://brsapi.ir/FreeTsetmcBourseApi/Api_Free_Gold_Currency.json'
const ADMIN_RATES_URL = process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/api/admin/exchange-rates` : 'http://localhost:3000/api/admin/exchange-rates'

// Cache configuration
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes in milliseconds

export interface ExchangeRate {
  pair: string
  baseCurrency: string
  quoteCurrency: string
  baseRate: number
  buyMarkup: number
  sellMarkup: number
  buyRate: number
  sellRate: number
  change: number
}

interface CacheEntry {
  timestamp: Date
  rates: ExchangeRate[]
}

// In-memory storage
let cache: CacheEntry | null = null

interface IranianCurrency {
  name: string
  price: number
  time: string
  change: number
}

interface IranianApiResponse {
  currency: IranianCurrency[]
}

// Helper function to convert Toman to IRR
function tomanToIRR(toman: number): number {
  return toman * 10
}

// Helper function to validate currency price
function isValidPrice(price: unknown): price is number {
  return typeof price === 'number' && !isNaN(price) && isFinite(price) && price > 0
}

// Fetch admin-set markups from the database
async function fetchAdminMarkups(): Promise<ExchangeRate[]> {
  try {
    const response = await fetch(ADMIN_RATES_URL)
    if (!response.ok) {
      throw new Error(`Failed to fetch admin markups: ${response.status}`)
    }
    return response.json()
  } catch (error) {
    logError('Error fetching admin markups:', error instanceof Error ? error.message : String(error))
    return []
  }
}

export async function fetchLatestRates(): Promise<ExchangeRate[]> {
  try {
    // Check cache first
    if (cache && (new Date().getTime() - cache.timestamp.getTime()) < CACHE_DURATION) {
      return simulateRateChanges(cache.rates)
    }

    // Fetch both market rates and admin markups
    const [marketResponse, adminMarkups] = await Promise.all([
      fetch(API_URL),
      fetchAdminMarkups()
    ])

    if (!marketResponse.ok) {
      throw new Error(`API request failed with status ${marketResponse.status}`)
    }

    const data = await marketResponse.json() as IranianApiResponse
    
    // Find and convert raw currency rates to IRR
    const usdRate = data.currency.find(c => c.name === 'دلار')
    const eurRate = data.currency.find(c => c.name === 'یورو')
    const gbpRate = data.currency.find(c => c.name === 'پوند')
    const aedRate = data.currency.find(c => c.name === 'درهم امارات')

    if (!usdRate?.price || !isValidPrice(usdRate.price)) {
      throw new Error('Invalid or missing USD rate')
    }
    if (!eurRate?.price || !isValidPrice(eurRate.price)) {
      throw new Error('Invalid or missing EUR rate')
    }
    if (!gbpRate?.price || !isValidPrice(gbpRate.price)) {
      throw new Error('Invalid or missing GBP rate')
    }
    if (!aedRate?.price || !isValidPrice(aedRate.price)) {
      throw new Error('Invalid or missing AED rate')
    }

    // Create rates with admin markups or default markups
    const rates: ExchangeRate[] = [
      createRate('USD/IRR', 'USD', usdRate, adminMarkups),
      createRate('EUR/IRR', 'EUR', eurRate, adminMarkups),
      createRate('GBP/IRR', 'GBP', gbpRate, adminMarkups),
      createRate('AED/IRR', 'AED', aedRate, adminMarkups)
    ]

    // Update cache
    cache = {
      timestamp: new Date(),
      rates
    }

    return rates
  } catch (error) {
    logError('Error fetching exchange rates:', error instanceof Error ? error.message : String(error))
    if (cache) {
      return cache.rates
    }
    throw error
  }
}

function createRate(pair: string, currency: string, marketRate: IranianCurrency, adminMarkups: ExchangeRate[]): ExchangeRate {
  const adminRate = adminMarkups.find(r => r.pair === pair)
  const baseRate = tomanToIRR(marketRate.price)
  const buyMarkup = adminRate?.buyMarkup ?? 1.5
  const sellMarkup = adminRate?.sellMarkup ?? 1

  return {
    pair,
    baseCurrency: currency,
    quoteCurrency: 'IRR',
    baseRate,
    buyMarkup,
    sellMarkup,
    buyRate: baseRate * (1 + buyMarkup / 100),
    sellRate: baseRate * (1 + sellMarkup / 100),
    change: marketRate.change
  }
}

export async function getCachedRates(): Promise<ExchangeRate[]> {
  if (!cache || new Date().getTime() - cache.timestamp.getTime() > CACHE_DURATION) {
    return fetchLatestRates()
  }
  return simulateRateChanges(cache.rates)
}

// Simulate small price variations for cached rates
function simulateRateChanges(rates: ExchangeRate[]): ExchangeRate[] {
  return rates.map(rate => {
    const maxChange = 0.001 // Max 0.1% change
    const randomChange = (Math.random() - 0.5) * maxChange
    
    const baseRate = rate.baseRate * (1 + randomChange)
    const buyRate = baseRate * (1 + rate.buyMarkup / 100)
    const sellRate = baseRate * (1 + rate.sellMarkup / 100)
    
    return {
      ...rate,
      baseRate,
      buyRate,
      sellRate,
      change: rate.change + randomChange * 100
    }
  })
} 