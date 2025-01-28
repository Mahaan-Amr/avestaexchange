'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Locale, dictionary } from '@/lib/utils/i18n'
import Image from 'next/image'

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  image: string
}

interface TestimonialsCarouselProps {
  lang: Locale
}

export function TestimonialsCarousel({ lang }: TestimonialsCarouselProps) {
  const isRTL = lang === 'fa'
  const t = dictionary[lang].testimonials

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: isRTL ? 'علی محمدی' : 'Ali Mohammadi',
      role: isRTL ? 'دانشجوی بین‌المللی' : 'International Student',
      content: isRTL 
        ? 'بهترین تجربه انتقال ارز برای شهریه دانشگاه. سریع، مطمئن و با قیمت عالی. پشتیبانی ۲۴ ساعته آنها واقعاً کمک بزرگی بود.'
        : 'Best experience for university tuition transfer. Fast, reliable, and great rates. Their 24/7 support was really helpful.',
      image: '/testimonials/student.jpg',
    },
    {
      id: 2,
      name: isRTL ? 'سارا رضایی' : 'Sara Rezaei',
      role: isRTL ? 'صاحب کسب و کار' : 'Business Owner',
      content: isRTL
        ? 'خدمات حرفه‌ای و قابل اعتماد برای حواله‌های تجاری. همیشه بهترین نرخ‌ها را ارائه می‌دهند و در مواقع حساس همیشه پاسخگو هستند.'
        : 'Professional and reliable service for business remittances. They always offer the best rates and are responsive during critical times.',
      image: '/testimonials/business.jpg',
    },
    {
      id: 3,
      name: isRTL ? 'رضا کریمی' : 'Reza Karimi',
      role: isRTL ? 'سرمایه‌گذار' : 'Investor',
      content: isRTL
        ? 'مشاوره عالی برای سرمایه‌گذاری و بهترین راه‌حل‌ها برای انتقال ارز. تیم متخصص آنها همیشه بهترین گزینه‌ها را پیشنهاد می‌دهند.'
        : 'Great investment advice and the best solutions for currency transfers. Their expert team always suggests the best options.',
      image: '/testimonials/investor.jpg',
    },
    {
      id: 4,
      name: isRTL ? 'مریم حسینی' : 'Maryam Hosseini',
      role: isRTL ? 'دانشجوی دکترا' : 'PhD Student',
      content: isRTL
        ? 'انتقال شهریه دانشگاه با صرافی آوستا بسیار راحت و سریع انجام شد. قیمت‌های رقابتی و خدمات عالی آنها را به همه توصیه می‌کنم.'
        : 'Transferring university tuition with Avesta Exchange was very smooth and fast. I recommend their competitive rates and excellent service to everyone.',
      image: '/testimonials/student2.jpg',
    },
    {
      id: 5,
      name: isRTL ? 'امیر تهرانی' : 'Amir Tehrani',
      role: isRTL ? 'مدیر شرکت فناوری' : 'Tech Company Manager',
      content: isRTL
        ? 'برای پرداخت‌های بین‌المللی شرکت، صرافی آوستا بهترین انتخاب است. سرعت بالا، امنیت عالی و قیمت‌های منصفانه.'
        : 'For company international payments, Avesta Exchange is the best choice. High speed, great security, and fair rates.',
      image: '/testimonials/tech.jpg',
    },
    {
      id: 6,
      name: isRTL ? 'زهرا نوری' : 'Zahra Noori',
      role: isRTL ? 'مهاجر' : 'Immigrant',
      content: isRTL
        ? 'در طول فرآیند مهاجرت، صرافی آوستا کمک بزرگی برای انتقال ارز بود. مشاوره‌های دقیق و خدمات سریع آنها را قدردانی می‌کنم.'
        : 'During the immigration process, Avesta Exchange was a great help for currency transfers. I appreciate their accurate advice and quick service.',
      image: '/testimonials/immigrant.jpg',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }, [testimonials.length])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }, [testimonials.length])

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(nextSlide, 8000)
      return () => clearInterval(timer)
    }
  }, [isPaused, nextSlide])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9
    })
  }

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className={`text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl ${isRTL ? 'font-vazirmatn' : ''}`}>
            {t.title}
          </h2>
          <p className={`mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
            {t.subtitle}
          </p>
        </div>

        <div 
          className="mt-16 relative h-[450px] max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 }
              }}
              className="absolute inset-0"
            >
              <div className={`flex flex-col items-center px-4 ${isRTL ? 'font-vazirmatn' : ''}`}>
                <div className="relative w-28 h-28 rounded-full overflow-hidden mb-8 ring-4 ring-blue-100 dark:ring-blue-900">
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <blockquote className="relative">
                  <div className="relative z-10">
                    <div className="text-4xl text-blue-400 dark:text-blue-500 absolute -top-4 -left-4">&ldquo;</div>
                    <p className="text-xl font-medium text-gray-900 dark:text-gray-100 text-center max-w-3xl mx-auto px-8">
                      {testimonials[currentIndex].content}
                    </p>
                    <div className="text-4xl text-blue-400 dark:text-blue-500 absolute -bottom-8 -right-4">&rdquo;</div>
                  </div>
                </blockquote>
                <div className="mt-12 text-center">
                  <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-base text-blue-600 dark:text-blue-400">
                    {testimonials[currentIndex].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevSlide}
            className={`absolute top-1/2 ${isRTL ? 'right-0' : 'left-0'} -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 focus:outline-none transition-all duration-200 hover:scale-110 -translate-x-1/2`}
            aria-label={isRTL ? 'بعدی' : 'Previous'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-blue-600 dark:text-blue-400">
              <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? "M8.25 4.5l7.5 7.5-7.5 7.5" : "M15.75 19.5L8.25 12l7.5-7.5"} />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className={`absolute top-1/2 ${isRTL ? 'left-0' : 'right-0'} -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 focus:outline-none transition-all duration-200 hover:scale-110 translate-x-1/2`}
            aria-label={isRTL ? 'قبلی' : 'Next'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-blue-600 dark:text-blue-400">
              <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? "M15.75 19.5L8.25 12l7.5-7.5" : "M8.25 4.5l7.5 7.5-7.5 7.5"} />
            </svg>
          </button>

          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-blue-600 dark:bg-blue-400'
                    : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                } rounded-full`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 