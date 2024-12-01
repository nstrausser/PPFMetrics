"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface InstallationDetailsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  installation: {
    id: string
    date: string
    customer: string
    vehicle: string
    installer: string
    status: string
    price: number
    sqft: number
    notes?: string
    rollsUsed?: Array<{
      id: string
      sku: string
      name: string
      sqft: number
    }>
  }
}

export function InstallationDetails({
  open,
  onOpenChange,
  installation,
}: InstallationDetailsProps) {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Installation Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Installation Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span>{new Date(installation.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Installer</span>
                    <span>{installation.installer}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Area</span>
                    <span>{installation.sqft} ft²</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price</span>
                    <span>${installation.price.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              {installation.rollsUsed && installation.rollsUsed.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Materials Used</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {installation.rollsUsed.map((roll) => (
                        <div key={roll.id} className="text-sm">
                          <div className="flex justify-between">
                            <span className="font-medium">{roll.name}</span>
                            <span>{roll.sqft} ft²</span>
                          </div>
                          <div className="text-xs text-muted-foreground font-mono">
                            {roll.sku}
                          </div>
                          <Separator className="my-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {installation.notes && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{installation.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
} 