'use client'

import { useState, useEffect } from 'react'
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Modal } from '@/components/ui/Modal'
import { Toast } from '@/components/ui/Toast'
import { DataTable } from '@/components/ui/DataTable'

interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'USER'
  createdAt: Date
}

interface UserFormData {
  name: string
  email: string
  password?: string
  role: 'ADMIN' | 'USER'
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    role: 'USER'
  })
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
      showToast('Failed to fetch users', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/users', {
        method: editingUser ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(editingUser && { id: editingUser.id }),
          ...formData
        })
      })

      if (!response.ok) throw new Error('Failed to save user')
      
      await fetchUsers()
      setIsModalOpen(false)
      showToast(
        `User ${editingUser ? 'updated' : 'created'} successfully`,
        'success'
      )
    } catch (error) {
      console.error('Error saving user:', error)
      showToast(`Failed to ${editingUser ? 'update' : 'create'} user`, 'error')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      const response = await fetch(`/api/admin/users?id=${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete user')
      
      await fetchUsers()
      showToast('User deleted successfully', 'success')
    } catch (error) {
      console.error('Error deleting user:', error)
      showToast('Failed to delete user', 'error')
    }
  }

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) return

    try {
      const promises = selectedUsers.map(id => 
        fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' })
      )
      await Promise.all(promises)
      await fetchUsers()
      setSelectedUsers([])
      showToast('Users deleted successfully', 'success')
    } catch (error) {
      console.error('Error deleting users:', error)
      showToast('Failed to delete users', 'error')
    }
  }

  const columns = [
    { key: 'name' as keyof User, label: 'Name', sortable: true },
    { key: 'email' as keyof User, label: 'Email', sortable: true },
    { 
      key: 'role' as keyof User, 
      label: 'Role', 
      sortable: true,
      render: (value: User[keyof User]) => (
        <span className={`px-2 py-1 rounded text-sm ${
          value === 'ADMIN' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
        }`}>
          {String(value)}
        </span>
      )
    },
    { 
      key: 'createdAt' as keyof User, 
      label: 'Joined', 
      sortable: true,
      render: (value: User[keyof User]) => {
        const date = value instanceof Date ? value : new Date(value as string)
        return date.toLocaleString()
      }
    }
  ]

  const renderActions = (user: User) => (
    <div className="flex gap-2">
      <button 
        onClick={() => openModal(user)}
        className="p-1 hover:bg-muted rounded"
      >
        <PencilIcon className="w-5 h-5" />
      </button>
      <button 
        onClick={() => handleDelete(user.id)}
        className="p-1 hover:bg-muted rounded text-destructive"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  )

  const openModal = (user?: User) => {
    if (user) {
      setEditingUser(user)
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        password: ''
      })
    } else {
      setEditingUser(null)
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'USER'
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingUser(null)
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'USER'
    })
  }

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Users</h1>
          {selectedUsers.length > 0 && (
            <button 
              onClick={handleBulkDelete}
              className="flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90"
            >
              <TrashIcon className="w-5 h-5" />
              Delete Selected ({selectedUsers.length})
            </button>
          )}
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
        >
          <PlusIcon className="w-5 h-5" />
          Add User
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <DataTable
          data={users}
          columns={columns}
          actions={renderActions}
          searchable
          searchKeys={['name', 'email', 'role']}
          pageSize={10}
          selectable
          selectedIds={selectedUsers}
          onSelectionChange={setSelectedUsers}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingUser ? 'Edit User' : 'Add User'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {editingUser ? 'New Password (leave blank to keep current)' : 'Password'}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
              required={!editingUser}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'ADMIN' | 'USER' }))}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-4 mt-6">
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
              {editingUser ? 'Update' : 'Create'}
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