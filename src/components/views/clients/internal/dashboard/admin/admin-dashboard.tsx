import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAdminDashboardAction } from "@/internal/actions/attedance-action";
import { getDepartmentsAction } from "@/internal/actions/department-action";
import { AdminDashboardResponse } from "@/internal/validations/attedance-validation";
import { GetDepartmentsResponse } from "@/internal/validations/department-validation";
import { Building, UserPlus, Users, BarChart3 } from "lucide-react";
import ErrorComponent from "@/components/views/common/place-holder/error-component";
import { StatCard } from "./stats-card";
import { EmployeeStatistics } from "./employee-stats";
import { DepartmentList } from "./department-list";

type AdminDashboardType = { token: string } & ChildrenProps;
export async function AdminDashboard({ token, children }: AdminDashboardType) {
  const [dashboardData, departmentsData] = await Promise.all([
    getAdminDashboardAction({}, token),
    getDepartmentsAction({}, token),
  ]);

  if (
    dashboardData.status !== "success" ||
    departmentsData.status !== "success"
  ) {
    return (
      <ErrorComponent
        title="Error Loading Dashboard"
        error="Failed to fetch dashboard data. Please try again later."
      />
    );
  }

  const dashboard = dashboardData.payload.data as AdminDashboardResponse;
  const departments = departmentsData.payload.data as GetDepartmentsResponse;
  const totalEmployees = Object.values(
    dashboard.total_employees_per_dept
  ).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Departments"
          value={dashboard.total_updated_depts}
          description="Active departments"
          icon={Building}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Today's Registrations"
          value={dashboard.total_today_registrations}
          description="New registrations"
          icon={UserPlus}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          description="All employees"
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Department Count"
          value={departments.length}
          description="Total departments"
          icon={BarChart3}
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Employee Statistics */}
        <div className="lg:col-span-4">
          <EmployeeStatistics
            employeeCounts={dashboard.total_employees_per_dept}
          />
        </div>

        {/* Department List */}
        <div className="lg:col-span-3">
          <DepartmentList
            departments={departments}
            employeeCounts={dashboard.total_employees_per_dept}
          />
        </div>
      </div>

      {/* Recent Attendance Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance Logs</CardTitle>
          <CardDescription>Today's employee attendance records</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
