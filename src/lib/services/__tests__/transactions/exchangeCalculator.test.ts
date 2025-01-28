import { calculateExchangeAmount } from '../../transactions/exchangeCalculator'
import { ExchangeRate } from '../../exchangeRates'

describe('Exchange Calculator', () => {
  const mockRates: ExchangeRate[] = [
    {
      pair: 'USD/IRR',
      baseRate: 50000,
      buyMarkup: 2,
      sellMarkup: 2,
      buyRate: 51000,
      sellRate: 51000,
      change: 0
    },
    {
      pair: 'EUR/IRR',
      baseRate: 58823.53,
      buyMarkup: 2.5,
      sellMarkup: 2.5,
      buyRate: 60294.12,
      sellRate: 60294.12,
      change: 0
    }
  ]

  describe('calculateExchangeAmount', () => {
    it('should calculate direct conversion correctly', () => {
      const result = calculateExchangeAmount({
        amount: 100,
        fromCurrency: 'USD',
        toCurrency: 'IRR',
        rates: mockRates,
        isBuy: true
      })

      expect(result).toBe(5100000) // 100 * 51000 (buyRate)
    })

    it('should calculate inverse conversion correctly', () => {
      const result = calculateExchangeAmount({
        amount: 510000,
        fromCurrency: 'IRR',
        toCurrency: 'USD',
        rates: mockRates,
        isBuy: false
      })

      expect(result).toBe(10) // 510000 / 51000 (sellRate)
    })

    it('should calculate cross-rate conversion correctly', () => {
      const result = calculateExchangeAmount({
        amount: 100,
        fromCurrency: 'EUR',
        toCurrency: 'USD',
        rates: mockRates,
        isBuy: true
      })

      // EUR -> IRR -> USD
      // 100 EUR * 60294.12 = 6029412 IRR
      // 6029412 IRR / 51000 = 118.22 USD
      expect(result).toBeCloseTo(118.22, 2)
    })

    it('should handle zero amount', () => {
      const result = calculateExchangeAmount({
        amount: 0,
        fromCurrency: 'USD',
        toCurrency: 'IRR',
        rates: mockRates,
        isBuy: true
      })

      expect(result).toBe(0)
    })

    it('should throw error for invalid currency pair', () => {
      expect(() => calculateExchangeAmount({
        amount: 100,
        fromCurrency: 'GBP',
        toCurrency: 'IRR',
        rates: mockRates,
        isBuy: true
      })).toThrow('Exchange rate not found')
    })

    it('should handle large numbers correctly', () => {
      const result = calculateExchangeAmount({
        amount: 1000000,
        fromCurrency: 'USD',
        toCurrency: 'IRR',
        rates: mockRates,
        isBuy: true
      })

      expect(result).toBe(51000000000) // 1000000 * 51000
    })

    it('should handle small numbers correctly', () => {
      const result = calculateExchangeAmount({
        amount: 0.01,
        fromCurrency: 'USD',
        toCurrency: 'IRR',
        rates: mockRates,
        isBuy: true
      })

      expect(result).toBe(510) // 0.01 * 51000
    })
  })
}) 