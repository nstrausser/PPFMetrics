"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle2, Clock, AlertCircle, ListChecks } from "lucide-react"

interface Step {
  id: string
  title: string
  status: 'pending' | 'in-progress' | 'completed' | 'issue'
  timeEstimate: number
  timeSpent?: number
  notes?: string
}

interface InstallationStepsProps {
  steps: Step[]
  onUpdateStep: (stepId: string, status: Step['status']) => void
}

export function InstallationSteps({ steps, onUpdateStep }: InstallationStepsProps) {
  const getStatusIcon = (status: Step['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />
      case 'issue':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadgeVariant = (status: Step['status']) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'in-progress':
        return 'secondary'
      case 'issue':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ListChecks className="h-5 w-5" />
          Installation Steps
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className="p-4 rounded-lg border bg-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(step.status)}
                    <h3 className="font-medium">{step.title}</h3>
                  </div>
                  <Badge variant={getStatusBadgeVariant(step.status)}>
                    {step.status.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>Estimated: {step.timeEstimate} mins</span>
                  {step.timeSpent && (
                    <span>Time Spent: {step.timeSpent} mins</span>
                  )}
                </div>

                {step.notes && (
                  <p className="text-sm text-muted-foreground">{step.notes}</p>
                )}

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateStep(step.id, 'in-progress')}
                    disabled={step.status === 'completed' || step.status === 'in-progress'}
                  >
                    Start
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateStep(step.id, 'completed')}
                    disabled={step.status === 'completed' || step.status === 'pending'}
                  >
                    Complete
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateStep(step.id, 'issue')}
                    disabled={step.status === 'completed'}
                  >
                    Report Issue
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 