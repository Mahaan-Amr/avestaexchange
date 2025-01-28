'use client'

import { useState, useEffect, useCallback } from 'react'
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Modal } from '@/components/ui/Modal'
import { Toast } from '@/components/ui/Toast'
import { DataTable } from '@/components/ui/DataTable'

interface ExchangeRate {
  id: string
  baseCurrency: string
  quoteCurrency: string
  baseRate: number
  buyMarkup: number
  sellMarkup: number
  buyRate: number
  sellRate: number
  pair: string
  createdAt: string
  updatedAt: string
  isActive: boolean
}

interface ExchangeRateFormData {
  baseCurrency: string
  quoteCurrency: string
  buyMarkup: number
  sellMarkup: number
}

export default function ExchangeRatesPage() {
  // Initialize rates with an empty array
  const [rates, setRates] = useState<ExchangeRate[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRate, setEditingRate] = useState<ExchangeRate | null>(null)
  const [formData, setFormData] = useState<ExchangeRateFormData>({
    baseCurrency: '',
    quoteCurrency: '',
    buyMarkup: 1.5,
    sellMarkup: 1.0
  })
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [selectedRates, setSelectedRates] = useState<string[]>([])

  const fetchRates = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/exchange-rates')
      if (!response.ok) throw new Error('Failed to fetch exchange rates')
      const data = await response.json()
      // Ensure we're setting an array of rates
      setRates(Array.isArray(data) ? data : data.rates || [])
    } catch (error) {
      console.error('Error fetching exchange rates:', error)
      showToast('Failed to fetch exchange rates', 'error')
      // Set empty array on error
      setRates([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRates()
  }, [fetchRates])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const numericBuyMarkup = parseFloat(formData.buyMarkup.toString())
      const numericSellMarkup = parseFloat(formData.sellMarkup.toString())

      if (isNaN(numericBuyMarkup) || isNaN(numericSellMarkup)) {
        showToast('Please enter valid numeric values', 'error')
        return
      }

      const response = await fetch('/api/admin/exchange-rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baseCurrency: formData.baseCurrency.trim().toUpperCase(),
          quoteCurrency: formData.quoteCurrency.trim().toUpperCase(),
          buyMarkup: numericBuyMarkup,
          sellMarkup: numericSellMarkup
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save exchange rate')
      }
      
      await fetchRates()
      setIsModalOpen(false)
      showToast(
        `Exchange rate ${editingRate ? 'updated' : 'created'} successfully`,
        'success'
      )
    } catch (error) {
      console.error('Error saving exchange rate:', error)
      showToast(error instanceof Error ? error.message : 'Failed to save exchange rate', 'error')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this exchange rate?')) return

    try {
      const response = await fetch(`/api/admin/exchange-rates?id=${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete exchange rate')
      
      await fetchRates()
      showToast('Exchange rate deleted successfully', 'success')
    } catch (error) {
      console.error('Error deleting exchange rate:', error)
      showToast('Failed to delete exchange rate', 'error')
    }
  }

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedRates.length} exchange rates?`)) return

    try {
      const promises = selectedRates.map(id => 
        fetch(`/api/admin/exchange-rates?id=${id}`, { method: 'DELETE' })
      )
      await Promise.all(promises)
      await fetchRates()
      setSelectedRates([])
      showToast('Exchange rates deleted successfully', 'success')
    } catch (error) {
      console.error('Error deleting exchange rates:', error)
      showToast('Failed to delete exchange rates', 'error')
    }
  }

  const columns = [
    { key: 'pair' as keyof ExchangeRate, label: 'Currency Pair', sortable: true },
    { 
      key: 'baseRate' as keyof ExchangeRate, 
      label: 'Base Rate', 
      sortable: true,
      render: (value: ExchangeRate[keyof ExchangeRate]) => 
        typeof value === 'number' ? value.toFixed(4) : String(value)
    },
    { 
      key: 'buyRate' as keyof ExchangeRate, 
      label: 'Buy Rate', 
      sortable: true,
      render: (value: ExchangeRate[keyof ExchangeRate]) => 
        typeof value === 'number' ? value.toFixed(4) : String(value)
    },
    { 
      key: 'sellRate' as keyof ExchangeRate, 
      label: 'Sell Rate', 
      sortable: true,
      render: (value: ExchangeRate[keyof ExchangeRate]) => 
        typeof value === 'number' ? value.toFixed(4) : String(value)
    },
    { 
      key: 'buyMarkup' as keyof ExchangeRate, 
      label: 'Buy Markup (%)', 
      sortable: true,
      render: (value: ExchangeRate[keyof ExchangeRate]) => 
        typeof value === 'number' ? value.toFixed(2) + '%' : String(value)
    },
    { 
      key: 'sellMarkup' as keyof ExchangeRate, 
      label: 'Sell Markup (%)', 
      sortable: true,
      render: (value: ExchangeRate[keyof ExchangeRate]) => 
        typeof value === 'number' ? value.toFixed(2) + '%' : String(value)
    },
    { 
      key: 'updatedAt' as keyof ExchangeRate, 
      label: 'Last Updated', 
      sortable: true,
      render: (value: ExchangeRate[keyof ExchangeRate]) => 
        new Date(value as string).toLocaleString()
    }
  ]

  const renderActions = (rate: ExchangeRate) => (
    <div className="flex gap-2">
      <button 
        onClick={() => openModal(rate)}
        className="p-1 hover:bg-muted rounded"
      >
        <PencilIcon className="w-5 h-5" />
      </button>
      <button 
        onClick={() => handleDelete(rate.id)}
        className="p-1 hover:bg-muted rounded text-destructive"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  )

  const openModal = (rate?: ExchangeRate) => {
    if (rate) {
      setEditingRate(rate)
      setFormData({
        baseCurrency: rate.baseCurrency,
        quoteCurrency: rate.quoteCurrency,
        buyMarkup: rate.buyMarkup,
        sellMarkup: rate.sellMarkup
      })
    } else {
      setEditingRate(null)
      setFormData({
        baseCurrency: '',
        quoteCurrency: '',
        buyMarkup: 1.5,
        sellMarkup: 1.0
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingRate(null)
    setFormData({
      baseCurrency: '',
      quoteCurrency: '',
      buyMarkup: 1.5,
      sellMarkup: 1.0
    })
  }

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Exchange Rates</h1>
          {selectedRates.length > 0 && (
            <button 
              onClick={handleBulkDelete}
              className="flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90"
            >
              <TrashIcon className="w-5 h-5" />
              Delete Selected ({selectedRates.length})
            </button>
          )}
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
        >
          <PlusIcon className="w-5 h-5" />
          Add Rate
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <DataTable
          data={rates}
          columns={columns}
          actions={renderActions}
          searchable
          searchKeys={['pair']}
          pageSize={10}
          selectable
          selectedIds={selectedRates}
          onSelectionChange={setSelectedRates}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingRate ? 'Edit Exchange Rate' : 'Add Exchange Rate'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Base Currency</label>
            <input
              type="text"
              value={formData.baseCurrency}
              onChange={(e) => setFormData(prev => ({ ...prev, baseCurrency: e.target.value.toUpperCase() }))}
              className="w-full px-3 py-2 border rounded-md disabled:bg-muted disabled:cursor-not-allowed"
              placeholder="e.g. USD"
              maxLength={3}
              pattern="[A-Za-z]{3}"
              title="Please enter a valid 3-letter currency code"
              required
              disabled={!!editingRate}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Quote Currency</label>
            <input
              type="text"
              value={formData.quoteCurrency}
              onChange={(e) => setFormData(prev => ({ ...prev, quoteCurrency: e.target.value.toUpperCase() }))}
              className="w-full px-3 py-2 border rounded-md disabled:bg-muted disabled:cursor-not-allowed"
              placeholder="e.g. IRR"
              maxLength={3}
              pattern="[A-Za-z]{3}"
              title="Please enter a valid 3-letter currency code"
              required
              disabled={!!editingRate}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Buy Markup (%)</label>
            <input
              type="number"
              value={formData.buyMarkup}
              onChange={(e) => setFormData(prev => ({ ...prev, buyMarkup: parseFloat(e.target.value) }))}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="e.g. 1.5"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Sell Markup (%)</label>
            <input
              type="number"
              value={formData.sellMarkup}
              onChange={(e) => setFormData(prev => ({ ...prev, sellMarkup: parseFloat(e.target.value) }))}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="e.g. 1.0"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border rounded-md hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              {editingRate ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
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