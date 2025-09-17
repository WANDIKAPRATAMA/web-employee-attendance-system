import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProfileAction } from "@/internal/actions/user-action";
import { ProfileResponse } from "@/internal/validations/user-validation";
import ErrorComponent from "@/components/views/common/place-holder/error-component";
import { auth } from "../../../../../auth";
import EmployeeDashboard from "@/components/views/clients/internal/dashboard/employee/employe-dashboard";
import { WaitingDepartment } from "@/components/views/clients/internal/dashboard/employee/waiting-department";
import { AdminDashboard } from "@/components/views/clients/internal/dashboard/admin/admin-dashboard";

export default async function Layout({ children }: ChildrenProps) {
  const session = await auth();

  if (!session?.accessToken) {
    return (
      <ErrorComponent
        title="Unauthorized"
        error="Please Sign in to Continue"
        redirect
      />
    );
  }

  const role = session.user.role;

  const profileData = await getProfileAction(session.accessToken);

  if (profileData.status !== "success") {
    return <ErrorComponent title="Error" error="Failed to fetch profile" />;
  }

  const profile = profileData.payload.data as ProfileResponse;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Dashboard {role === "admin" ? "Admin" : "Employee"}
          <p className="text-muted-foreground">
            Welcome back, {profile.full_name}
          </p>
        </h2>
        <div className="flex items-center space-x-2">
          <Badge variant={role === "admin" ? "default" : "secondary"}>
            {role === "admin" ? "Administrator" : "Employee"}
          </Badge>
          <Avatar>
            <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
            <AvatarFallback>{profile.full_name.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      {role === "admin" ? (
        <AdminDashboard token={session.accessToken} children={children} />
      ) : profile.department_id ? (
        <EmployeeDashboard token={session.accessToken} profile={profile} />
      ) : (
        <WaitingDepartment profile={profile} />
      )}
    </div>
  );
}
