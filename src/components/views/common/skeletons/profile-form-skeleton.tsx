import { Skeleton } from "@/components/ui/skeleton";

export function ProfileFormSkeleton() {
  return (
    <div className="space-y-8 animate-pulse max-w-2xl  mx-auto ">
      {/* Profile Photo Upload Skeleton */}
      <div className="flex flex-col items-center gap-6">
        <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
        <div className="relative rounded-full overflow-hidden w-32 h-32 border-2 border-gray-200 dark:border-gray-700">
          <Skeleton className="w-full h-full bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>

      {/* Username Field Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-20 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-10 w-full bg-gray-100 dark:bg-gray-800" />
        <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Email Field Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-16 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-10 w-full bg-gray-100 dark:bg-gray-800" />
        <Skeleton className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Submit Button Skeleton */}
      <Skeleton className="h-10 w-32 bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}
