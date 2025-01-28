import bcrypt from 'bcrypt'
import { createUser, validateUser, getUserByEmail } from '../../auth'
import { validateCredentials } from '../../auth/auth'

type MockUser = {
  findUnique: jest.Mock
  create: jest.Mock
}

const mockUser: MockUser = {
  findUnique: jest.fn(),
  create: jest.fn()
}

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    user: mockUser
  }))
}))

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

      mockUser.findUnique.mockResolvedValueOnce(null)
      mockUser.create.mockResolvedValueOnce(mockCreatedUser)

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

      mockUser.findUnique.mockResolvedValueOnce(existingUser)

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

      mockUser.findUnique.mockResolvedValueOnce(mockUser)

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

      mockUser.findUnique.mockResolvedValueOnce(mockUser)

      const result = await validateUser('test@example.com', 'wrongpassword')
      expect(result).toBe(false)
    })

    it('should return false for non-existent user', async () => {
      mockUser.findUnique.mockResolvedValueOnce(null)

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

      mockUser.findUnique.mockResolvedValueOnce(mockUser)

      const result = await getUserByEmail('test@example.com')
      expect(result).toEqual(mockUser)
    })

    it('should return null if user not found', async () => {
      mockUser.findUnique.mockResolvedValueOnce(null)

      const result = await getUserByEmail('nonexistent@example.com')
      expect(result).toBeNull()
    })
  })
})

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('validateCredentials', () => {
    it('should return null for invalid credentials', async () => {
      mockUser.findUnique.mockResolvedValueOnce(null)

      const result = await validateCredentials('test@example.com', 'password123')
      expect(result).toBeNull()
    })

    it('should return user for valid credentials', async () => {
      const mockUserData = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword123',
        role: 'ADMIN'
      }

      mockUser.findUnique.mockResolvedValueOnce(mockUserData)

      const result = await validateCredentials('test@example.com', 'password123')
      expect(result).toEqual(mockUserData)
    })
  })
}) 