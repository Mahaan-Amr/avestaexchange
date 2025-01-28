import { 
  setExchangeRateMarkup, 
  getExchangeRateMarkups, 
  validateMarkupValue
} from '../../admin/rateManagement'

type MockExchangeRate = {
  findUnique: jest.Mock
  findMany: jest.Mock
  create: jest.Mock
  update: jest.Mock
}

const mockExchangeRate: MockExchangeRate = {
  findUnique: jest.fn(),
  findMany: jest.fn(),
  create: jest.fn(),
  update: jest.fn()
}

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    exchangeRate: mockExchangeRate
  }))
}))

describe('Rate Management Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('setExchangeRateMarkup', () => {
    it('should create a new markup if none exists', async () => {
      mockExchangeRate.findUnique.mockResolvedValueOnce(null)
      mockExchangeRate.create.mockResolvedValueOnce({
        id: '1',
        pair: 'USD/IRR',
        baseCurrency: 'USD',
        quoteCurrency: 'IRR',
        baseRate: 0,
        buyMarkup: 2.5,
        sellMarkup: 2.0,
        buyRate: 0,
        sellRate: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      const result = await setExchangeRateMarkup({
        baseCurrency: 'USD',
        quoteCurrency: 'IRR',
        buyMarkup: 2.5,
        sellMarkup: 2.0
      })
      expect(result).toBeDefined()
      expect(result.buyMarkup).toBe(2.5)
      expect(result.sellMarkup).toBe(2.0)
    })

    it('should update existing markup', async () => {
      mockExchangeRate.findUnique.mockResolvedValueOnce({
        id: '1',
        pair: 'USD/IRR',
        baseCurrency: 'USD',
        quoteCurrency: 'IRR',
        baseRate: 0,
        buyMarkup: 2.0,
        sellMarkup: 1.5,
        buyRate: 0,
        sellRate: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      mockExchangeRate.update.mockResolvedValueOnce({
        id: '1',
        pair: 'USD/IRR',
        baseCurrency: 'USD',
        quoteCurrency: 'IRR',
        baseRate: 0,
        buyMarkup: 2.5,
        sellMarkup: 2.0,
        buyRate: 0,
        sellRate: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      const result = await setExchangeRateMarkup({
        baseCurrency: 'USD',
        quoteCurrency: 'IRR',
        buyMarkup: 2.5,
        sellMarkup: 2.0
      })
      expect(result).toBeDefined()
      expect(result.buyMarkup).toBe(2.5)
      expect(result.sellMarkup).toBe(2.0)
    })
  })

  describe('getExchangeRateMarkups', () => {
    it('should return all active exchange rate markups', async () => {
      const mockRates = [{
        id: '1',
        pair: 'USD/IRR',
        buyMarkup: 2.5,
        sellMarkup: 2.0,
        isActive: true
      }]

      mockExchangeRate.findMany.mockResolvedValueOnce(mockRates)

      const result = await getExchangeRateMarkups()
      expect(result).toEqual(mockRates)
    })

    it('should return empty array when no markups exist', async () => {
      mockExchangeRate.findMany.mockResolvedValueOnce([])

      const result = await getExchangeRateMarkups()
      expect(result).toEqual([])
    })
  })

  describe('validateMarkupValue', () => {
    it('should not throw for valid markup values', () => {
      expect(() => validateMarkupValue(2.5)).not.toThrow()
      expect(() => validateMarkupValue(0)).not.toThrow()
      expect(() => validateMarkupValue(100)).not.toThrow()
    })

    it('should throw for negative markup values', () => {
      expect(() => validateMarkupValue(-1)).toThrow('Markup cannot be negative')
    })

    it('should throw for markup values over 100%', () => {
      expect(() => validateMarkupValue(101)).toThrow('Markup cannot exceed 100%')
    })
  })
})