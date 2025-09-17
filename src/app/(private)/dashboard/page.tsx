import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponsiveButton } from "@/components/atoms/responsive-button";
import {
  getAdminDashboardAction,
  getAttendanceLogsAction,
  checkCurrentStatusAction,
  getAttendanceHistoryAction,
  clockInAction,
  clockOutAction,
} from "@/internal/actions/attedance-action";
import { getDepartmentsAction } from "@/internal/actions/department-action";
import { getProfileAction } from "@/internal/actions/user-action";
import {
  AdminDashboardResponse,
  GetAttendanceLogsResponse,
  CurrentStatusResponse,
  GetAttendanceHistoryResponse,
} from "@/internal/validations/attedance-validation";
import { GetDepartmentsResponse } from "@/internal/validations/department-validation";
import { ProfileResponse } from "@/internal/validations/user-validation";
import {
  ClockIcon,
  PlusIcon,
  CalendarIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  PersonStandingIcon,
  GeorgianLariIcon,
  EqualApproximatelyIcon,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import ErrorComponent from "@/components/views/common/place-holder/error-component";
import { auth } from "../../../../auth";

// Komponen untuk Dashboard Admin
async function AdminDashboard({ token }: { token: string }) {
  const [dashboardData, departmentsData] = await Promise.all([
    getAdminDashboardAction({}, token),
    getDepartmentsAction({}, token),
  ]);
  console.log("🚀 ~ AdminDashboard ~ departmentsData:", departmentsData);
  console.log("🚀 ~ AdminDashboard ~ dashboardData:", dashboardData);

  if (
    dashboardData.status !== "success" ||
    departmentsData.status !== "success"
  ) {
    return (
      <ErrorComponent title="Error" error="Failed to fetch dashboard data" />
    );
  }

  const dashboard = dashboardData.payload.data as AdminDashboardResponse;
  const departments = departmentsData.payload.data as GetDepartmentsResponse;
  console.log("🚀 ~ AdminDashboard ~ departments:", departments);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Departemen
            </CardTitle>
            <LayoutDashboardIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard.total_updated_depts}
            </div>
            <p className="text-xs text-muted-foreground">Departemen aktif</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pendaftaran Hari Ini
            </CardTitle>
            <PersonStandingIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard.total_today_registrations}
            </div>
            <p className="text-xs text-muted-foreground">Registrasi baru</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Karyawan
            </CardTitle>
            <PersonStandingIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.values(dashboard.total_employees_per_dept).reduce(
                (a, b) => a + b,
                0
              )}
            </div>
            <p className="text-xs text-muted-foreground">Seluruh karyawan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departemen</CardTitle>
            <GeorgianLariIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground">Jumlah departemen</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Statistik Karyawan per Departemen</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="space-y-4">
              {Object.entries(dashboard.total_employees_per_dept).map(
                ([dept, count]) => (
                  <div key={dept} className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{dept}</p>
                    </div>
                    <div className="ml-auto font-medium">
                      <Badge variant="secondary">{count} karyawan</Badge>
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Departemen</CardTitle>
            <CardDescription>Daftar departemen yang terdaftar</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {departments.map((dept) => (
                  <div key={dept.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        {dept.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {dept.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Max Clock In: {dept.max_clock_in_time}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <Badge variant="outline">
                        {dashboard.total_employees_per_dept[dept.name] || 0}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Log Absensi Terbaru</CardTitle>
          <CardDescription>Absensi karyawan hari ini</CardDescription>
        </CardHeader>
        <CardContent>
          <AttendanceLogsTable token={token} />
        </CardContent>
      </Card>
    </div>
  );
}

// Komponen untuk Tabel Log Absensi
async function AttendanceLogsTable({ token }: { token: string }) {
  const today = format(new Date(), "yyyy-MM-dd");
  const logsData = await getAttendanceLogsAction(
    { date: today, limit: 10 },
    token
  );

  if (logsData.status !== "success") {
    return <div>Gagal memuat log absensi</div>;
  }

  const logs = logsData.payload.data as GetAttendanceLogsResponse;
  console.log("🚀 ~ AttendanceLogsTable ~ logs:", logs);

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log.attendance_id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{log.full_name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {log.full_name}
              </p>
              <p className="text-sm text-muted-foreground">
                {log.employee_code}
              </p>
            </div>
            <div className="ml-auto space-y-1 text-right">
              <p className="text-sm font-medium">
                {log.clock_in
                  ? format(parseISO(log.clock_in), "HH:mm")
                  : "--:--"}
                {log.in_punctuality === "late" && (
                  <Badge variant="destructive" className="ml-2">
                    Terlambat
                  </Badge>
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                {log.clock_out
                  ? format(parseISO(log.clock_out), "HH:mm")
                  : "--:--"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

// Komponen untuk Dashboard Karyawan
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
  console.log("🚀 ~ EmployeeDashboard ~ statusData:", statusData);
  const historyData = await getAttendanceHistoryAction(
    { user_id: profile.source_user_id, limit: 5 },
    token
  );
  console.log(
    "🚀 ~ EmployeeDashboard ~ getAttendanceHistoryAction:",
    profile.source_user_id
  );
  console.log("🚀 ~ EmployeeDashboard ~ historyData:", historyData);

  if (statusData.status !== "success" || historyData.status !== "success") {
    return (
      <ErrorComponent title="Error" error="Failed to fetch attendance data" />
    );
  }

  const status = statusData.payload.data as CurrentStatusResponse;
  const history = historyData.payload.data as GetAttendanceHistoryResponse;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Status Saat Ini
            </CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge
                variant={
                  status.status === "Clocked In" ? "default" : "secondary"
                }
              >
                {status.status === "Clocked In"
                  ? "Sedang Bekerja"
                  : "Tidak Aktif"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {status.clock_in
                ? `Masuk: ${format(parseISO(status.clock_in), "HH:mm")}`
                : "Belum absen masuk"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departemen</CardTitle>
            <GeorgianLariIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profile.department?.name || "Tidak ada"}
            </div>
            <p className="text-xs text-muted-foreground">Departemen Anda</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kode Karyawan</CardTitle>
            <PersonStandingIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile.employee_code}</div>
            <p className="text-xs text-muted-foreground">Identifikasi Anda</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aksi Cepat</CardTitle>
            <PlusIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <ClockButton
                status={status}
                token={token}
                variant={status.status === "Clocked In" ? "outline" : "default"}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Riwayat Absensi Terbaru</CardTitle>
            <CardDescription>5 absensi terakhir Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {history.map((record) => (
                  <div key={record.id} className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {format(
                          parseISO(record.date_attendance),
                          "EEEE, dd MMMM yyyy",
                          { locale: id }
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {record.attendance_type === "in"
                          ? "Clock In"
                          : "Clock Out"}{" "}
                        - {record.description}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <Badge
                        variant={
                          record.attendance_type === "in"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {record.attendance_type === "in" ? "Masuk" : "Pulang"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Informasi Profil</CardTitle>
            <CardDescription>Data diri Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={profile.avatar_url}
                    alt={profile.full_name}
                  />
                  <AvatarFallback>
                    {profile.full_name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-lg font-medium leading-none">
                    {profile.full_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {profile.employee_code}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {profile.phone}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Alamat:</span> {profile.address}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Departemen:</span>{" "}
                  {profile.department?.name || "Tidak ada"}
                </p>
                {profile.department && (
                  <p className="text-sm">
                    <span className="font-medium">Batas Waktu:</span> Masuk{" "}
                    {profile.department.max_clock_in_time}, Pulang{" "}
                    {profile.department.max_clock_out_time}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Komponen Button untuk Clock In/Out
function ClockButton({
  status,
  token,
  variant,
}: {
  status: CurrentStatusResponse;
  token: string;
  variant: "default" | "outline";
}) {
  const handleClockIn = async () => {
    "use server";
    await clockInAction(token);
  };

  const handleClockOut = async () => {
    "use server";
    await clockOutAction(token);
  };

  const isClockedIn = status.status === "Clocked In";
  const clockTime = isClockedIn ? status.clock_in : status.clock_out;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant={variant}
          onClick={isClockedIn ? handleClockOut : handleClockIn}
          className="w-full"
        >
          <span className="hidden md:inline">
            {isClockedIn ? "Clock Out" : "Clock In"}
          </span>
          <span className="md:hidden">
            {isClockedIn ? <EqualApproximatelyIcon /> : <ClockIcon />}
          </span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">
            {isClockedIn ? "Clock Out" : "Clock In"}
          </h4>
          <p className="text-sm">
            {isClockedIn
              ? "Klik untuk mencatat waktu pulang Anda"
              : "Klik untuk mencatat waktu masuk Anda"}
          </p>
          {clockTime && (
            <p className="text-xs text-muted-foreground">
              Terakhir: {format(parseISO(clockTime), "dd MMM yyyy HH:mm")}
            </p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

// Komponen utama Dashboard
export default async function Dashboard() {
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

  const role = session.user.role; // "admin" or "employee"
  console.log("🚀 ~ Dashboard ~ session:", session);
  console.log("🚀 ~ Dashboard ~ role:", role);
  const profileData = await getProfileAction(session.accessToken);

  if (profileData.status !== "success") {
    return <ErrorComponent title="Error" error="Failed to fetch profile" />;
  }

  const profile = profileData.payload.data as ProfileResponse;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Dashboard {role === "admin" ? "Admin" : "Karyawan"}
        </h2>
        <div className="flex items-center space-x-2">
          <Badge variant={role === "admin" ? "default" : "secondary"}>
            {role === "admin" ? "Administrator" : "Karyawan"}
          </Badge>
          <Avatar>
            <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
            <AvatarFallback>{profile.full_name.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <LayoutDashboardIcon className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="attendance">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Absensi</span>
          </TabsTrigger>
          {role === "admin" && (
            <TabsTrigger value="reports">
              <FileTextIcon className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Laporan</span>
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          {role === "admin" ? (
            <AdminDashboard token={session.accessToken} />
          ) : (
            <EmployeeDashboard token={session.accessToken} profile={profile} />
          )}
        </TabsContent>
        <TabsContent value="attendance">
          {/* Konten tab absensi akan diimplementasi sesuai kebutuhan */}
          <Card>
            <CardHeader>
              <CardTitle>Manajemen Absensi</CardTitle>
              <CardDescription>Kelola data absensi Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Fitur manajemen absensi akan segera hadir.</p>
            </CardContent>
          </Card>
        </TabsContent>
        {role === "admin" && (
          <TabsContent value="reports">
            {/* Konten tab laporan untuk admin */}
            <Card>
              <CardHeader>
                <CardTitle>Laporan Administratif</CardTitle>
                <CardDescription>Akses laporan dan analitik</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Fitur laporan administratif akan segera hadir.</p>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
