"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface InstallationCardProps {
  installation: {
    id: string
    date: string
    customer: string
    vehicle: string
    installer: string
    status: string
    price: number
    sqft: number
  }
  onClick?: () => void
}

export function InstallationCard({ installation, onClick }: InstallationCardProps) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'in-progress':
        return 'secondary'
      case 'needs-recut':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{installation.customer}</h3>
          <p className="text-sm text-muted-foreground">{installation.vehicle}</p>
        </div>
        <Badge variant={getStatusBadgeVariant(installation.status)}>
          {installation.status === 'needs-recut'
            ? 'Needs Recut'
            : installation.status === 'in-progress'
            ? 'In Progress'
            : 'Completed'}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Date</span>
            <span>{new Date(installation.date).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Installer</span>
            <span>{installation.installer}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Area</span>
            <span>{installation.sqft} ft²</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Price</span>
            <span>${installation.price.toLocaleString()}</span>
          </div>
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={onClick}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}