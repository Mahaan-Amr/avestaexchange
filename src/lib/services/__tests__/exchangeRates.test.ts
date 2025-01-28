import { getCachedRates, getRateLimitStatus, ExchangeRate } from '../exchangeRates'

describe('Exchange Rates Service', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = jest.fn()
  })

  it('should fetch and transform exchange rates correctly', async () => {
    // Mock API response
    const mockApiResponse = {
      result: 'success',
      conversion_rates: {
        USD: 1,
        IRR: 50000,
        EUR: 0.85,
        GBP: 0.73,
        AED: 3.67
      }
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse)
    })

    const rates = await getCachedRates()

    // Verify rate structure
    expect(rates).toBeInstanceOf(Array)
    expect(rates.length).toBe(4) // USD/IRR, EUR/IRR, GBP/IRR, AED/IRR

    // Check first rate (USD/IRR)
    const usdRate = rates.find(r => r.pair === 'USD/IRR')
    expect(usdRate).toBeDefined()
    if (usdRate) {
      expect(usdRate.baseRate).toBe(50000)
      expect(usdRate.buyMarkup).toBe(2)
      expect(usdRate.sellMarkup).toBe(2)
      expect(usdRate.buyRate).toBe(51000) // baseRate * (1 + 2%)
      expect(usdRate.sellRate).toBe(51000) // baseRate * (1 + 2%)
    }

    // Check rate limit tracking
    const status = getRateLimitStatus()
    expect(status.remainingCalls).toBeLessThan(30)
  })

  it('should use cache when rate limit is exceeded', async () => {
    // First call to populate cache
    const mockApiResponse = {
      result: 'success',
      conversion_rates: {
        USD: 1,
        IRR: 50000,
        EUR: 0.85,
        GBP: 0.73,
        AED: 3.67
      }
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse)
    })

    await getCachedRates()

    // Reset fetch mock to verify it's not called again
    ;(global.fetch as jest.Mock).mockClear()

    // Make multiple calls to exceed rate limit
    for (let i = 0; i < 35; i++) {
      const rates = await getCachedRates()
      expect(rates).toBeInstanceOf(Array)
      expect(rates.length).toBe(4)
    }

    // Verify fetch was not called after cache was populated
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('should simulate rate changes for cached data', async () => {
    // First call to populate cache
    const mockApiResponse = {
      result: 'success',
      conversion_rates: {
        USD: 1,
        IRR: 50000,
        EUR: 0.85,
        GBP: 0.73,
        AED: 3.67
      }
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse)
    })

    const initialRates = await getCachedRates()
    const secondRates = await getCachedRates()

    // Verify rates are slightly different due to simulation
    initialRates.forEach((initialRate, index) => {
      const secondRate = secondRates[index]
      expect(secondRate.baseRate).not.toBe(initialRate.baseRate)
      expect(Math.abs(secondRate.baseRate - initialRate.baseRate) / initialRate.baseRate).toBeLessThan(0.001) // Max 0.1% change
    })
  })
}) 