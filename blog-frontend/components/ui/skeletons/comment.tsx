"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function CommentSkeleton() {
  return (
    <div className="max-w-3xl w-full mx-auto">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          key={index}
          className="my-6 shadow-md border border-border bg-gray-100 dark:bg-gray-800"
        >
          <CardHeader>
            <div className="flex justify-end items-center">
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>
          </CardHeader>

          <Separator className="border-t border-gray-300 dark:border-gray-600 mb-6" />

          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>

          <Separator className="border-t border-gray-300 dark:border-gray-600 mb-6" />

          <div className="px-6 pb-4 gap-2 flex flex-col sm:flex-row justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </Card>
      ))}
    </div>
  );
}
