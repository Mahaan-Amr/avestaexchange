'use client'

import { useState } from 'react'
import { Locale, dictionary } from '@/lib/utils/i18n'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'
import {
  Instagram as InstagramIcon,
  MessageCircle as TelegramIcon,
  Linkedin as LinkedinIcon,
  MessageSquare as WhatsappIcon,
} from 'lucide-react'

interface ContactFormProps {
  lang: Locale
}

type FormData = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  department: string
  preferredContact: ContactMethod
  attachment?: File | null
}

type FormErrors = {
  [K in keyof FormData]?: string
}

const departments = ['general', 'business', 'support', 'technical'] as const
const contactMethods = ['email', 'phone', 'any'] as const
type ContactMethod = typeof contactMethods[number]

export function ContactForm({ lang }: ContactFormProps) {
  const isRTL = lang === 'fa'
  const t = dictionary[lang].contact

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: 'general',
    preferredContact: 'any',
    attachment: null
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t.errors.nameRequired
    }

    if (!formData.email.trim()) {
      newErrors.email = t.errors.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.errors.emailInvalid
    }

    if (!formData.message.trim()) {
      newErrors.message = t.errors.messageRequired
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // TODO: Implement actual form submission
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        department: 'general',
        preferredContact: 'any',
        attachment: null
      })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, attachment: file }))
  }

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className={`text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl ${isRTL ? 'font-vazirmatn' : ''}`}>
            {t.title}
          </h2>
          <p className={`mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 ${isRTL ? 'font-vazirmatn' : ''}`}>
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className={`space-y-8 ${isRTL ? 'lg:order-2' : ''}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8">
              <h3 className={`text-xl font-semibold mb-6 ${isRTL ? 'font-vazirmatn' : ''}`}>
                {t.info.title}
              </h3>
              <dl className="space-y-6">
                <div className="flex gap-4">
                  <dt>
                    <MapPinIcon className="h-6 w-6 text-blue-600" />
                  </dt>
                  <dd className={`text-gray-700 dark:text-gray-300 ${isRTL ? 'font-vazirmatn' : ''}`}>
                    {t.info.address}
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt>
                    <PhoneIcon className="h-6 w-6 text-blue-600" />
                  </dt>
                  <dd>
                    <a href="tel:+1234567890" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                      +1 (234) 567-890
                    </a>
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt>
                    <EnvelopeIcon className="h-6 w-6 text-blue-600" />
                  </dt>
                  <dd>
                    <a href="mailto:contact@avestaexchange.com" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                      contact@avestaexchange.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8">
              <h3 className={`text-xl font-semibold mb-6 ${isRTL ? 'font-vazirmatn' : ''}`}>
                {t.social.title}
              </h3>
              <div className="flex flex-wrap gap-6">
                <a
                  href="https://instagram.com/avestaexchange"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                >
                  <InstagramIcon className="h-6 w-6" />
                  <span className={isRTL ? 'font-vazirmatn' : ''}>Instagram</span>
                </a>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                >
                  <WhatsappIcon className="h-6 w-6" />
                  <span className={isRTL ? 'font-vazirmatn' : ''}>WhatsApp</span>
                </a>
                <a
                  href="https://t.me/avestaexchange"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                >
                  <TelegramIcon className="h-6 w-6" />
                  <span className={isRTL ? 'font-vazirmatn' : ''}>Telegram</span>
                </a>
                <a
                  href="https://linkedin.com/company/avestaexchange"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                >
                  <LinkedinIcon className="h-6 w-6" />
                  <span className={isRTL ? 'font-vazirmatn' : ''}>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg ${isRTL ? 'lg:order-1' : ''}`}>
            <form onSubmit={handleSubmit} className={`p-8 space-y-6 ${isRTL ? 'font-vazirmatn text-right' : ''}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                    {t.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:bg-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${errors.name ? 'ring-red-500' : ''}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                    {t.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:bg-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${errors.email ? 'ring-red-500' : ''}`}
                    dir="ltr"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                    {t.form.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:bg-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                    {t.form.department}
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>
                        {t.form.departments[dept]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                  {t.form.subject}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:bg-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                  {t.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`mt-2 block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:bg-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${errors.message ? 'ring-red-500' : ''}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                  {t.form.preferredContact}
                </label>
                <div className="mt-2 flex flex-wrap gap-4">
                  {contactMethods.map(method => (
                    <label key={method} className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-600"
                      />
                      <span className="ms-2 text-sm text-gray-700 dark:text-gray-300">
                        {t.form.contactMethods[method as keyof typeof t.form.contactMethods]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                  {t.form.attachment}
                </label>
                <div className="mt-2">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/50 dark:file:text-blue-400"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {t.form.attachmentHelp}
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? t.form.submitting : t.form.submit}
                </button>
              </div>

              {submitStatus === 'success' && (
                <div className="rounded-md bg-green-50 dark:bg-green-900/50 p-4">
                  <p className="text-sm text-green-800 dark:text-green-200">{t.form.successMessage}</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-4">
                  <p className="text-sm text-red-800 dark:text-red-200">{t.form.errorMessage}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
} 