"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Installer } from "@/types"

interface InstallerCardProps {
  installer: Installer
  onClick?: () => void
}

export function InstallerCard({ installer, onClick }: InstallerCardProps) {
  const initials = `${installer.firstName[0]}${installer.lastName[0]}`
  
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{installer.name}</h3>
          <Badge variant="secondary">{installer.role}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          <p>Member since {new Date(installer.joinedDate).toLocaleDateString()}</p>
          <p>{installer.email}</p>
        </div>
      </CardContent>
    </Card>
  )
}