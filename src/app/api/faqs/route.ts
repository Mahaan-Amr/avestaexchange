import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logError } from '@/lib/utils/logger'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'

    const faqs = await prisma.fAQ.findMany({
      where: {
        language: lang,
        isActive: true
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json(faqs)
  } catch (error) {
    logError('Error fetching FAQs:', error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    )
  }
} 