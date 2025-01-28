import { ExchangeRate } from '../exchangeRates'

interface CalculateExchangeAmountParams {
  amount: number
  fromCurrency: string
  toCurrency: string
  rates: ExchangeRate[]
  isBuy: boolean
}

export function calculateExchangeAmount({
  amount,
  fromCurrency,
  toCurrency,
  rates,
  isBuy
}: CalculateExchangeAmountParams): number {
  if (amount === 0) return 0

  // Handle direct conversion (e.g., USD/IRR)
  const directPair = `${fromCurrency}/${toCurrency}`
  const directRate = rates.find(r => r.pair === directPair)
  if (directRate) {
    return amount * (isBuy ? directRate.buyRate : directRate.sellRate)
  }

  // Handle inverse conversion (e.g., IRR/USD)
  const inversePair = `${toCurrency}/${fromCurrency}`
  const inverseRate = rates.find(r => r.pair === inversePair)
  if (inverseRate) {
    return amount / (isBuy ? inverseRate.sellRate : inverseRate.buyRate)
  }

  // Handle cross-rate conversion through IRR (e.g., EUR/USD)
  const fromPair = rates.find(r => r.pair === `${fromCurrency}/IRR`)
  const toPair = rates.find(r => r.pair === `${toCurrency}/IRR`)
  
  if (fromPair && toPair) {
    // Convert to IRR first
    const irrAmount = amount * (isBuy ? fromPair.buyRate : fromPair.sellRate)
    // Then convert from IRR to target currency
    return irrAmount / (isBuy ? toPair.sellRate : toPair.buyRate)
  }

  throw new Error('Exchange rate not found')
} 