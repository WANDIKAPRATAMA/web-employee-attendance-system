import { DepartmentTable } from "@/components/views/clients/internal/dashboard/departments/page";
import { auth } from "../../../../../../auth";
import ErrorComponent from "@/components/views/common/place-holder/error-component";
import { getDepartmentsAction } from "@/internal/actions/department-action";
import TableSkeleton from "@/components/views/common/skeletons/table-skeleton";
import { Fragment, Suspense } from "react";
import PaginationControl from "@/components/views/common/table/pagination-controll";

// UMP,EMETASIAKN SEARCH QUERY DISINI
export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <Suspended searchParams={searchParams} />
    </Suspense>
  );
}

async function Suspended({
  searchParams: params,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const session = await auth();
  const searchParams = await params;
  if (!session?.accessToken) {
    return (
      <ErrorComponent
        title="Unauthorized"
        error="Please Sign in to Continue"
        redirect
      />
    );
  }

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.per_page) || 10;

  const {
    payload: { data, pagination, errors },
    status,
  } = await getDepartmentsAction(
    {
      limit,
      page,
    },
    session.accessToken
  );

  if (status !== "success" || data == null || !pagination) {
    return (
      <ErrorComponent title="Error" error={errors?.[0] ?? "Unknown error"} />
    );
  }

  return (
    <Fragment>
      <DepartmentTable data={data} token={session.accessToken} limit={limit} />
      <PaginationControl
        paginations={pagination as IPagination}
        limit={limit}
      />
    </Fragment>
  );
}
