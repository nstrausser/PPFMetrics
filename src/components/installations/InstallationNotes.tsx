"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, MessageSquare } from "lucide-react"

interface Note {
  id: string
  content: string
  timestamp: string
  user: string
}

interface InstallationNotesProps {
  notes: Note[]
  onAddNote: (note: Omit<Note, 'id' | 'timestamp'>) => void
}

export function InstallationNotes({ notes, onAddNote }: InstallationNotesProps) {
  const [newNote, setNewNote] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newNote.trim()) {
      onAddNote({
        content: newNote.trim(),
        user: "Current User", // Replace with actual user
      })
      setNewNote("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Installation Notes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="p-3 rounded-lg bg-muted/50"
              >
                <p className="text-sm">{note.content}</p>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>{note.user}</span>
                  <span>{new Date(note.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="mt-4 space-y-2">
          <Textarea
            placeholder="Add a note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px]"
          />
          <Button type="submit" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Note
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 