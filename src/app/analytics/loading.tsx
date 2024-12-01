import { Loading } from "@/components/ui/loading"

export default function AnalyticsLoading() {
  return (
    <div className="h-[calc(100vh-72px)] flex items-center justify-center">
      <Loading size="lg" text="Loading analytics..." />
    </div>
  )
} 