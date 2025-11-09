"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DriverLoginFormProps {
  onBackClick: () => void
}

export default function DriverLoginForm({ onBackClick }: DriverLoginFormProps) {
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (userId && password) {
      // Mock driver login
      login(userId, `Driver ${userId}`, "driver")
    }
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Driver Login</CardTitle>
        <CardDescription>Enter your credentials to access ride requests</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Driver User ID</label>
            <Input
              placeholder="Enter your user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background border-border"
            />
          </div>
          <Button
            type="submit"
            disabled={!userId || !password}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Login as Driver
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
