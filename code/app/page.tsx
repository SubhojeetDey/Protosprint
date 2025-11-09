"use client"

import { useAuth } from "@/context/auth-context"
import HomePage from "@/components/home-page"
import DriverDashboard from "@/components/driver-dashboard"
import GuardianDashboard from "@/components/guardian-dashboard"

export default function Page() {
  const { isAuthenticated, currentUser } = useAuth()

  if (!isAuthenticated) {
    return <HomePage />
  }

  if (currentUser?.role === "driver") {
    return <DriverDashboard />
  }

  if (currentUser?.role === "guardian") {
    return <GuardianDashboard />
  }

  return <HomePage />
}
