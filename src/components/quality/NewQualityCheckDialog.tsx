"use client"

import { useState } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, X } from 'lucide-react'

const inspectionCriteria = [
  { id: 'edges', name: 'Edge Sealing' },
  { id: 'bubbles', name: 'Bubble-Free Application' },
  { id: 'alignment', name: 'Pattern Alignment' },
  { id: 'clarity', name: 'Optical Clarity' },
  { id: 'stretch', name: 'Stretch Marks' },
  { id: 'debris', name: 'Debris/Contamination' },
]

interface NewQualityCheckDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (check: {
    installationId: string
    date: string
    inspector: string
    vehicle: string
    customer: string
    status: string
    notes: string
    score: number
    criteria: Array<{
      id: string
      name: string
      score: number
      notes?: string
    }>
  }) => void
}

export function NewQualityCheckDialog({
  open,
  onOpenChange,
  onSubmit,
}: NewQualityCheckDialogProps) {
  const [formData, setFormData] = useState({
    installationId: '',
    date: new Date().toISOString().split('T')[0],
    inspector: '',
    vehicle: '',
    customer: '',
    notes: '',
    criteria: inspectionCriteria.map(c => ({
      id: c.id,
      name: c.name,
      score: 90,
      notes: '',
    })),
  })

  const calculateOverallScore = () => {
    const sum = formData.criteria.reduce((acc, c) => acc + c.score, 0)
    return Math.round(sum / formData.criteria.length)
  }

  const getStatusFromScore = (score: number) => {
    if (score >= 90) return 'passed'
    if (score >= 80) return 'needs-improvement'
    return 'failed'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const overallScore = calculateOverallScore()
    onSubmit({
      ...formData,
      score: overallScore,
      status: getStatusFromScore(overallScore),
    })
    setFormData({
      installationId: '',
      date: new Date().toISOString().split('T')[0],
      inspector: '',
      vehicle: '',
      customer: '',
      notes: '',
      criteria: inspectionCriteria.map(c => ({
        id: c.id,
        name: c.name,
        score: 90,
        notes: '',
      })),
    })
  }

  const handleCriteriaScoreChange = (criteriaId: string, score: number) => {
    setFormData({
      ...formData,
      criteria: formData.criteria.map(c =>
        c.id === criteriaId ? { ...c, score } : c
      ),
    })
  }

  const handleCriteriaNoteChange = (criteriaId: string, notes: string) => {
    setFormData({
      ...formData,
      criteria: formData.criteria.map(c =>
        c.id === criteriaId ? { ...c, notes } : c
      ),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Quality Check</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="installationId">Installation ID</Label>
              <Input
                id="installationId"
                value={formData.installationId}
                onChange={(e) =>
                  setFormData({ ...formData, installationId: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Inspection Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer</Label>
              <Input
                id="customer"
                value={formData.customer}
                onChange={(e) =>
                  setFormData({ ...formData, customer: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle">Vehicle</Label>
              <Input
                id="vehicle"
                value={formData.vehicle}
                onChange={(e) =>
                  setFormData({ ...formData, vehicle: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inspector">Inspector</Label>
            <Select
              value={formData.inspector}
              onValueChange={(value) =>
                setFormData({ ...formData, inspector: value })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select inspector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mike Wilson">Mike Wilson</SelectItem>
                <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Inspection Criteria</Label>
            {formData.criteria.map((criterion) => (
              <Card key={criterion.id}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>{criterion.name}</Label>
                      <span className="font-bold">{criterion.score}%</span>
                    </div>
                    <Slider
                      value={[criterion.score]}
                      onValueChange={(value) => {
                        handleCriteriaScoreChange(criterion.id, value[0])
                      }}
                      max={100}
                      step={1}
                      className="mb-2"
                    />
                    <Textarea
                      placeholder="Add notes for this criterion..."
                      value={criterion.notes}
                      onChange={(e) =>
                        handleCriteriaNoteChange(criterion.id, e.target.value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Add any additional notes..."
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                Overall Score: {calculateOverallScore()}%
              </div>
              <div className="text-sm text-muted-foreground">
                Status: {getStatusFromScore(calculateOverallScore())}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Check</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 