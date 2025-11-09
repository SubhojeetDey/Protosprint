"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface GuardianRegistrationFormProps {
  onBackClick: () => void
}

export default function GuardianRegistrationForm({ onBackClick }: GuardianRegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userId: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    relationship: "",
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
      register(formData.userId, formData.name, formData.email, "guardian")
    }
  }

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.userId &&
    formData.password &&
    formData.password === formData.confirmPassword &&
    formData.phoneNumber

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Guardian Registration</CardTitle>
        <CardDescription>Create your guardian account to track and monitor rides</CardDescription>
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
            <label className="text-sm font-medium text-foreground">Guardian User ID</label>
            <Input
              placeholder="Choose a unique user ID"
              value={formData.userId}
              onChange={handleChange("userId")}
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Phone Number</label>
            <Input
              type="tel"
              placeholder="e.g. +1 (555) 123-4567"
              value={formData.phoneNumber}
              onChange={handleChange("phoneNumber")}
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Relationship (Optional)</label>
            <Input
              placeholder="e.g. Parent, Sibling, Friend"
              value={formData.relationship}
              onChange={handleChange("relationship")}
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
            Register as Guardian
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
