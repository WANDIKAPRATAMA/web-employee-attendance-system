import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import {
  Clock,
  Building,
  IdCard,
  Calendar,
  AlertCircle,
  MapPin,
  Phone,
  TrendingUp,
} from "lucide-react";

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CurrentStatusResponse,
  GetAttendanceHistoryResponse,
} from "@/internal/validations/attedance-validation";
import {
  checkCurrentStatusAction,
  getAttendanceHistoryAction,
} from "@/internal/actions/attedance-action";
import { ProfileResponse } from "@/internal/validations/user-validation";
import { StatusCard } from "./status-card";
import { DepartmentResponse } from "@/internal/validations/department-validation";
import { analyzePunctuality } from "./anylize";
import { AttendanceHistoryItem } from "./attedance-item";
import { Progress } from "@/components/ui/progress";
import { ClockButton } from "./clock-button";
import { ProfileCard } from "./profile-card";

async function EmployeeDashboard({
  token,
  profile,
}: {
  token: string;
  profile: ProfileResponse;
}) {
  const statusData = await checkCurrentStatusAction(
    { user_id: profile.source_user_id },
    token
  );

  const historyData = await getAttendanceHistoryAction(
    { user_id: profile.source_user_id, limit: 4 },
    token
  );

  if (statusData.status !== "success" || historyData.status !== "success") {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h3 className="text-lg font-medium">Failed to fetch attendance data</h3>
        <p className="text-sm text-muted-foreground text-center">
          Please try refreshing the page or contact support if the problem
          persists.
        </p>
      </div>
    );
  }

  const status = statusData.payload.data as CurrentStatusResponse;
  const history = historyData.payload.data as GetAttendanceHistoryResponse;
  const department = profile?.department as DepartmentResponse;

  let onTimeCount = 0;
  let lateCount = 0;
  let earlyCount = 0;

  history.forEach((record) => {
    const analysis = analyzePunctuality(
      record,
      department,
      record.attendance_type
    );
    if (analysis.status === "on-time") onTimeCount++;
    if (analysis.status === "late") lateCount++;
    if (analysis.status === "early") earlyCount++;
  });

  const totalRecords = history.length;
  const onTimePercentage =
    totalRecords > 0 ? (onTimeCount / totalRecords) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatusCard status={status} />

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Department</CardTitle>
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <Building className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {department?.name || "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Your department</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Punctuality</CardTitle>
            <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(onTimePercentage)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {onTimeCount} on time / {totalRecords} records
            </p>
            <Progress value={onTimePercentage} className="mt-2" />
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">
              Quick Actions
            </CardTitle>
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <Clock className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                Work Hours
              </p>
              <p className="text-xs text-green-700 dark:text-green-300">
                {department ? (
                  <>
                    {format(parseISO(department.max_clock_in_time), "HH:mm")} -{" "}
                    {format(parseISO(department.max_clock_out_time), "HH:mm")}
                  </>
                ) : (
                  "Not set"
                )}
              </p>
            </div>
            <ClockButton status={status} token={token} />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-1/3">
          <TabsTrigger value="history">Attendance History</TabsTrigger>
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Attendance History & Analysis</CardTitle>
              <CardDescription>
                Your recent attendance records with punctuality analysis
                {department && (
                  <span className="block text-xs mt-1">
                    Based on department policy: Clock in by{" "}
                    {format(parseISO(department.max_clock_in_time), "HH:mm")},
                    Clock out after{" "}
                    {format(parseISO(department.max_clock_out_time), "HH:mm")}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No attendance records</h3>
                  <p className="text-sm text-muted-foreground">
                    Your attendance history will appear here once you start
                    clocking in.
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {history.map((record) => (
                      <AttendanceHistoryItem
                        key={record.id}
                        record={record}
                        department={department}
                      />
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <ProfileCard profile={profile} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default EmployeeDashboard;
