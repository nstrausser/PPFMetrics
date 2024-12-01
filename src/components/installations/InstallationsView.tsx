"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InstallationCard } from "./InstallationCard"
import NewInstallationModal from "../NewInstallationModal"

const mockInstallations = [
  {
    id: '1',
    date: '2024-01-15',
    customer: 'John Doe',
    vehicle: '2023 Tesla Model 3',
    installer: 'Sarah Johnson',
    status: 'completed',
    price: 2499.99,
    sqft: 125.5,
  },
  {
    id: '2',
    date: '2024-01-14',
    customer: 'Alice Smith',
    vehicle: '2024 BMW M4',
    installer: 'John Smith',
    status: 'in-progress',
    price: 3299.99,
    sqft: 165.2,
  },
  {
    id: '3',
    date: '2024-01-14',
    customer: 'Bob Wilson',
    vehicle: '2023 Porsche 911',
    installer: 'Sarah Johnson',
    status: 'needs-recut',
    price: 4199.99,
    sqft: 185.8,
  },
]

export function InstallationsView() {
  const [installations, setInstallations] = useState(mockInstallations)
  const [search, setSearch] = useState("")
  const [modalOpen, setModalOpen] = useState(false)

  const filteredInstallations = installations.filter(installation => 
    installation.customer.toLowerCase().includes(search.toLowerCase()) ||
    installation.vehicle.toLowerCase().includes(search.toLowerCase()) ||
    installation.installer.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Installations</h1>
          <p className="text-muted-foreground">
            Manage your PPF installations.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Installation
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Search installations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredInstallations.map((installation) => (
          <InstallationCard
            key={installation.id}
            installation={installation}
            onClick={() => {
              // Handle installation click
              console.log('Installation clicked:', installation)
            }}
          />
        ))}
      </div>

      <NewInstallationModal
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  )
}