"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  Search,
  Calendar,
  Building,
  User,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, RefreshCw } from "lucide-react";
import { getAttendanceLogsAction } from "@/internal/actions/attedance-action";
import {
  AttendanceLogResponse,
  GetAttendanceLogsRequest,
} from "@/internal/validations/attedance-validation";
import { AttendanceFilters } from "./attendance-filter";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatIndoTime } from "@/lib/time";

// Columns definition
const columns: ColumnDef<Logs>[] = [
  {
    accessorKey: "employee_code",
    header: "ID",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("employee_code")}</div>
    ),
  },
  {
    accessorKey: "full_name",
    header: "Employee",
    cell: ({ row }) => (
      <div className="flex items-center">
        <User className="h-4 w-4 mr-2 text-muted-foreground" />
        <span className="font-medium">{row.getValue("full_name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "department_name",
    header: "Department",
    cell: ({ row }) => {
      const original = row.original.department_detail;
      return (
        <div className="flex items-center">
          <Building className="h-4 w-4 mr-2 text-muted-foreground" />

          <HoverCard>
            <HoverCardTrigger asChild>
              <Badge variant="outline">{row.getValue("department_name")}</Badge>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{original?.name}</h4>
                  {original?.maxClockIn && (
                    <p className="text-sm">
                      Max Clock in on:
                      <span className="text-sm">
                        {formatIndoTime(original?.maxClockIn)}
                      </span>
                    </p>
                  )}
                  {original?.maxClockOut && (
                    <p className="text-muted-foreground text-xs">
                      Max Clock Out on:
                      <span className="text-sm">
                        {formatIndoTime(original?.maxClockOut)}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      );
    },
  },
  {
    accessorKey: "clock_in",
    header: "Clock In",
    cell: ({ row }) => {
      const clockIn = row.getValue("clock_in");
      return (
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          {clockIn ? (
            <span className="text-sm">
              {format(parseISO(clockIn as string), "HH:mm:ss")}
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">-</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "clock_out",
    header: "Clock Out",
    cell: ({ row }) => {
      const clockOut = row.getValue("clock_out");
      return (
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          {clockOut ? (
            <span className="text-sm">
              {format(parseISO(clockOut as string), "HH:mm:ss")}
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">-</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "in_punctuality",
    header: "In Status",
    cell: ({ row }) => {
      const status = row.getValue("in_punctuality");
      const isOnTime = status === "on_time";

      return (
        <Badge
          variant={isOnTime ? "default" : "destructive"}
          className="flex items-center"
        >
          {isOnTime ? (
            <CheckCircle className="h-3 w-3 mr-1" />
          ) : (
            <AlertCircle className="h-3 w-3 mr-1" />
          )}
          {isOnTime ? "On Time" : "Late"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "out_punctuality",
    header: "Out Status",
    cell: ({ row }) => {
      const status = row.getValue("out_punctuality");
      const isOnTime = status === "on_time";

      return (
        <Badge
          variant={isOnTime ? "default" : "secondary"}
          className="flex items-center"
        >
          {isOnTime ? (
            <CheckCircle className="h-3 w-3 mr-1" />
          ) : (
            <AlertCircle className="h-3 w-3 mr-1" />
          )}
          {isOnTime ? "On Time" : "Early"}
        </Badge>
      );
    },
  },
];
type DepartmentDetail =
  | {
      id: string;
      name: string;
      maxClockIn: string;
      maxClockOut: string;
    }
  | undefined;
type Logs = AttendanceLogResponse & {
  department_detail: DepartmentDetail;
};
// Main Attendance Logs Table Component
export function AttendanceLogsTable({
  initialData,
  token,
  departments,
}: {
  initialData: Logs[];
  token: string;
  departments: {
    id: string;
    name: string;
    maxClockIn: string;
    maxClockOut: string;
  }[];
}) {
  const router = useRouter();
  const [isLoading, startTransition] = React.useTransition();
  const [data, setData] = React.useState<Logs[]>(initialData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
    },
  });

  const handleFilterChange = async (filters: GetAttendanceLogsRequest) => {
    startTransition(() => {
      try {
        // Update URL with filter params
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.set(key, value.toString());
        });
        router.replace(`?${params.toString()}`);
      } catch (error) {
        console.error("Failed to apply filters:", error);
      }
    });
  };

  const refreshData = async () => {
    startTransition(() => {
      router.refresh();
    });
  };
  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Attendance Logs</CardTitle>
            <CardDescription>
              View and filter employee attendance records
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-8 w-[200px]"
              />
            </div>
            <AttendanceFilters
              onFilterChange={handleFilterChange}
              departments={departments}
            />
            <Button
              variant="outline"
              onClick={refreshData}
              disabled={isLoading}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        Loading attendance logs...
                      </div>
                    ) : (
                      "No attendance records found."
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
