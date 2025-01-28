import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { createUser, validateUser, getUserByEmail } from '../../auth'

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn()
    }
  }
  return {
    PrismaClient: jest.fn().mockImplementation(() => mockPrisma)
  }
})

const mockPrisma = (new PrismaClient() as any).user

describe('Authentication Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createUser', () => {
    const mockUserData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    }

    it('should create a new user with hashed password', async () => {
      const hashedPassword = await bcrypt.hash(mockUserData.password, 10)
      const mockCreatedUser = {
        id: '1',
        email: mockUserData.email,
        password: hashedPassword,
        name: mockUserData.name,
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      mockPrisma.findUnique.mockResolvedValueOnce(null)
      mockPrisma.create.mockResolvedValueOnce(mockCreatedUser)

      const result = await createUser(mockUserData)
      expect(result).toBeDefined()
      if (result) {
        expect(result.email).toBe(mockUserData.email)
        expect(result.name).toBe(mockUserData.name)
        expect(result.password).not.toBe(mockUserData.password)
        const isValidPassword = await bcrypt.compare(mockUserData.password, result.password)
        expect(isValidPassword).toBe(true)
      }
    })

    it('should throw error if email already exists', async () => {
      const existingUser = {
        id: '1',
        email: mockUserData.email,
        password: 'hashedPassword',
        name: 'Existing User',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      mockPrisma.findUnique.mockResolvedValueOnce(existingUser)

      await expect(createUser(mockUserData)).rejects.toThrow('Email already exists')
    })
  })

  describe('validateUser', () => {
    it('should return true for valid credentials', async () => {
      const password = 'password123'
      const hashedPassword = await bcrypt.hash(password, 10)
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: hashedPassword,
        name: 'Test User',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      mockPrisma.findUnique.mockResolvedValueOnce(mockUser)

      const result = await validateUser('test@example.com', password)
      expect(result).toBe(true)
    })

    it('should return false for invalid password', async () => {
      const password = 'password123'
      const hashedPassword = await bcrypt.hash(password, 10)
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: hashedPassword,
        name: 'Test User',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      mockPrisma.findUnique.mockResolvedValueOnce(mockUser)

      const result = await validateUser('test@example.com', 'wrongpassword')
      expect(result).toBe(false)
    })

    it('should return false for non-existent user', async () => {
      mockPrisma.findUnique.mockResolvedValueOnce(null)

      const result = await validateUser('nonexistent@example.com', 'password123')
      expect(result).toBe(false)
    })
  })

  describe('getUserByEmail', () => {
    it('should return user if found', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test User',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      mockPrisma.findUnique.mockResolvedValueOnce(mockUser)

      const result = await getUserByEmail('test@example.com')
      expect(result).toEqual(mockUser)
    })

    it('should return null if user not found', async () => {
      mockPrisma.findUnique.mockResolvedValueOnce(null)

      const result = await getUserByEmail('nonexistent@example.com')
      expect(result).toBeNull()
    })
  })
}) 