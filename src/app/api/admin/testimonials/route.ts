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

    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(testimonials)
  } catch (error) {
    logError('Error fetching testimonials:', error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
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
    const { name, role, content, image, rating, language } = data

    if (!name || !role || !content || !language) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role,
        content,
        image,
        rating: rating || 5,
        language
      }
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    logError('Error creating testimonial:', error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
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
    const { id, name, role, content, image, rating, language, isActive } = data

    if (!id) {
      return NextResponse.json(
        { error: 'Missing testimonial ID' },
        { status: 400 }
      )
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        name,
        role,
        content,
        image,
        rating,
        language,
        isActive
      }
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    logError('Error updating testimonial:', error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: 'Failed to update testimonial' },
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
        { error: 'Missing testimonial ID' },
        { status: 400 }
      )
    }

    await prisma.testimonial.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logError('Error deleting testimonial:', error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    )
  }
} 