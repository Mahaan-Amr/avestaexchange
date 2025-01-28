import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.role || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const [
      totalUsers,
      activeExchangeRates,
      testimonials,
      faqs,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.exchangeRate.count(),
      prisma.testimonial.count(),
      prisma.fAQ.count(),
    ])

    return NextResponse.json({
      totalUsers,
      activeExchangeRates,
      testimonials,
      faqs,
    })
  } catch (error) {
    console.error('Failed to fetch metrics:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 