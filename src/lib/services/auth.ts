import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { logError } from '@/lib/utils/logger'

const prisma = new PrismaClient()
const SALT_ROUNDS = 10

interface CreateUserData {
  email: string
  password: string
  name: string
}

export async function createUser(data: CreateUserData) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (existingUser) {
      throw new Error('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS)
    return await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword
      }
    })
  } catch (error: unknown) {
    logError(error, 'Error creating user')
    if (error instanceof Error && error.message === 'Email already exists') {
      throw error
    }
    return undefined
  }
}

export async function validateUser(email: string, password: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return false
    }

    return await bcrypt.compare(password, user.password)
  } catch (error: unknown) {
    logError(error, 'Error validating user')
    return false
  }
}

export async function getUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email }
    })
  } catch (error: unknown) {
    logError(error, 'Error getting user by email')
    return null
  }
}