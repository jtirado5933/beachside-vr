import Link from "next/link"
import { BookingMetrics } from "@/components/booking-metrics"
import { CleaningMetrics } from "@/components/cleaning-metrics"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { PropertyDetails } from "@/components/property-details"
import { SchedulingMetrics } from "@/components/scheduling-metrics"
import { SeasonalAnalysis } from "@/components/seasonal-analysis"
import { SummaryCards } from "@/components/summary-cards"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Beachside VR | Vaction Rentals Dashboard"
        text="Track performance metrics for your beach vacation rental properties"
      >
        <Link
          href="/properties"
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          View All Beach Properties
        </Link>
      </DashboardHeader>
      <div className="grid gap-6">
        <SummaryCards />
        <PropertyDetails />
        <BookingMetrics />
        <CleaningMetrics />
        <SchedulingMetrics />
        <SeasonalAnalysis />
      </div>
    </DashboardShell>
  )
}
