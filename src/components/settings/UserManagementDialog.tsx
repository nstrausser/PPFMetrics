"use client"

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Installer, InstallerRole } from '@/types'

interface UserManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  installer?: Installer
  onSave: (installer: Omit<Installer, 'id' | 'name'>) => void
}

export default function UserManagementDialog({
  open,
  onOpenChange,
  installer,
  onSave,
}: UserManagementDialogProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Installer' as InstallerRole,
    joinedDate: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    if (installer) {
      setFormData({
        firstName: installer.firstName,
        lastName: installer.lastName,
        email: installer.email,
        role: installer.role,
        joinedDate: installer.joinedDate,
      })
    }
  }, [installer])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onOpenChange(false)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: 'Installer',
      joinedDate: new Date().toISOString().split('T')[0],
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {installer ? 'Edit Installer' : 'Add New Installer'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value: InstallerRole) =>
                setFormData({ ...formData, role: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lead">Lead Installer</SelectItem>
                <SelectItem value="Installer">Installer</SelectItem>
                <SelectItem value="Trainee">Trainee</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="joinedDate">Join Date</Label>
            <Input
              id="joinedDate"
              type="date"
              value={formData.joinedDate}
              onChange={(e) =>
                setFormData({ ...formData, joinedDate: e.target.value })
              }
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit">
              {installer ? 'Update Installer' : 'Add Installer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}