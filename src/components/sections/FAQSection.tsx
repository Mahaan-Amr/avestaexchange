'use client'

import { useState, useEffect } from 'react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { QuestionMarkCircleIcon, WrenchIcon, CreditCardIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { Locale, getDirection } from '@/lib/utils/i18n'
import { dictionary } from '@/lib/utils/i18n'

interface FAQSectionProps {
  lang: Locale
}

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  language: string
  isActive: boolean
  order: number
}

interface QuickQuestionForm {
  name: string
  email: string
  question: string
}

export default function FAQSection({ lang }: FAQSectionProps) {
  const dict = dictionary[lang].faqs
  const isRTL = getDirection(lang) === 'rtl'

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openFAQs, setOpenFAQs] = useState<string[]>([])
  const [quickQuestion, setQuickQuestion] = useState<QuickQuestionForm>({
    name: '',
    email: '',
    question: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch(`/api/faqs?lang=${lang}`)
        if (!response.ok) {
          throw new Error('Failed to fetch FAQs')
        }
        const data = await response.json()
        setFaqs(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch FAQs')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFAQs()
  }, [lang])

  const handleQuickQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/quick-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quickQuestion),
      })

      if (!response.ok) {
        throw new Error('Failed to submit question')
      }

      setSubmitStatus('success')
      setQuickQuestion({ name: '', email: '', question: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuickQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setQuickQuestion(prev => ({ ...prev, [name]: value }))
  }

  const toggleFAQ = (id: string) => {
    setOpenFAQs(prev =>
      prev.includes(id) ? prev.filter(faqId => faqId !== id) : [...prev, id]
    )
  }

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: 'all', label: dict.allCategories, icon: QuestionMarkCircleIcon },
    { id: 'general', label: dict.categories.general, icon: QuestionMarkCircleIcon },
    { id: 'services', label: dict.categories.services, icon: WrenchIcon },
    { id: 'payments', label: dict.categories.payments, icon: CreditCardIcon },
    { id: 'security', label: dict.categories.security, icon: ShieldCheckIcon },
  ]

  if (isLoading) {
    return (
      <div className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <p className={`text-gray-600 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>Loading FAQs...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <p className={`text-red-500 dark:text-red-400 ${isRTL ? 'font-vazirmatn' : ''}`}>{error}</p>
      </div>
    )
  }

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold mb-4 ${isRTL ? 'font-vazirmatn' : ''}`}>{dict.title}</h2>
        <p className={`text-gray-600 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>{dict.subtitle}</p>
      </div>

      <div className="mb-8">
        <div className="relative max-w-xl mx-auto">
          <MagnifyingGlassIcon className={`h-5 w-5 absolute top-3 ${isRTL ? 'right-3' : 'left-3'} text-gray-400`} />
          <input
            type="text"
            placeholder={dict.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'font-vazirmatn' : ''}`}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelectedCategory(id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors inline-flex items-center gap-2
              ${selectedCategory === id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              } ${isRTL ? 'font-vazirmatn' : ''}`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}
      </div>

      {filteredFAQs.length === 0 ? (
        <p className={`text-center text-gray-500 dark:text-gray-400 my-8 ${isRTL ? 'font-vazirmatn' : ''}`}>{dict.noResults}</p>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className={`font-medium ${isRTL ? 'font-vazirmatn' : ''}`}>{faq.question}</span>
                <ChevronDownIcon
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    openFAQs.includes(faq.id) ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openFAQs.includes(faq.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                      <p className={`text-gray-600 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h3 className={`text-2xl font-bold mb-2 ${isRTL ? 'font-vazirmatn' : ''}`}>{dict.quickQuestion.title}</h3>
          <p className={`text-gray-600 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>{dict.quickQuestion.subtitle}</p>
        </div>

        <form onSubmit={handleQuickQuestionSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'font-vazirmatn' : ''}`}>
              {dict.quickQuestion.name}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={quickQuestion.name}
              onChange={handleQuickQuestionChange}
              className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'font-vazirmatn' : ''}`}
            />
          </div>

          <div>
            <label htmlFor="email" className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'font-vazirmatn' : ''}`}>
              {dict.quickQuestion.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={quickQuestion.email}
              onChange={handleQuickQuestionChange}
              className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'font-vazirmatn' : ''}`}
            />
          </div>

          <div>
            <label htmlFor="question" className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'font-vazirmatn' : ''}`}>
              {dict.quickQuestion.question}
            </label>
            <textarea
              id="question"
              name="question"
              required
              value={quickQuestion.question}
              onChange={handleQuickQuestionChange}
              placeholder={dict.quickQuestion.placeholder}
              rows={4}
              className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${isRTL ? 'font-vazirmatn' : ''}`}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg font-medium text-white transition-colors
                ${isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
                } ${isRTL ? 'font-vazirmatn' : ''}`}
            >
              {isSubmitting ? dict.quickQuestion.submitting : dict.quickQuestion.submit}
            </button>
          </div>

          {submitStatus === 'success' && (
            <p className={`text-center text-green-500 dark:text-green-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
              {dict.quickQuestion.successMessage}
            </p>
          )}

          {submitStatus === 'error' && (
            <p className={`text-center text-red-500 dark:text-red-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
              {dict.quickQuestion.errorMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  )
} 