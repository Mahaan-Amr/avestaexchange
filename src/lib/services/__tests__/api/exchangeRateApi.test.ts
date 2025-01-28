import { fetchLatestRates, getCachedRates } from '../../exchangeRates'

describe('Exchange Rate API', () => {
  const mockSuccessResponse = {
    result: 'success',
    base_code: 'USD',
    conversion_rates: {
      'IRR': 42000,
      'EUR': 0.92,
      'GBP': 0.79,
      'AED': 3.67
    }
  }

  const mockErrorResponse = {
    result: 'error',
    error: 'API request failed'
  }

  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn()
  })

  it('should fetch and transform exchange rates correctly', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSuccessResponse)
    })

    const rates = await fetchLatestRates()
    expect(rates).toHaveLength(4) // Four currency pairs
    expect(rates[0]).toMatchObject({
      pair: 'USD/IRR',
      baseRate: 42000,
      buyMarkup: expect.any(Number),
      sellMarkup: expect.any(Number),
      buyRate: expect.any(Number),
      sellRate: expect.any(Number)
    })
  })

  it('should use cache when rate limit is exceeded', async () => {
    // First call - successful
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSuccessResponse)
    })
    await fetchLatestRates()

    // Second call - error, should use cache
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve(mockErrorResponse)
    })

    const rates = await getCachedRates()
    expect(rates).toBeDefined()
    expect(rates[0]).toMatchObject({
      pair: 'USD/IRR',
      baseRate: expect.any(Number),
      buyMarkup: expect.any(Number),
      sellMarkup: expect.any(Number),
      buyRate: expect.any(Number),
      sellRate: expect.any(Number)
    })
  })

  it('should simulate rate changes for cached data', async () => {
    // First call to populate cache
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSuccessResponse)
    })
    const initialRates = await fetchLatestRates()

    // Get cached rates with simulation
    const updatedRates = await getCachedRates()
    
    expect(updatedRates[0].baseRate).not.toBe(initialRates[0].baseRate)
    expect(Math.abs(updatedRates[0].baseRate - initialRates[0].baseRate)).toBeLessThanOrEqual(initialRates[0].baseRate * 0.001)
  })
}) 