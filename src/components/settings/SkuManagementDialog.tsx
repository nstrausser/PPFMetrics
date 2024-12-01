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
import type { Brand } from '@/types'

interface SkuManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sku?: {
    id: string
    sku: string
    brandId: string
    name: string
    widthInches: number
    lengthFeet: number
    cost: number
  }
  brands: Brand[]
  onSave: (sku: Omit<typeof sku, 'id'>) => void
}

export default function SkuManagementDialog({
  open,
  onOpenChange,
  sku,
  brands,
  onSave,
}: SkuManagementDialogProps) {
  const [formData, setFormData] = useState({
    sku: '',
    brandId: '',
    name: '',
    widthInches: '',
    lengthFeet: '',
    cost: '',
  })

  useEffect(() => {
    if (sku) {
      setFormData({
        sku: sku.sku,
        brandId: sku.brandId,
        name: sku.name,
        widthInches: sku.widthInches.toString(),
        lengthFeet: sku.lengthFeet.toString(),
        cost: sku.cost.toString(),
      })
    }
  }, [sku])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      sku: formData.sku,
      brandId: formData.brandId,
      name: formData.name,
      widthInches: parseInt(formData.widthInches),
      lengthFeet: parseInt(formData.lengthFeet),
      cost: parseFloat(formData.cost),
    })
    onOpenChange(false)
    setFormData({
      sku: '',
      brandId: '',
      name: '',
      widthInches: '',
      lengthFeet: '',
      cost: '',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{sku ? 'Edit SKU' : 'Add New SKU'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              value={formData.sku}
              onChange={(e) =>
                setFormData({ ...formData, sku: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Select
              value={formData.brandId}
              onValueChange={(value) =>
                setFormData({ ...formData, brandId: value })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="widthInches">Width (inches)</Label>
              <Input
                id="widthInches"
                type="number"
                min="0"
                value={formData.widthInches}
                onChange={(e) =>
                  setFormData({ ...formData, widthInches: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lengthFeet">Length (feet)</Label>
              <Input
                id="lengthFeet"
                type="number"
                min="0"
                value={formData.lengthFeet}
                onChange={(e) =>
                  setFormData({ ...formData, lengthFeet: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cost">Cost</Label>
            <Input
              id="cost"
              type="number"
              min="0"
              step="0.01"
              value={formData.cost}
              onChange={(e) =>
                setFormData({ ...formData, cost: e.target.value })
              }
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit">{sku ? 'Update SKU' : 'Add SKU'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}