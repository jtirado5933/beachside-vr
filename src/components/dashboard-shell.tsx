import type React from "react"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/sidebar"

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({ children, className, ...props }: DashboardShellProps) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr]">
      <Sidebar />
      <main className="flex flex-1 flex-col bg-muted/40">
        <div className={cn("container flex-1 space-y-6 p-4 md:p-8", className)} {...props}>
          {children}
        </div>
      </main>
    </div>
  )
}
