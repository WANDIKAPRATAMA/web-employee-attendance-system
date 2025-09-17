import { UsersTable } from "@/components/views/clients/internal/dashboard/users/users-page";
import ErrorComponent from "@/components/views/common/place-holder/error-component";
import { listUsersAction } from "@/internal/actions/user-action";
import { auth } from "../../../../../../auth";
import { Fragment, Suspense } from "react";
import TableSkeleton from "@/components/views/common/skeletons/table-skeleton";
import { access } from "fs";
import PaginationControl from "@/components/views/common/table/pagination-controll";
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

  const filters = {
    email:
      typeof searchParams.email === "string" ? searchParams.email : undefined,

    status:
      searchParams.status === "active" || searchParams.status === "inactive"
        ? (searchParams.status as "active" | "inactive")
        : undefined,

    department_id:
      typeof searchParams.department_id === "string"
        ? searchParams.department_id
        : undefined,

    created_at_start:
      typeof searchParams.created_at_start === "string"
        ? searchParams.created_at_start
        : undefined,

    created_at_end:
      typeof searchParams.created_at_end === "string"
        ? searchParams.created_at_end
        : undefined,

    page: searchParams.page ? Number(searchParams.page) : 1,
    limit: searchParams.limit ? Number(searchParams.limit) : 10,
  };
  console.log("🚀 ~ Suspended ~ filters:", filters);

  const token = session.accessToken;

  const {
    payload: { data, pagination, errors },
    status,
    message,
  } = await listUsersAction(filters, token);

  if (status !== "success" || !data || !pagination) {
    return <ErrorComponent title="Error" error={errors[0]} />;
  }
  return (
    <Fragment>
      <UsersTable initialData={data} token={token} />
      <PaginationControl
        paginations={pagination as IPagination}
        limit={filters.limit}
      />
    </Fragment>
  );
}
