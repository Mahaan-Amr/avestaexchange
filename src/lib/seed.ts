import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export async function seedDatabase() {
  try {
    // Check if admin user exists
    const adminExists = await prisma.user.findFirst({
      where: {
        email: 'admin@avestaexchange.com'
      }
    })

    if (!adminExists) {
      // Create admin user
      const hashedPassword = await bcrypt.hash('admin123', 10)
      await prisma.user.create({
        data: {
          email: 'admin@avestaexchange.com',
          name: 'Admin User',
          password: hashedPassword,
          role: 'ADMIN'
        }
      })
      console.log('Admin user created successfully')
    }

    // Add more seed data here if needed
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
} 