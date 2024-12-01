"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { QualityCheckDetails } from "./QualityCheckDetails"

interface QualityCheck {
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

interface QualityCheckListProps {
  checks: QualityCheck[]
}

export function QualityCheckList({ checks }: QualityCheckListProps) {
  const [selectedCheck, setSelectedCheck] = useState<QualityCheck | null>(null)

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
    <>
      <ScrollArea className="h-[600px]">
        <div className="space-y-4 p-1">
          {checks.map((check) => (
            <Card key={check.id} className="hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{check.customer}</h3>
                    <p className="text-sm text-muted-foreground">
                      {check.vehicle}
                    </p>
                  </div>
                  <Badge variant={getStatusBadgeVariant(check.status)}>
                    {check.status.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Score</span>
                    <span className="font-medium">{check.score}%</span>
                  </div>
                  <Progress
                    value={check.score}
                    className={getScoreColor(check.score)}
                  />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Inspector</span>
                      <p>{check.inspector}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Date</span>
                      <p>{new Date(check.date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedCheck(check)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <QualityCheckDetails
        open={!!selectedCheck}
        onOpenChange={(open) => !open && setSelectedCheck(null)}
        check={selectedCheck!}
      />
    </>
  )
} 