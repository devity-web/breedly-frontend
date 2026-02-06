import {Skeleton} from '@/components/ui/skeleton';

export default function DogSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header: back arrow + name + date */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-32" />
        </div>
        <Skeleton className="h-5 w-36" />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-9 w-20 rounded-md" />
        <Skeleton className="h-9 w-20 rounded-md" />
        <Skeleton className="h-9 w-16 rounded-md" />
        <Skeleton className="h-9 w-18 rounded-md" />
        <Skeleton className="h-9 w-18 rounded-md" />
      </div>

      {/* Card */}
      <div className="rounded-xl border border-border bg-card p-6">
        {/* Card header */}
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-6 w-24" />
        </div>

        {/* Form fields row 1: Name + Assigned Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        {/* Form fields row 2: Passport + Chip ID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-20 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>
    </div>
  );
}
