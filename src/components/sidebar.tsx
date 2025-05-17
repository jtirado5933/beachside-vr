"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Calendar, Home, Hotel, LayoutDashboard, Palmtree, Settings, Sparkles, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Beach Properties",
      icon: Home,
      href: "/properties",
      active: pathname === "/properties",
    },
    {
      label: "Vacation Bookings",
      icon: Hotel,
      href: "/bookings",
      active: pathname === "/bookings",
    },
    {
      label: "Cleaning",
      icon: Sparkles,
      href: "/cleaning",
      active: pathname === "/cleaning",
    },
    {
      label: "Schedule",
      icon: Calendar,
      href: "/schedule",
      active: pathname === "/schedule",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      active: pathname === "/analytics",
    },
    {
      label: "Staff",
      icon: Users,
      href: "/team",
      active: pathname === "/team",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
  ]

  return (
    <div className="flex h-full flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Palmtree className="h-6 w-6" />
          <span>BeachVacations</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={route.active ? "default" : "ghost"}
              className={cn(
                "justify-start",
                route.active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}
