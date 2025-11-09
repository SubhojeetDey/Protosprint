"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DriverRegistrationFormProps {
  onBackClick: () => void
}

export default function DriverRegistrationForm({ onBackClick }: DriverRegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userId: "",
    password: "",
    confirmPassword: "",
    vehicleModel: "",
    licensePlate: "",
  })
  const { register } = useAuth()

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      formData.name &&
      formData.email &&
      formData.userId &&
      formData.password &&
      formData.password === formData.confirmPassword
    ) {
      register(formData.userId, formData.name, formData.email, "driver")
    }
  }

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.userId &&
    formData.password &&
    formData.password === formData.confirmPassword &&
    formData.vehicleModel &&
    formData.licensePlate

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Driver Registration</CardTitle>
        <CardDescription>Create your driver account to start accepting rides</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Full Name</label>
            <Input
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange("name")}
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange("email")}
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Driver User ID</label>
            <Input
              placeholder="Choose a unique user ID"
              value={formData.userId}
              onChange={handleChange("userId")}
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Vehicle Model</label>
            <Input
              placeholder="e.g. Toyota Camry 2021"
              value={formData.vehicleModel}
              onChange={handleChange("vehicleModel")}
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">License Plate</label>
            <Input
              placeholder="e.g. ABC-1234"
              value={formData.licensePlate}
              onChange={handleChange("licensePlate")}
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <Input
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange("password")}
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Confirm Password</label>
            <Input
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              className="bg-background border-border"
            />
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-sm text-destructive">Passwords do not match</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Register as Driver
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
