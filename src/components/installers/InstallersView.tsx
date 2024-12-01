"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InstallerCard } from "./InstallerCard"
import UserManagementDialog from "../settings/UserManagementDialog"
import type { Installer } from "@/types"

const mockInstallers: Installer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Smith',
    role: 'Lead',
    joinedDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'Installer',
    joinedDate: '2023-03-01',
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike@example.com',
    firstName: 'Mike',
    lastName: 'Wilson',
    role: 'Trainee',
    joinedDate: '2024-01-10',
  },
]

export function InstallersView() {
  const [installers, setInstallers] = useState<Installer[]>(mockInstallers)
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedInstaller, setSelectedInstaller] = useState<Installer>()

  const filteredInstallers = installers.filter(installer => 
    installer.name.toLowerCase().includes(search.toLowerCase()) ||
    installer.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddInstaller = (installer: Omit<Installer, 'id' | 'name'>) => {
    const name = `${installer.firstName} ${installer.lastName}`
    
    if (selectedInstaller) {
      setInstallers(installers.map(inst => 
        inst.id === selectedInstaller.id 
          ? { ...inst, ...installer, name }
          : inst
      ))
      setSelectedInstaller(undefined)
    } else {
      const newInstaller = {
        ...installer,
        id: Math.random().toString(36).substr(2, 9),
        name,
      }
      setInstallers([...installers, newInstaller])
    }
    setDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Installers</h1>
          <p className="text-muted-foreground">
            Manage your team of PPF installers.
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Installer
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Search installers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredInstallers.map((installer) => (
          <InstallerCard
            key={installer.id}
            installer={installer}
            onClick={() => {
              setSelectedInstaller(installer)
              setDialogOpen(true)
            }}
          />
        ))}
      </div>

      <UserManagementDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        installer={selectedInstaller}
        onSave={handleAddInstaller}
      />
    </div>
  )
}