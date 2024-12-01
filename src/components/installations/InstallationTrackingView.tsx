"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { InstallationProgress } from "./InstallationProgress"
import { InstallationSteps } from "./InstallationSteps"
import { InstallationTimeline } from "./InstallationTimeline"
import { InstallationNotes } from "./InstallationNotes"
import { InstallationPhotos } from "./InstallationPhotos"
import { ArrowLeft } from "lucide-react"

const mockInstallation = {
  id: '1',
  status: 'in-progress',
  startTime: '2024-03-15T09:00:00',
  estimatedDuration: 240,
  currentDuration: 120,
  issues: 1,
  completedSteps: 4,
  totalSteps: 8,
}

const mockSteps = [
  {
    id: '1',
    title: 'Surface Preparation',
    status: 'completed',
    timeEstimate: 30,
    timeSpent: 25,
    notes: 'Surface cleaned and decontaminated',
  },
  {
    id: '2',
    title: 'Pattern Creation',
    status: 'completed',
    timeEstimate: 45,
    timeSpent: 40,
    notes: 'Patterns cut and verified',
  },
  {
    id: '3',
    title: 'Initial Application',
    status: 'completed',
    timeEstimate: 60,
    timeSpent: 65,
    notes: 'Main panels applied',
  },
  {
    id: '4',
    title: 'Edge Wrapping',
    status: 'in-progress',
    timeEstimate: 45,
    timeSpent: 30,
  },
  {
    id: '5',
    title: 'Quality Check',
    status: 'pending',
    timeEstimate: 30,
  },
] as const

const mockTimeline = [
  {
    id: '1',
    type: 'start',
    timestamp: '2024-03-15T09:00:00',
    description: 'Installation started',
    user: 'John Smith',
  },
  {
    id: '2',
    type: 'complete',
    timestamp: '2024-03-15T09:25:00',
    description: 'Surface preparation completed',
    user: 'John Smith',
  },
  {
    id: '3',
    type: 'issue',
    timestamp: '2024-03-15T10:15:00',
    description: 'Minor bubble found in driver side panel',
    user: 'Sarah Johnson',
  },
  {
    id: '4',
    type: 'note',
    timestamp: '2024-03-15T10:30:00',
    description: 'Issue resolved - panel reapplied',
    user: 'John Smith',
  },
]

const mockNotes = [
  {
    id: '1',
    content: 'Customer requested extra attention to hood edges',
    timestamp: '2024-03-15T09:05:00',
    user: 'John Smith',
  },
  {
    id: '2',
    content: 'Using new application solution mixture',
    timestamp: '2024-03-15T09:15:00',
    user: 'John Smith',
  },
]

const mockPhotos = [
  {
    id: '1',
    url: 'https://example.com/photo1.jpg',
    timestamp: '2024-03-15T09:30:00',
    caption: 'Surface prep complete',
  },
  {
    id: '2',
    url: 'https://example.com/photo2.jpg',
    timestamp: '2024-03-15T10:00:00',
    caption: 'Pattern layout',
  },
]

interface InstallationTrackingViewProps {
  installationId: string
  onBack: () => void
}

export function InstallationTrackingView({
  installationId,
  onBack,
}: InstallationTrackingViewProps) {
  const [steps, setSteps] = useState(mockSteps)
  const [notes, setNotes] = useState(mockNotes)
  const [photos, setPhotos] = useState(mockPhotos)

  const handleUpdateStep = (stepId: string, status: typeof mockSteps[number]['status']) => {
    setSteps(steps.map(step =>
      step.id === stepId ? { ...step, status } : step
    ))
  }

  const handleAddNote = (note: Omit<typeof mockNotes[number], 'id' | 'timestamp'>) => {
    const newNote = {
      ...note,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    }
    setNotes([newNote, ...notes])
  }

  const handleAddPhoto = (file: File) => {
    // In a real app, you would upload the file to storage
    const newPhoto = {
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      timestamp: new Date().toISOString(),
    }
    setPhotos([...photos, newPhoto])
  }

  const handleRemovePhoto = (photoId: string) => {
    setPhotos(photos.filter(photo => photo.id !== photoId))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Installations
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <InstallationProgress installation={mockInstallation} />
        <InstallationTimeline events={mockTimeline} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <InstallationSteps
            steps={steps}
            onUpdateStep={handleUpdateStep}
          />
          <InstallationNotes
            notes={notes}
            onAddNote={handleAddNote}
          />
        </div>
        <InstallationPhotos
          photos={photos}
          onAddPhoto={handleAddPhoto}
          onRemovePhoto={handleRemovePhoto}
        />
      </div>
    </div>
  )
} 