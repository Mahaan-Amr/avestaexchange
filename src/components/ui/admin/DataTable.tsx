import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Checkbox } from '@/components/ui/checkbox'

export interface Column<T> {
  key: keyof T & string
  title: string
  render?: (value: T[keyof T]) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  onBulkDelete?: (items: T[]) => void
  searchKey: keyof T
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  onEdit,
  onDelete,
  onBulkDelete,
  searchKey
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItems, setSelectedItems] = useState<T[]>([])

  const filteredData = data.filter(item =>
    String(item[searchKey]).toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? filteredData : [])
  }

  const handleSelectItem = (item: T, checked: boolean) => {
    setSelectedItems(prev =>
      checked
        ? [...prev, item]
        : prev.filter(i => i.id !== item.id)
    )
  }

  const renderCell = (item: T, column: Column<T>) => {
    const value = item[column.key]
    return column.render ? column.render(value) : String(value)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        {onBulkDelete && selectedItems.length > 0 && (
          <Button
            variant="destructive"
            onClick={() => {
              onBulkDelete(selectedItems)
              setSelectedItems([])
            }}
          >
            Delete Selected ({selectedItems.length})
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {onBulkDelete && (
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedItems.length === filteredData.length && filteredData.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead key={column.key}>{column.title}</TableHead>
              ))}
              {(onEdit || onDelete) && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                {onBulkDelete && (
                  <TableCell>
                    <Checkbox
                      checked={Boolean(selectedItems.some(i => i.id === item.id))}
                      onCheckedChange={(checked) => handleSelectItem(item, Boolean(checked))}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {renderCell(item, column)}
                  </TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(item)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(item)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 