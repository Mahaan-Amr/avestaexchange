import { useState, ChangeEvent } from 'react'
import { FAQ } from '@prisma/client'

interface FAQFormProps {
  faq?: FAQ
  onSubmit: (data: Partial<FAQ>) => void
  onCancel: () => void
}

export function FAQForm({
  faq,
  onSubmit,
  onCancel
}: FAQFormProps) {
  const [formData, setFormData] = useState<Partial<FAQ>>({
    question: faq?.question || '',
    answer: faq?.answer || '',
    category: faq?.category || '',
    order: faq?.order || 1,
    isActive: faq?.isActive ?? true,
    language: faq?.language || 'en'
  })

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleLanguageChange = (value: string) => {
    setFormData(prev => ({ ...prev, language: value }))
  }

  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      question: e.target.value
    }))
  }

  const handleAnswerChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      answer: e.target.value
    }))
  }

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      category: e.target.value
    }))
  }

  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value)) {
      setFormData(prev => ({
        ...prev,
        order: value
      }))
    }
  }

  const handleActiveChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      isActive: e.target.checked
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => handleLanguageChange('en')}
            className={`px-4 py-2 rounded-md ${
              formData.language === 'en'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => handleLanguageChange('fa')}
            className={`px-4 py-2 rounded-md ${
              formData.language === 'fa'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            فارسی
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Question</label>
          <input
            type="text"
            value={formData.question}
            onChange={handleQuestionChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Answer</label>
          <textarea
            value={formData.answer}
            onChange={handleAnswerChange}
            className="w-full px-3 py-2 border rounded-md min-h-[100px]"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <input
            type="text"
            value={formData.category}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Display Order</label>
          <input
            type="number"
            value={formData.order}
            onChange={handleOrderChange}
            className="w-full px-3 py-2 border rounded-md"
            min="1"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={handleActiveChange}
            className="h-4 w-4"
          />
          <label className="text-sm font-medium">Active</label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-md hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          {faq ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
} 