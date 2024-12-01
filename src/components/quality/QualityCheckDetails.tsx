"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"

interface QualityCheckDetailsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  check: {
    id: string
    installationId: string
    date: string
    inspector: string
    vehicle: string
    customer: string
    status: string
    notes: string
    score: number
    criteria?: Array<{
      id: string
      name: string
      score: number
      notes?: string
    }>
  }
}

export function QualityCheckDetails({
  open,
  onOpenChange,
  check,
}: QualityCheckDetailsProps) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'passed':
        return 'success'
      case 'needs-improvement':
        return 'warning'
      case 'failed':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500'
    if (score >= 80) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Quality Check Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{check.customer}</h3>
                <p className="text-sm text-muted-foreground">{check.vehicle}</p>
              </div>
              <Badge variant={getStatusBadgeVariant(check.status)}>
                {check.status.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Inspection Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span>{new Date(check.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Inspector</span>
                    <span>{check.inspector}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Installation ID</span>
                    <span className="font-mono">{check.installationId}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Overall Score</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <span className="text-4xl font-bold">{check.score}%</span>
                  </div>
                  <Progress
                    value={check.score}
                    className={getScoreColor(check.score)}
                  />
                </CardContent>
              </Card>
            </div>

            {check.criteria && check.criteria.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Inspection Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {check.criteria.map((criterion) => (
                      <div key={criterion.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{criterion.name}</span>
                          <span className={`font-bold ${
                            criterion.score >= 90 ? 'text-green-500' :
                            criterion.score >= 80 ? 'text-yellow-500' :
                            'text-red-500'
                          }`}>
                            {criterion.score}%
                          </span>
                        </div>
                        <Progress
                          value={criterion.score}
                          className={getScoreColor(criterion.score)}
                        />
                        {criterion.notes && (
                          <p className="text-sm text-muted-foreground">
                            {criterion.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {check.notes && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{check.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
} 