import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import bcrypt from 'bcryptjs'

interface UpdateUserData {
  name?: string | null
  email?: string
  role?: string
  password?: string
}

// Helper function to check admin authorization
async function checkAdminAuth() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.role || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
    return false
  }
  return true
}

export async function GET() {
  try {
    if (!await checkAdminAuth()) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    if (!await checkAdminAuth()) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { name, email, password, role } = body

    if (!email || !password || !role) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return new NextResponse('User already exists', { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    return NextResponse.json(newUser)
  } catch (error) {
    console.error('Failed to create user:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    if (!await checkAdminAuth()) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { id, name, email, password, role } = body

    if (!id) {
      return new NextResponse('Missing user ID', { status: 400 })
    }

    const updateData: UpdateUserData = {
      name,
      email,
      role
    }

    // Only update password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Failed to update user:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    if (!await checkAdminAuth()) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return new NextResponse('Missing user ID', { status: 400 })
    }

    // Prevent deleting the last admin user
    const user = await prisma.user.findUnique({
      where: { id },
      select: { role: true }
    })

    if (user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') {
      const adminCount = await prisma.user.count({
        where: {
          role: {
            in: ['ADMIN', 'SUPER_ADMIN']
          }
        }
      })

      if (adminCount <= 1) {
        return new NextResponse('Cannot delete the last admin user', { status: 400 })
      }
    }

    await prisma.user.delete({
      where: { id }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Failed to delete user:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 