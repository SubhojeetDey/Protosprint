"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import DriverLoginForm from "./driver-login-form"
import GuardianLoginForm from "./guardian-login-form"
import DriverRegistrationForm from "./driver-registration-form"
import GuardianRegistrationForm from "./guardian-registration-form"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [showDriverLogin, setShowDriverLogin] = useState(false)
  const [showGuardianLogin, setShowGuardianLogin] = useState(false)
  const [showDriverRegister, setShowDriverRegister] = useState(false)
  const [showGuardianRegister, setShowGuardianRegister] = useState(false)
  const { logout } = useAuth()

  const resetForms = () => {
    setShowDriverLogin(false)
    setShowGuardianLogin(false)
    setShowDriverRegister(false)
    setShowGuardianRegister(false)
  }

  const isFormShowing = showDriverLogin || showGuardianLogin || showDriverRegister || showGuardianRegister

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">VM</span>
              </div>
              <span className="text-xl font-bold text-foreground">VisionMate</span>
            </div>

            <div className="flex items-center gap-4">
              {!isFormShowing ? (
                <>
                  <Button
                    onClick={() => setShowDriverLogin(true)}
                    variant="outline"
                    className="border-border hover:bg-muted"
                  >
                    Driver Login
                  </Button>
                  <Button
                    onClick={() => setShowGuardianLogin(true)}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Guardian Login
                  </Button>
                </>
              ) : (
                <Button onClick={resetForms} variant="ghost">
                  Back
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {showDriverLogin ? (
          <div className="max-w-md mx-auto space-y-4">
            <DriverLoginForm onBackClick={resetForms} />
            <p className="text-center text-sm text-muted-foreground">
              {"Don't have an account? "}
              <Button
                variant="link"
                className="p-0 h-auto text-accent"
                onClick={() => {
                  setShowDriverLogin(false)
                  setShowDriverRegister(true)
                }}
              >
                Register as Driver
              </Button>
            </p>
          </div>
        ) : showGuardianLogin ? (
          <div className="max-w-md mx-auto space-y-4">
            <GuardianLoginForm onBackClick={resetForms} />
            <p className="text-center text-sm text-muted-foreground">
              {"Don't have an account? "}
              <Button
                variant="link"
                className="p-0 h-auto text-accent"
                onClick={() => {
                  setShowGuardianLogin(false)
                  setShowGuardianRegister(true)
                }}
              >
                Register as Guardian
              </Button>
            </p>
          </div>
        ) : showDriverRegister ? (
          <div className="max-w-md mx-auto space-y-4">
            <DriverRegistrationForm onBackClick={resetForms} />
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto text-accent"
                onClick={() => {
                  setShowDriverRegister(false)
                  setShowDriverLogin(true)
                }}
              >
                Login as Driver
              </Button>
            </p>
          </div>
        ) : showGuardianRegister ? (
          <div className="max-w-md mx-auto space-y-4">
            <GuardianRegistrationForm onBackClick={resetForms} />
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto text-accent"
                onClick={() => {
                  setShowGuardianRegister(false)
                  setShowGuardianLogin(true)
                }}
              >
                Login as Guardian
              </Button>
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">Welcome to VisionMate</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Safe ride-sharing with real-time guardian tracking. Drive with confidence. Travel with peace of mind.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-card border border-border rounded-lg p-8 hover:border-accent/50 transition-colors">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🚗</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">For Drivers</h3>
                <p className="text-muted-foreground mb-4">
                  Accept ride requests, view passenger details, and manage your route efficiently.
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowDriverLogin(true)}
                    variant="outline"
                    className="flex-1 border-border hover:bg-muted"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => setShowDriverRegister(true)}
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Register
                  </Button>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-8 hover:border-accent/50 transition-colors">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">👨‍👩‍👧</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">For Guardians</h3>
                <p className="text-muted-foreground mb-4">
                  Track your loved one in real-time and monitor driver details during their journey.
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowGuardianLogin(true)}
                    variant="outline"
                    className="flex-1 border-border hover:bg-muted"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => setShowGuardianRegister(true)}
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
