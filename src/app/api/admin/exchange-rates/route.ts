import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getCachedRates } from '@/lib/services/exchangeRates'

// GET: Fetch all active exchange rates
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get rates from API first
    const apiRates = await getCachedRates()
    
    // Get saved markups from database
    const savedRates = await prisma.exchangeRate.findMany({
      where: { isActive: true }
    })

    // Merge API rates with saved markups
    const mergedRates = apiRates.map(apiRate => {
      const savedRate = savedRates.find(sr => sr.pair === apiRate.pair)
      if (savedRate) {
        return {
          ...apiRate,
          buyMarkup: savedRate.buyMarkup,
          sellMarkup: savedRate.sellMarkup,
          buyRate: apiRate.baseRate * (1 + savedRate.buyMarkup / 100),
          sellRate: apiRate.baseRate * (1 + savedRate.sellMarkup / 100),
        }
      }
      return apiRate
    })
    
    // Return merged rates
    return Response.json(mergedRates)
  } catch (error) {
    console.log('Error fetching exchange rates:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace available'
    })
    return Response.json({ error: 'Failed to fetch exchange rates' }, { status: 500 })
  }
}

// POST: Update exchange rate markups
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    console.log('Received data:', data)

    // Validate required fields
    if (!data.baseCurrency || !data.quoteCurrency || !data.buyMarkup || !data.sellMarkup) {
      console.log('Missing required fields:', { data })
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate numeric values
    if (isNaN(data.buyMarkup) || isNaN(data.sellMarkup)) {
      console.log('Invalid numeric values:', { buyMarkup: data.buyMarkup, sellMarkup: data.sellMarkup })
      return Response.json({ error: 'Invalid numeric values' }, { status: 400 })
    }

    // Get current rates from API
    const apiRates = await getCachedRates()
    const pair = `${data.baseCurrency}/${data.quoteCurrency}`
    const currentRate = apiRates.find(r => r.pair === pair)

    console.log('Current rate:', JSON.stringify(currentRate, null, 2))

    if (!currentRate) {
      console.log('Currency pair not available:', pair)
      return Response.json({ error: 'Currency pair not available' }, { status: 400 })
    }

    // Calculate buy and sell rates using API base rate and provided markups
    const buyRate = currentRate.baseRate * (1 + data.buyMarkup / 100)
    const sellRate = currentRate.baseRate * (1 + data.sellMarkup / 100)

    console.log('Calculated rates:', { buyRate, sellRate })

    // Save to database using upsert to either create or update
    const updatedRate = await prisma.exchangeRate.upsert({
      where: {
        pair: pair
      },
      create: {
        pair,
        baseCurrency: data.baseCurrency,
        quoteCurrency: data.quoteCurrency,
        baseRate: currentRate.baseRate,
        buyMarkup: data.buyMarkup,
        sellMarkup: data.sellMarkup,
        buyRate,
        sellRate,
        isActive: true
      },
      update: {
        baseRate: currentRate.baseRate,
        buyMarkup: data.buyMarkup,
        sellMarkup: data.sellMarkup,
        buyRate,
        sellRate,
        updatedAt: new Date()
      }
    })

    // Return the saved rate
    return Response.json(updatedRate)
  } catch (error) {
    // Log the error without using console.error directly on the error object
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : 'No stack trace available'
    
    console.log('Error updating exchange rate:', {
      message: errorMessage,
      stack: errorStack
    })
    
    return Response.json({
      error: 'Failed to update exchange rate',
      details: errorMessage
    }, { status: 500 })
  }
}