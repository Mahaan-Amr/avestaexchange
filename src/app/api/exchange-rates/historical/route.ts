import { NextResponse } from 'next/server'
import { fetchLatestRates } from '@/lib/services/exchangeRates'
import { logError } from '@/lib/utils/logger'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const pair = searchParams.get('pair')
    const period = searchParams.get('period')

    if (!pair) {
      return NextResponse.json({ error: 'Currency pair is required' }, { status: 400 })
    }

    if (!period || !['1W', '1M', '3M', '1Y'].includes(period)) {
      return NextResponse.json({ error: 'Invalid period' }, { status: 400 })
    }

    // Get current rate for the pair
    const rates = await fetchLatestRates()
    const currentRate = rates.find(r => r.pair === pair)

    if (!currentRate) {
      return NextResponse.json({ error: 'Currency pair not found' }, { status: 404 })
    }

    // Generate historical data with realistic variations
    const days = period === '1W' ? 7 :
                period === '1M' ? 30 :
                period === '3M' ? 90 :
                365

    const data = []
    const baseRate = currentRate.baseRate
    const trendFactor = currentRate.change / 100 // Convert percentage to decimal
    const volatility = 0.005 // 0.5% daily volatility

    // Generate data points with realistic price movements
    let prevRate = baseRate
    for (let i = days; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      
      // Create more realistic price movements:
      // 1. Use the previous rate as a base
      // 2. Apply random walk with drift
      // 3. Add trend bias based on current change percentage
      const randomWalk = (Math.random() - 0.5) * 2 * volatility // Random between -volatility and +volatility
      const trend = trendFactor / days // Distribute trend over the period
      const dailyChange = prevRate * (1 + randomWalk + trend)
      
      // Ensure rate doesn't deviate too far from base rate (max ±10%)
      const maxDeviation = 0.10
      const minRate = baseRate * (1 - maxDeviation)
      const maxRate = baseRate * (1 + maxDeviation)
      prevRate = Math.min(Math.max(dailyChange, minRate), maxRate)
      
      data.push({
        date: date.toISOString().split('T')[0],
        rate: Math.round(prevRate) // Round to whole numbers for IRR
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    logError('Error fetching historical rates:', error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: 'Failed to fetch historical rates' },
      { status: 500 }
    )
  }
} 