"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TrainingCard } from "./TrainingCard"
import { NewTrainingDialog } from "./NewTrainingDialog"

const mockTrainingSessions = [
  {
    id: '1',
    title: 'PPF Installation Basics',
    instructor: 'Mike Wilson',
    date: '2024-03-20',
    duration: 120,
    maxParticipants: 5,
    currentParticipants: 3,
    description: 'Learn the fundamentals of PPF installation, including surface preparation, solution mixing, and basic application techniques.',
    topics: ['Surface Preparation', 'Solution Mixing', 'Basic Application', 'Tool Usage'],
    level: 'beginner',
  },
  {
    id: '2',
    title: 'Advanced Curves & Corners',
    instructor: 'Sarah Johnson',
    date: '2024-03-22',
    duration: 180,
    maxParticipants: 4,
    currentParticipants: 2,
    description: 'Master the techniques for installing PPF on complex curves and tight corners. Suitable for experienced installers.',
    topics: ['Complex Curves', 'Corner Techniques', 'Stretch Methods', 'Problem Solving'],
    level: 'advanced',
  },
  {
    id: '3',
    title: 'Quality Control Workshop',
    instructor: 'John Smith',
    date: '2024-03-25',
    duration: 150,
    maxParticipants: 6,
    currentParticipants: 4,
    description: 'Learn how to inspect PPF installations and identify common issues and their solutions.',
    topics: ['Inspection Methods', 'Common Issues', 'Problem Resolution', 'Documentation'],
    level: 'intermediate',
  },
]

export function TrainingView() {
  const [sessions, setSessions] = useState(mockTrainingSessions)
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredSessions = sessions.filter(session => 
    session.title.toLowerCase().includes(search.toLowerCase()) ||
    session.instructor.toLowerCase().includes(search.toLowerCase()) ||
    session.description.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddSession = (session: Omit<typeof mockTrainingSessions[0], 'id'>) => {
    const newSession = {
      ...session,
      id: Math.random().toString(36).substr(2, 9),
    }
    setSessions([...sessions, newSession])
    setDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Training</h1>
          <p className="text-muted-foreground">
            Manage and schedule training sessions for your team.
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Training Session
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Search training sessions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSessions.map((session) => (
          <TrainingCard
            key={session.id}
            session={session}
          />
        ))}
      </div>

      <NewTrainingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleAddSession}
      />
    </div>
  )
} 