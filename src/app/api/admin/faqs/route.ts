import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { logError } from '@/lib/utils/logger'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const faqs = await prisma.fAQ.findMany({
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

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const { question, answer, category, language, order } = data

    if (!question || !answer || !category || !language) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const faq = await prisma.fAQ.create({
      data: {
        question,
        answer,
        category,
        language,
        order: order || 0
      }
    })

    return NextResponse.json(faq)
  } catch (error) {
    logError('Error creating FAQ:', error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: 'Failed to create FAQ' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const { id, question, answer, category, language, order, isActive } = data

    if (!id) {
      return NextResponse.json(
        { error: 'Missing FAQ ID' },
        { status: 400 }
      )
    }

    const faq = await prisma.fAQ.update({
      where: { id },
      data: {
        question,
        answer,
        category,
        language,
        order,
        isActive
      }
    })

    return NextResponse.json(faq)
  } catch (error) {
    logError('Error updating FAQ:', error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: 'Failed to update FAQ' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Missing FAQ ID' },
        { status: 400 }
      )
    }

    await prisma.fAQ.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logError('Error deleting FAQ:', error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: 'Failed to delete FAQ' },
      { status: 500 }
    )
  }
} 