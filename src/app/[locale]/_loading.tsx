import { DashboardHeader } from "~/components/header";
import { Skeleton } from "@/components/ui/skeleton";
// import { PostCreateButton } from "~/components/post-create-button"
// import { PostItem } from "~/components/post-item"
import { DashboardShell } from "~/components/shell";

function SkeletonItem() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Users" text="Create and manage users.">
        {/* <PostCreateButton /> */}
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </div>
    </DashboardShell>
  );
}
