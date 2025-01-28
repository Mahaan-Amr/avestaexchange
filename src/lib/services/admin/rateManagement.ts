import { PrismaClient } from '@prisma/client'
import { logError } from '@/lib/utils/logger'

export interface SetExchangeRateMarkupData {
  baseCurrency: string
  quoteCurrency: string
  buyMarkup: number
  sellMarkup: number
  baseRate?: number
}

function calculateRate(baseRate: number, markup: number): number {
  return baseRate * (1 + markup / 100)
}

export async function setExchangeRateMarkup(data: SetExchangeRateMarkupData) {
  try {
    validateMarkupValue(data.buyMarkup)
    validateMarkupValue(data.sellMarkup)

    const prisma = new PrismaClient()
    const pair = `${data.baseCurrency}/${data.quoteCurrency}`
    const existingRate = await prisma.exchangeRate.findUnique({
      where: {
        pair
      }
    })

    const rateData = {
      pair,
      baseCurrency: data.baseCurrency,
      quoteCurrency: data.quoteCurrency,
      baseRate: data.baseRate || 0,
      buyMarkup: data.buyMarkup,
      sellMarkup: data.sellMarkup,
      buyRate: calculateRate(data.baseRate || 0, data.buyMarkup),
      sellRate: calculateRate(data.baseRate || 0, data.sellMarkup),
      isActive: true
    }

    if (existingRate) {
      return await prisma.exchangeRate.update({
        where: { id: existingRate.id },
        data: rateData
      })
    } else {
      return await prisma.exchangeRate.create({
        data: rateData
      })
    }
  } catch (error: unknown) {
    logError(error, 'Error setting exchange rate markup')
    throw error
  }
}

export function validateMarkupValue(markup: number) {
  if (markup < 0) {
    throw new Error('Markup cannot be negative')
  }
  if (markup > 100) {
    throw new Error('Markup cannot exceed 100%')
  }
}

export async function getExchangeRateMarkups() {
  const prisma = new PrismaClient()
  return prisma.exchangeRate.findMany({
    where: { isActive: true }
  })
} 