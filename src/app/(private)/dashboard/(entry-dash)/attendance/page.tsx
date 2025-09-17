import { AttendanceLogsTable } from "@/components/views/clients/internal/dashboard/admin/attendance-logs";
import TableSkeleton from "@/components/views/common/skeletons/table-skeleton";
import AttendanceWrapper from "@/components/views/server/dashboard/admin/attendance-wrapper";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default function Page({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <AttendanceWrapper searchParams={searchParams} />
    </Suspense>
  );
}
