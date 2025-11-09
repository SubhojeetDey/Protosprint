"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface RideRequest {
  id: string
  userName: string
  phoneNumber: string
  pickupLocation: string
  latitude: number
  longitude: number
  timestamp: string
}

export default function DriverDashboard() {
  const { currentUser, logout } = useAuth()
  const [rideRequests, setRideRequests] = useState<RideRequest[]>([])
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null)
  const [acceptedRides, setAcceptedRides] = useState<string[]>([])

  // Mock ride requests
  useEffect(() => {
    setRideRequests([
      {
        id: "1",
        userName: "Sarah Johnson",
        phoneNumber: "+1 (555) 123-4567",
        pickupLocation: "Downtown Market, Main St",
        latitude: 40.7128,
        longitude: -74.006,
        timestamp: new Date().toLocaleTimeString(),
      },
      {
        id: "2",
        userName: "Michael Chen",
        phoneNumber: "+1 (555) 987-6543",
        pickupLocation: "Central Park Entrance, 5th Ave",
        latitude: 40.7829,
        longitude: -73.9654,
        timestamp: new Date().toLocaleTimeString(),
      },
      {
        id: "3",
        userName: "Emily Rodriguez",
        phoneNumber: "+1 (555) 456-7890",
        pickupLocation: "Grand Central Terminal",
        latitude: 40.7527,
        longitude: -73.9772,
        timestamp: new Date().toLocaleTimeString(),
      },
    ])
  }, [])

  const handleAcceptRide = (requestId: string) => {
    setAcceptedRides([...acceptedRides, requestId])
    setRideRequests(rideRequests.filter((r) => r.id !== requestId))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Driver Dashboard</h1>
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
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">{rideRequests.length}</p>
                  <p className="text-sm text-muted-foreground">Active Requests</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">{acceptedRides.length}</p>
                  <p className="text-sm text-muted-foreground">Accepted Rides</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">4.8</p>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ride Requests */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Incoming Ride Requests</h2>
            {rideRequests.length > 0 ? (
              <div className="space-y-4">
                {rideRequests.map((request) => (
                  <Card key={request.id} className="border-border hover:border-accent/50 transition-colors">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">{request.userName}</h3>
                            <p className="text-sm text-muted-foreground">{request.phoneNumber}</p>
                          </div>
                          <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">
                            {request.timestamp}
                          </span>
                        </div>

                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Pickup Location</p>
                          <p className="text-foreground font-medium">{request.pickupLocation}</p>
                        </div>

                        <button
                          onClick={() => setExpandedRequest(expandedRequest === request.id ? null : request.id)}
                          className="w-full text-left text-sm text-accent hover:text-accent/80 font-medium py-2"
                        >
                          {expandedRequest === request.id ? "Hide Location" : "Get Location"}
                        </button>

                        {expandedRequest === request.id && (
                          <div className="bg-background border border-border rounded-lg p-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Latitude:</span>
                              <span className="text-sm font-mono text-foreground">{request.latitude.toFixed(4)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Longitude:</span>
                              <span className="text-sm font-mono text-foreground">{request.longitude.toFixed(4)}</span>
                            </div>
                          </div>
                        )}

                        <Button
                          onClick={() => handleAcceptRide(request.id)}
                          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                        >
                          Accept Ride
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-border">
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">No active ride requests</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Accepted Rides */}
          {acceptedRides.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Your Accepted Rides</h2>
              <div className="grid gap-4">
                {acceptedRides.map((rideId) => (
                  <Card key={rideId} className="border-border bg-accent/5">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Ride ID</p>
                          <p className="text-lg font-semibold text-accent">#{rideId}</p>
                        </div>
                        <span className="text-sm bg-accent/20 text-accent px-3 py-1 rounded-full">In Progress</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
