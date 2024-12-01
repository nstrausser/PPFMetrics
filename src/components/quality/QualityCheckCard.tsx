"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface QualityCheckCardProps {
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
  }
}

export function QualityCheckCard({ check }: QualityCheckCardProps) {
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{check.customer}</h3>
          <p className="text-sm text-muted-foreground">{check.vehicle}</p>
        </div>
        <Badge variant={getStatusBadgeVariant(check.status)}>
          {check.status.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
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
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Quality Score</span>
              <span>{check.score}%</span>
            </div>
            <Progress
              value={check.score}
              className={getScoreColor(check.score)}
            />
          </div>

          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Notes</span>
            <p className="text-sm">{check.notes}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 