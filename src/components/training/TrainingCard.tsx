"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users } from "lucide-react"

interface TrainingCardProps {
  session: {
    id: string
    title: string
    instructor: string
    date: string
    duration: number
    maxParticipants: number
    currentParticipants: number
    description: string
    topics: string[]
    level: string
  }
}

export function TrainingCard({ session }: TrainingCardProps) {
  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'secondary'
      case 'intermediate':
        return 'warning'
      case 'advanced':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{session.title}</h3>
          <p className="text-sm text-muted-foreground">with {session.instructor}</p>
        </div>
        <Badge variant={getLevelBadgeVariant(session.level)}>
          {session.level.charAt(0).toUpperCase() + session.level.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{new Date(session.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{session.duration} minutes</span>
            </div>
            <div className="flex items-center text-sm">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{session.currentParticipants}/{session.maxParticipants} participants</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">{session.description}</p>

          <div className="space-y-2">
            <p className="text-sm font-medium">Topics covered:</p>
            <div className="flex flex-wrap gap-2">
              {session.topics.map((topic) => (
                <Badge key={topic} variant="outline">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            disabled={session.currentParticipants >= session.maxParticipants}
          >
            {session.currentParticipants >= session.maxParticipants
              ? "Session Full"
              : "Register"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 