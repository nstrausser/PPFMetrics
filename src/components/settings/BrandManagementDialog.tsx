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
import type { Brand } from '@/types'

interface BrandManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  brand?: Brand
  onSave: (brand: Omit<Brand, 'id'>) => void
}

export default function BrandManagementDialog({
  open,
  onOpenChange,
  brand,
  onSave,
}: BrandManagementDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
  })

  useEffect(() => {
    if (brand) {
      setFormData({
        name: brand.name,
        logo: brand.logo,
      })
    }
  }, [brand])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onOpenChange(false)
    setFormData({
      name: '',
      logo: '',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{brand ? 'Edit Brand' : 'Add New Brand'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Brand Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL</Label>
            <Input
              id="logo"
              value={formData.logo}
              onChange={(e) =>
                setFormData({ ...formData, logo: e.target.value })
              }
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit">{brand ? 'Update Brand' : 'Add Brand'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}