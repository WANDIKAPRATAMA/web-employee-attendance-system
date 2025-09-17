import { AttendanceLogsTable } from "@/components/views/clients/internal/dashboard/admin/attendance-logs";
import { getAttendanceLogsAction } from "@/internal/actions/attedance-action";
import { getDepartmentsAction } from "@/internal/actions/department-action";
import { auth } from "../../../../../../auth";
import ErrorComponent from "@/components/views/common/place-holder/error-component";
import PaginationControl from "@/components/views/common/table/pagination-controll";

export default async function AttendanceWrapper({
  searchParams: params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();
  const searchParams = await params;

  if (!session?.accessToken)
    return (
      <ErrorComponent
        title="Unauthorized"
        error="Please Sign in to Continue"
        redirect
      />
    );
  const token = session?.accessToken;

  // Convert searchParams to GetAttendanceLogsRequest
  const filters = {
    date: searchParams?.date as string,
    department_id: searchParams?.department_id as string,
    page: searchParams?.page ? Number(searchParams.page) : undefined,
    limit: searchParams?.limit ? Number(searchParams.limit) : undefined,
  };

  const [attendanceLogs, departments] = await Promise.all([
    getAttendanceLogsAction(filters, token),
    getDepartmentsAction({}, token),
  ]);

  const departmentsList =
    departments.status === "success"
      ? departments.payload.data?.map((dept) => ({
          id: dept.id,
          name: dept.name,
          maxClockIn: dept.max_clock_in_time,
          maxClockOut: dept.max_clock_out_time,
        })) || []
      : [];
  const paginations = (attendanceLogs.payload.pagination || {}) as IPagination;
  const logs = (attendanceLogs.payload.data || []).map((log) => ({
    ...log,
    department_detail: departmentsList.find(
      (d) => d.name === log.department_name
    ),
  }));
  console.log("🚀 ~ AttendanceWrapper ~ logs:", logs);

  return (
    <div className="container mx-auto py-6">
      <AttendanceLogsTable
        initialData={logs}
        token={token}
        departments={departmentsList}
      />
      <PaginationControl
        paginations={paginations}
        limit={filters.limit ?? 10}
      />
    </div>
  );
}
