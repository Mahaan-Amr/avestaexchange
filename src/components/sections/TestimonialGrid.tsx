'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Locale } from '@/lib/utils/i18n'

interface TestimonialGridProps {
  lang: Locale
}

const testimonials = [
  {
    id: 1,
    content: "Avesta Exchange provided excellent service for my university tuition payment. Fast, reliable, and great rates!",
    author: {
      name: "Sarah Chen",
      role: "International Student",
      image: "/testimonials/sarah-chen.jpg"
    }
  },
  {
    id: 2,
    content: "As a business owner, I appreciate their professional approach to corporate transfers. Their team is always responsive.",
    author: {
      name: "Michael Brown",
      role: "CEO, TechStart Inc.",
      image: "/testimonials/michael-brown.jpg"
    }
  },
  {
    id: 3,
    content: "The best exchange rates I have found, and their customer service is top-notch. Highly recommended!",
    author: {
      name: "Ali Reza",
      role: "Regular Customer",
      image: "/testimonials/ali-reza.jpg"
    }
  },
  {
    id: 4,
    content: "Their platform made it easy to handle my immigration-related payments. Very transparent process.",
    author: {
      name: "Emma Wilson",
      role: "Immigration Client",
      image: "/testimonials/emma-wilson.jpg"
    }
  },
  {
    id: 5,
    content: "Quick transfers and competitive rates. They have been my go-to exchange service for years.",
    author: {
      name: "David Park",
      role: "Business Client",
      image: "/testimonials/david-park.jpg"
    }
  },
  {
    id: 6,
    content: "Their financial consulting service helped me make informed decisions about international investments.",
    author: {
      name: "Maria Garcia",
      role: "Investment Client",
      image: "/testimonials/maria-garcia.jpg"
    }
  }
]

export function TestimonialGrid({ lang }: TestimonialGridProps) {
  const isRTL = lang === 'fa'

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={item}
              className="flex flex-col justify-between bg-gray-50 dark:bg-gray-800 px-6 py-8 rounded-2xl"
            >
              <blockquote className={`text-lg font-medium text-gray-900 dark:text-gray-100 ${isRTL ? 'font-vazirmatn' : ''}`}>
                {testimonial.content}
              </blockquote>
              <div className="mt-8 flex items-center gap-x-4">
                <div className="relative h-10 w-10 rounded-full">
                  <Image
                    src={testimonial.author.image}
                    alt={testimonial.author.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className={`font-semibold text-gray-900 dark:text-gray-100 ${isRTL ? 'font-vazirmatn' : ''}`}>
                    {testimonial.author.name}
                  </div>
                  <div className={`text-gray-600 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
                    {testimonial.author.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
} 