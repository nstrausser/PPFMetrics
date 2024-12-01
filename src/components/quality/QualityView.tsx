"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { QualityCheckCard } from "./QualityCheckCard"
import { NewQualityCheckDialog } from "./NewQualityCheckDialog"

const mockQualityChecks = [
  {
    id: '1',
    installationId: 'INS-001',
    date: '2024-03-15',
    inspector: 'Mike Wilson',
    vehicle: '2023 Tesla Model 3',
    customer: 'John Doe',
    status: 'passed',
    notes: 'All edges properly sealed, no bubbles or debris.',
    score: 95,
  },
  {
    id: '2',
    installationId: 'INS-002',
    date: '2024-03-14',
    inspector: 'Sarah Johnson',
    vehicle: '2024 BMW M4',
    customer: 'Alice Smith',
    status: 'needs-improvement',
    notes: 'Minor bubble found near driver side door edge.',
    score: 85,
  },
  {
    id: '3',
    installationId: 'INS-003',
    date: '2024-03-14',
    inspector: 'Mike Wilson',
    vehicle: '2023 Porsche 911',
    customer: 'Bob Wilson',
    status: 'failed',
    notes: 'Multiple debris points found, requires reinstallation.',
    score: 65,
  },
]

export function QualityView() {
  const [checks, setChecks] = useState(mockQualityChecks)
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredChecks = checks.filter(check => 
    check.customer.toLowerCase().includes(search.toLowerCase()) ||
    check.vehicle.toLowerCase().includes(search.toLowerCase()) ||
    check.inspector.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddCheck = (check: Omit<typeof mockQualityChecks[0], 'id'>) => {
    const newCheck = {
      ...check,
      id: Math.random().toString(36).substr(2, 9),
    }
    setChecks([newCheck, ...checks])
    setDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quality Control</h1>
          <p className="text-muted-foreground">
            Monitor and maintain installation quality standards.
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Quality Check
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search quality checks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredChecks.map((check) => (
          <QualityCheckCard
            key={check.id}
            check={check}
          />
        ))}
      </div>

      <NewQualityCheckDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleAddCheck}
      />
    </div>
  )
} 