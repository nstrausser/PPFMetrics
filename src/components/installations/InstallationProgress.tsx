"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, CheckCircle2, AlertCircle } from "lucide-react"

interface InstallationProgressProps {
  installation: {
    status: string
    startTime?: string
    estimatedDuration: number
    currentDuration: number
    issues: number
    completedSteps: number
    totalSteps: number
  }
}

export function InstallationProgress({ installation }: InstallationProgressProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500'
      case 'in-progress':
        return 'text-blue-500'
      case 'needs-recut':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5" />
      case 'in-progress':
        return <Clock className="h-5 w-5" />
      case 'needs-recut':
        return <AlertCircle className="h-5 w-5" />
      default:
        return null
    }
  }

  const progressPercentage = (installation.currentDuration / installation.estimatedDuration) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Installation Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={getStatusColor(installation.status)}>
              {getStatusIcon(installation.status)}
            </span>
            <span className="font-medium">
              {installation.status.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </span>
          </div>
          {installation.startTime && (
            <span className="text-sm text-muted-foreground">
              Started: {new Date(installation.startTime).toLocaleString()}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Time Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{installation.currentDuration} mins</span>
            <span>{installation.estimatedDuration} mins</span>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">
              {installation.completedSteps}/{installation.totalSteps}
            </div>
            <div className="text-sm text-muted-foreground">Steps Complete</div>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {Math.round((installation.completedSteps / installation.totalSteps) * 100)}%
            </div>
            <div className="text-sm text-muted-foreground">Progress</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{installation.issues}</div>
            <div className="text-sm text-muted-foreground">Issues Found</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 