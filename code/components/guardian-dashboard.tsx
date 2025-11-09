"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PersonLocation {
  id: string
  name: string
  latitude: number
  longitude: number
  status: "traveling" | "arrived" | "waiting"
  driverName?: string
  driverPhone?: string
  vehicleNumber?: string
  lastUpdated: string
}

export default function GuardianDashboard() {
  const { currentUser, logout } = useAuth()
  const [trackedPersons, setTrackedPersons] = useState<PersonLocation[]>([])
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null)
  const [isSimulatingMovement, setIsSimulatingMovement] = useState(false)

  // Mock tracked persons with real-time location simulation
  useEffect(() => {
    setTrackedPersons([
      {
        id: "person1",
        name: "Alex Johnson (Daughter)",
        latitude: 40.7128,
        longitude: -74.006,
        status: "traveling",
        driverName: "James Wilson",
        driverPhone: "+1 (555) 111-2222",
        vehicleNumber: "NY-ABC-1234",
        lastUpdated: new Date().toLocaleTimeString(),
      },
      {
        id: "person2",
        name: "Emma Davis (Son)",
        latitude: 40.7829,
        longitude: -73.9654,
        status: "traveling",
        driverName: "Robert Martinez",
        driverPhone: "+1 (555) 333-4444",
        vehicleNumber: "NY-XYZ-5678",
        lastUpdated: new Date().toLocaleTimeString(),
      },
    ])

    // Simulate real-time location updates
    if (isSimulatingMovement) {
      const interval = setInterval(() => {
        setTrackedPersons((prev) =>
          prev.map((person) => ({
            ...person,
            latitude: person.latitude + (Math.random() - 0.5) * 0.001,
            longitude: person.longitude + (Math.random() - 0.5) * 0.001,
            lastUpdated: new Date().toLocaleTimeString(),
          })),
        )
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isSimulatingMovement])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Guardian Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome, {currentUser?.name}!</p>
            </div>
            <Button onClick={logout} variant="outline" className="border-border hover:bg-muted bg-transparent">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Control Panel */}
          <Card className="border-border bg-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Real-time Location Tracking</p>
                  <p className="text-xs text-muted-foreground">Locations are updated every 3 seconds</p>
                </div>
                <Button
                  onClick={() => setIsSimulatingMovement(!isSimulatingMovement)}
                  className={
                    isSimulatingMovement
                      ? "bg-destructive hover:bg-destructive/90"
                      : "bg-accent hover:bg-accent/90 text-accent-foreground"
                  }
                >
                  {isSimulatingMovement ? "Stop Tracking" : "Start Tracking"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tracked Persons */}
          <div className="space-y-4">
            {trackedPersons.map((person) => (
              <Card key={person.id} className="border-border hover:border-accent/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Person Info */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{person.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          <p className="text-sm text-muted-foreground capitalize">{person.status}</p>
                        </div>
                      </div>
                      <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">
                        Updated: {person.lastUpdated}
                      </span>
                    </div>

                    {/* Live Location */}
                    <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                      <p className="text-sm font-medium text-foreground">Current Location</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-background rounded p-3">
                          <p className="text-xs text-muted-foreground mb-1">Latitude</p>
                          <p className="text-sm font-mono text-foreground">{person.latitude.toFixed(6)}</p>
                        </div>
                        <div className="bg-background rounded p-3">
                          <p className="text-xs text-muted-foreground mb-1">Longitude</p>
                          <p className="text-sm font-mono text-foreground">{person.longitude.toFixed(6)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Driver Details */}
                    {person.driverName && (
                      <div className="bg-background border border-border rounded-lg p-4 space-y-3">
                        <p className="text-sm font-medium text-foreground">Driver Information</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Driver Name:</span>
                            <span className="text-sm font-semibold text-foreground">{person.driverName}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Contact:</span>
                            <span className="text-sm font-semibold text-accent">{person.driverPhone}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Vehicle:</span>
                            <span className="text-sm font-mono text-foreground font-semibold">
                              {person.vehicleNumber}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="border-border hover:bg-muted bg-transparent"
                        onClick={() => setSelectedPerson(selectedPerson === person.id ? null : person.id)}
                      >
                        {selectedPerson === person.id ? "Hide Details" : "View Details"}
                      </Button>
                      <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Call Driver</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Status Legend */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Tracking Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Active - Currently traveling</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Arrived - Destination reached</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Waiting - Stationary location</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
