import { seedDatabase } from '@/lib/seed'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    await seedDatabase()

    // Seed testimonials
    await prisma.testimonial.createMany({
      data: [
        {
          name: 'John Smith',
          role: 'Business Owner',
          content: 'Avesta Exchange provided excellent service for my international money transfers. Their rates are competitive and the process is smooth.',
          rating: 5,
          language: 'en',
          isActive: true
        },
        {
          name: 'Sarah Johnson',
          role: 'Student',
          content: 'I regularly use Avesta Exchange for sending money to my family. Their customer service is outstanding and the transactions are always fast.',
          rating: 5,
          language: 'en',
          isActive: true
        },
        {
          name: 'علی رضایی',
          role: 'تاجر',
          content: 'صرافی آوستا بهترین نرخ‌ها و سریع‌ترین خدمات را ارائه می‌دهد. من همیشه از خدمات آنها راضی بوده‌ام.',
          rating: 5,
          language: 'fa',
          isActive: true
        }
      ]
    })

    // Seed FAQs
    await prisma.fAQ.createMany({
      data: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept various payment methods including bank transfers, debit cards, and cash payments at our physical locations.',
          category: 'payments',
          language: 'en',
          order: 1,
          isActive: true
        },
        {
          question: 'How long do transfers typically take?',
          answer: 'Most transfers are processed within 24-48 hours. However, the exact time can vary depending on the destination country and payment method.',
          category: 'transfers',
          language: 'en',
          order: 2,
          isActive: true
        },
        {
          question: 'چه روش‌های پرداختی را می‌پذیرید؟',
          answer: 'ما روش‌های مختلف پرداخت از جمله انتقال بانکی، کارت‌های نقدی و پرداخت نقدی در شعب فیزیکی را می‌پذیریم.',
          category: 'payments',
          language: 'fa',
          order: 1,
          isActive: true
        },
        {
          question: 'انتقال پول معمولاً چقدر طول می‌کشد؟',
          answer: 'اکثر انتقال‌ها در عرض 24-48 ساعت پردازش می‌شوند. با این حال، زمان دقیق بسته به کشور مقصد و روش پرداخت متفاوت است.',
          category: 'transfers',
          language: 'fa',
          order: 2,
          isActive: true
        }
      ]
    })

    console.log('Database seeded successfully')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

main() 