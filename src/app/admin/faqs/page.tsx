'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FAQ } from '@prisma/client'
import { DataTable } from '@/components/ui/admin/DataTable'
import { FAQForm } from '@/components/ui/admin/FAQForm'
import { Modal } from '@/components/ui/Modal'
import { Toast } from '@/components/ui/Toast'

export default function FAQsPage() {
  const router = useRouter()
  const [faqs, setFAQs] = useState<FAQ[]>([])
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/admin/faqs')
      if (!response.ok) throw new Error('Failed to fetch FAQs')
      const data = await response.json()
      setFAQs(data)
    } catch {
      showToast('Failed to fetch FAQs', 'error')
    }
  }

  const handleCreate = async (data: Partial<FAQ>) => {
    try {
      const response = await fetch('/api/admin/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Failed to create FAQ')
      
      showToast('FAQ created successfully', 'success')
      setIsModalOpen(false)
      router.refresh()
      fetchFAQs()
    } catch {
      showToast('Failed to create FAQ', 'error')
    }
  }

  const handleUpdate = async (data: Partial<FAQ>) => {
    try {
      const response = await fetch('/api/admin/faqs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, id: selectedFAQ?.id })
      })

      if (!response.ok) throw new Error('Failed to update FAQ')
      
      showToast('FAQ updated successfully', 'success')
      setIsModalOpen(false)
      setSelectedFAQ(null)
      router.refresh()
      fetchFAQs()
    } catch {
      showToast('Failed to update FAQ', 'error')
    }
  }

  const handleDelete = async (faq: FAQ) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return

    try {
      const response = await fetch(`/api/admin/faqs?id=${faq.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete FAQ')
      
      showToast('FAQ deleted successfully', 'success')
      router.refresh()
      fetchFAQs()
    } catch {
      showToast('Failed to delete FAQ', 'error')
    }
  }

  const handleBulkDelete = async (faqs: FAQ[]) => {
    if (!confirm(`Are you sure you want to delete ${faqs.length} FAQs?`)) return

    try {
      await Promise.all(
        faqs.map(faq =>
          fetch(`/api/admin/faqs?id=${faq.id}`, {
            method: 'DELETE'
          })
        )
      )
      
      showToast('FAQs deleted successfully', 'success')
      router.refresh()
      fetchFAQs()
    } catch {
      showToast('Failed to delete FAQs', 'error')
    }
  }

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
  }

  const columns = [
    { key: 'question', title: 'Question' },
    { key: 'answer', title: 'Answer' },
    { key: 'category', title: 'Category' },
    { key: 'order', title: 'Order' },
    {
      key: 'language',
      title: 'Language',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded text-sm ${
          value === 'en' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
        }`}>
          {value === 'en' ? 'English' : 'فارسی'}
        </span>
      )
    },
    {
      key: 'isActive',
      title: 'Status',
      render: (value: boolean) => (
        <span className={`px-2 py-1 rounded text-sm ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ]

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">FAQs</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Add FAQ
        </button>
      </div>

      <DataTable
        columns={columns}
        data={faqs}
        onEdit={setSelectedFAQ}
        onDelete={handleDelete}
        onBulkDelete={handleBulkDelete}
        searchKey="question"
      />

      <Modal
        isOpen={isModalOpen || !!selectedFAQ}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedFAQ(null)
        }}
        title={selectedFAQ ? 'Edit FAQ' : 'Add FAQ'}
      >
        <FAQForm
          faq={selectedFAQ || undefined}
          onSubmit={selectedFAQ ? handleUpdate : handleCreate}
          onCancel={() => {
            setIsModalOpen(false)
            setSelectedFAQ(null)
          }}
        />
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
} 