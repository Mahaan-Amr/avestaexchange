import { PrismaClient } from '@prisma/client'
import { 
  setExchangeRateMarkup, 
  getExchangeRateMarkups, 
  validateMarkupValue 
} from '../../admin/rateManagement'

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    exchangeRate: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    }
  }
  return {
    PrismaClient: jest.fn().mockImplementation(() => mockPrisma)
  }
})

const mockPrisma = (new PrismaClient() as any).exchangeRate

describe('Rate Management Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('setExchangeRateMarkup', () => {
    const mockMarkupData = {
      baseCurrency: 'USD',
      quoteCurrency: 'IRR',
      buyMarkup: 2.5,
      sellMarkup: 2.0
    }

    it('should create a new exchange rate markup', async () => {
      const mockCreatedRate = {
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
      }

      mockPrisma.findUnique.mockResolvedValueOnce(null)
      mockPrisma.create.mockResolvedValueOnce(mockCreatedRate)

      const result = await setExchangeRateMarkup(mockMarkupData)
      expect(result).toEqual(mockCreatedRate)
    })

    it('should update existing exchange rate markup', async () => {
      const existingRate = {
        id: '1',
        pair: 'USD/IRR',
        baseCurrency: 'USD',
        quoteCurrency: 'IRR',
        baseRate: 42000,
        buyMarkup: 2.0,
        sellMarkup: 2.0,
        buyRate: 42840,
        sellRate: 42840,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const updatedRate = {
        ...existingRate,
        buyMarkup: 2.5,
        sellMarkup: 2.0,
        updatedAt: new Date()
      }

      mockPrisma.findUnique.mockResolvedValueOnce(existingRate)
      mockPrisma.update.mockResolvedValueOnce(updatedRate)

      const result = await setExchangeRateMarkup(mockMarkupData)
      expect(result).toEqual(updatedRate)
    })

    it('should throw error for invalid markup values', async () => {
      const invalidMarkup = {
        baseCurrency: 'USD',
        quoteCurrency: 'IRR',
        buyMarkup: -1,
        sellMarkup: 2.0
      }

      await expect(setExchangeRateMarkup(invalidMarkup)).rejects.toThrow('Markup cannot be negative')
    })
  })

  describe('getExchangeRateMarkups', () => {
    it('should return all active exchange rate markups', async () => {
      const mockRates = [
        {
          id: '1',
          pair: 'USD/IRR',
          baseCurrency: 'USD',
          quoteCurrency: 'IRR',
          baseRate: 42000,
          buyMarkup: 2.5,
          sellMarkup: 2.0,
          buyRate: 43050,
          sellRate: 42840,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

      mockPrisma.findMany.mockResolvedValueOnce(mockRates)

      const result = await getExchangeRateMarkups()
      expect(result).toEqual(mockRates)
    })

    it('should return empty array when no markups exist', async () => {
      mockPrisma.findMany.mockResolvedValueOnce([])

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