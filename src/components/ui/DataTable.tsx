'use client'

import { useState, useMemo } from 'react'
import { ChevronUpIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: T[keyof T], item: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  actions?: (item: T) => React.ReactNode
  searchable?: boolean
  searchKeys?: (keyof T)[]
  pageSize?: number
  selectable?: boolean
  selectedIds?: string[]
  onSelectionChange?: (ids: string[]) => void
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  actions,
  searchable = false,
  searchKeys = [],
  pageSize = 10,
  selectable = false,
  selectedIds = [],
  onSelectionChange
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const handleSort = (key: keyof T) => {
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' }
      }
      return {
        key,
        direction: current.direction === 'asc' ? 'desc' : 'asc'
      }
    })
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = filteredData.map(item => item.id)
      onSelectionChange?.(allIds)
    } else {
      onSelectionChange?.([])
    }
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      onSelectionChange?.([...selectedIds, id])
    } else {
      onSelectionChange?.(selectedIds.filter(selectedId => selectedId !== id))
    }
  }

  const filteredData = useMemo(() => {
    let processed = [...data]

    // Apply search filter
    if (searchQuery && searchKeys) {
      const query = searchQuery.toLowerCase()
      processed = processed.filter(item =>
        searchKeys.some(key => {
          const value = item[key]
          return String(value).toLowerCase().includes(query)
        })
      )
    }

    return processed
  }, [data, searchQuery, searchKeys])

  const sortedData = useMemo(() => {
    if (sortConfig) {
      return [...filteredData].sort((a, b) => {
        const aValue = a[sortConfig.key!]
        const bValue = b[sortConfig.key!]
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }
    return filteredData
  }, [filteredData, sortConfig])

  const paginatedData = useMemo(() => {
    return sortedData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    )
  }, [sortedData, currentPage, pageSize])

  return (
    <div className="w-full">
      {searchable && (
        <div className="mb-4 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              {selectable && (
                <th key="select-all" className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredData.length && filteredData.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-4 py-2 text-left ${column.sortable ? 'cursor-pointer select-none' : ''}`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && sortConfig?.key === column.key && (
                      sortConfig.direction === 'asc' ? (
                        <ChevronUpIcon className="w-4 h-4" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4" />
                      )
                    )}
                  </div>
                </th>
              ))}
              {actions && <th key="actions" className="px-4 py-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id} className="border-b hover:bg-muted/50">
                {selectable && (
                  <td key="select" className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-4 py-2">
                    {column.render
                      ? column.render(item[column.key], item)
                      : String(item[column.key])}
                  </td>
                ))}
                {actions && (
                  <td key="actions" className="px-4 py-2">
                    {actions(item)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pageSize < filteredData.length && (
        <div className="mt-4 flex justify-between items-center">
          <div>
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border hover:bg-muted disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredData.length / pageSize), p + 1))}
              disabled={currentPage === Math.ceil(filteredData.length / pageSize)}
              className="px-3 py-1 rounded border hover:bg-muted disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 