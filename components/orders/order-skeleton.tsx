"use client";
import { Skeleton } from "@/components/ui/skeleton";

export function OrderSkeleton() {
  return (
    <div className="flex flex-col space-y-2 flex-wrap h-screen w-screen">
      <div>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
      <div>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
      <div>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
    </div>
  );
}
