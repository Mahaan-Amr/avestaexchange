'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Testimonial } from '@prisma/client'
import { DataTable, Column } from '@/components/ui/admin/DataTable'
import { TestimonialForm } from '@/components/ui/admin/TestimonialForm'
import { Modal } from '@/components/ui/Modal'
import { Toast } from '@/components/ui/Toast'

export default function TestimonialsPage() {
  const router = useRouter()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const fetchTestimonials = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/testimonials')
      if (!response.ok) throw new Error('Failed to fetch testimonials')
      const data = await response.json()
      setTestimonials(data)
    } catch {
      showToast('Failed to fetch testimonials', 'error')
    }
  }, [])

  useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  const handleCreate = async (data: Partial<Testimonial>) => {
    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Failed to create testimonial')
      
      showToast('Testimonial created successfully', 'success')
      setIsModalOpen(false)
      router.refresh()
      fetchTestimonials()
    } catch {
      showToast('Failed to create testimonial', 'error')
    }
  }

  const handleUpdate = async (data: Partial<Testimonial>) => {
    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, id: selectedTestimonial?.id })
      })

      if (!response.ok) throw new Error('Failed to update testimonial')
      
      showToast('Testimonial updated successfully', 'success')
      setIsModalOpen(false)
      setSelectedTestimonial(null)
      router.refresh()
      fetchTestimonials()
    } catch {
      showToast('Failed to update testimonial', 'error')
    }
  }

  const handleDelete = async (testimonial: Testimonial) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      const response = await fetch(`/api/admin/testimonials?id=${testimonial.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete testimonial')
      
      showToast('Testimonial deleted successfully', 'success')
      router.refresh()
      fetchTestimonials()
    } catch {
      showToast('Failed to delete testimonial', 'error')
    }
  }

  const handleBulkDelete = async (testimonials: Testimonial[]) => {
    if (!confirm(`Are you sure you want to delete ${testimonials.length} testimonials?`)) return

    try {
      await Promise.all(
        testimonials.map(testimonial =>
          fetch(`/api/admin/testimonials?id=${testimonial.id}`, {
            method: 'DELETE'
          })
        )
      )
      
      showToast('Testimonials deleted successfully', 'success')
      router.refresh()
      fetchTestimonials()
    } catch {
      showToast('Failed to delete testimonials', 'error')
    }
  }

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
  }

  const columns: Column<Testimonial>[] = [
    { key: 'name', title: 'Name' },
    { key: 'role', title: 'Role' },
    { key: 'content', title: 'Content' },
    {
      key: 'isActive',
      title: 'Status',
      render: (value) => {
        const isActive = Boolean(value)
        return (
          <span className={`px-2 py-1 rounded text-sm ${
            isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        )
      }
    }
  ]

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Add Testimonial
        </button>
      </div>

      <DataTable
        columns={columns}
        data={testimonials}
        onEdit={setSelectedTestimonial}
        onDelete={handleDelete}
        onBulkDelete={handleBulkDelete}
        searchKey="name"
      />

      <Modal
        isOpen={isModalOpen || !!selectedTestimonial}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedTestimonial(null)
        }}
        title={selectedTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
      >
        <TestimonialForm
          testimonial={selectedTestimonial || undefined}
          onSubmit={selectedTestimonial ? handleUpdate : handleCreate}
          onCancel={() => {
            setIsModalOpen(false)
            setSelectedTestimonial(null)
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