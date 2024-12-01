"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Circle, CheckCircle2, AlertCircle, Clock } from "lucide-react"

interface TimelineEvent {
  id: string
  type: 'start' | 'complete' | 'issue' | 'note'
  timestamp: string
  description: string
  user: string
}

interface InstallationTimelineProps {
  events: TimelineEvent[]
}

export function InstallationTimeline({ events }: InstallationTimelineProps) {
  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'start':
        return <Clock className="h-4 w-4 text-blue-500" />
      case 'complete':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'issue':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'note':
        return <Circle className="h-4 w-4 text-gray-500" />
    }
  }

  const getEventBadgeVariant = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'start':
        return 'secondary'
      case 'complete':
        return 'success'
      case 'issue':
        return 'destructive'
      case 'note':
        return 'outline'
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  {getEventIcon(event.type)}
                  {index < events.length - 1 && (
                    <div className="w-px h-full bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={getEventBadgeVariant(event.type)}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(event.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm">{event.description}</p>
                  <p className="text-xs text-muted-foreground">by {event.user}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 