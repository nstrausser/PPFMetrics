"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Camera, Plus, X } from "lucide-react"
import Image from "next/image"

interface Photo {
  id: string
  url: string
  timestamp: string
  caption?: string
}

interface InstallationPhotosProps {
  photos: Photo[]
  onAddPhoto: (photo: File) => void
  onRemovePhoto: (photoId: string) => void
}

export function InstallationPhotos({
  photos,
  onAddPhoto,
  onRemovePhoto,
}: InstallationPhotosProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onAddPhoto(file)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Installation Photos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="grid grid-cols-2 gap-4 p-1">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative group rounded-lg overflow-hidden"
              >
                <Image
                  src={photo.url}
                  alt="Installation photo"
                  width={300}
                  height={200}
                  className="w-full h-[150px] object-cover cursor-pointer transition-transform group-hover:scale-105"
                  onClick={() => setSelectedPhoto(photo)}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onRemovePhoto(photo.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                {photo.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white text-sm">
                    {photo.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => document.getElementById("photo-upload")?.click()}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Photo
          </Button>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </CardContent>
    </Card>
  )
} 