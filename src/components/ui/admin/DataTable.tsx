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

interface Column {
  key: string
  title: string
  render?: (value: any) => React.ReactNode
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  onEdit?: (item: any) => void
  onDelete?: (item: any) => void
  onBulkDelete?: (items: any[]) => void
  searchKey?: string
}

export function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
  onBulkDelete,
  searchKey = 'name'
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItems, setSelectedItems] = useState<any[]>([])

  const filteredData = data.filter(item =>
    String(item[searchKey]).toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? filteredData : [])
  }

  const handleSelectItem = (item: any, checked: boolean) => {
    setSelectedItems(prev =>
      checked
        ? [...prev, item]
        : prev.filter(i => i.id !== item.id)
    )
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
                    checked={selectedItems.length === filteredData.length}
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
                      checked={selectedItems.some(i => i.id === item.id)}
                      onCheckedChange={(checked) => handleSelectItem(item, checked)}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.render
                      ? column.render(item[column.key])
                      : String(item[column.key])}
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