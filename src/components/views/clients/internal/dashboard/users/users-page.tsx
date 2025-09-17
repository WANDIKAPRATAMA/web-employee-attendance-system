"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  Edit,
  Trash2,
  Search,
  MoreHorizontal,
  User,
  Mail,
  Building,
  Calendar,
  Filter,
  X,
  CheckCircle,
  XCircle,
  Loader2,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import { format, parseISO, setDate } from "date-fns";
import { id } from "date-fns/locale";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { listUsersAction } from "@/internal/actions/user-action";
import { DepartmentResponse } from "@/internal/validations/department-validation";
import {
  UserResponse,
  ListUsersRequest,
  ListUsersResponse,
} from "@/internal/validations/user-validation";
import {
  assignDepartmentAction,
  getDepartmentsAction,
} from "@/internal/actions/department-action";
import { changeRoleAction } from "@/internal/actions/auth-action";
import { updateWhere } from "@/lib/array";
import UsersFilter from "./user-filter";

// User Table Columns
// const columns: ColumnDef<UserResponse>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={table.getIsAllPageRowsSelected()}
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "full_name",
//     header: "User",
//     cell: ({ row }) => (
//       <div className="flex items-center">
//         <User className="h-4 w-4 mr-2 text-muted-foreground" />
//         <div>
//           <div className="font-medium">{row.getValue("full_name")}</div>
//           <div className="text-sm text-muted-foreground">
//             {row.original.employee_code}
//           </div>
//         </div>
//       </div>
//     ),
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//     cell: ({ row }) => (
//       <div className="flex items-center">
//         <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
//         <span>{row.getValue("email")}</span>
//       </div>
//     ),
//   },
//   {
//     accessorKey: "department",
//     header: "Department",
//     cell: ({ row }) => {
//       const department = row.original.department;
//       return (
//         <div className="flex items-center">
//           <Building className="h-4 w-4 mr-2 text-muted-foreground" />
//           {department ? (
//             <Badge variant="outline">{department.name}</Badge>
//           ) : (
//             <Badge variant="outline" className="text-muted-foreground">
//               Unassigned
//             </Badge>
//           )}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "department_id",
//     header: "Status",
//     cell: ({ row }) => {
//       //   const isActive = row.original. === "active";
//       const isActive = row.original.department_id ? true : false;
//       return (
//         <Badge
//           variant={isActive ? "default" : "secondary"}
//           className={
//             isActive
//               ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
//               : ""
//           }
//         >
//           {isActive ? (
//             <CheckCircle className="h-3 w-3 mr-1" />
//           ) : (
//             <XCircle className="h-3 w-3 mr-1" />
//           )}
//           {isActive ? "Assigned" : "Unassigned"}
//         </Badge>
//       );
//     },
//   },
//   {
//     accessorKey: "created_at",
//     header: "Joined",
//     cell: ({ row }) => {
//       const date = format(parseISO(row.getValue("created_at")), "dd MMM yyyy");
//       return (
//         <div className="flex items-center">
//           <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
//           <span className="text-sm">{date}</span>
//         </div>
//       );
//     },
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const user = row.original;
//       const router = useRouter();
//       const searchParams = useSearchParams();

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <AssignDepartmentDialog user={user} onSuccess={() => null} />

//             <ChangeRoleDialog user={user} onSuccess={() => router.refresh()} />

//             <DropdownMenuSeparator />
//             <DropdownMenuItem
//             //   onClick={() => {
//             //     const params = new URLSearchParams(searchParams);
//             //     params.set("email", user.email);
//             //     router.replace(`?${params.toString()}`);
//             //   }}
//             >
//               <Filter className="h-4 w-4 mr-2" />
//               Filter by Email
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];
interface ColumnProps {
  onActionTapped: (id: string, type: "assign" | "change-role") => void;
  accessToken: string;
}
export const getColumns = ({
  accessToken,
  onActionTapped,
}: ColumnProps): ColumnDef<UserResponse>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "full_name",
    header: "User",
    cell: ({ row }) => (
      <div className="flex items-center">
        <User className="h-4 w-4 mr-2 text-muted-foreground" />
        <div>
          <div className="font-medium">{row.getValue("full_name")}</div>
          <div className="text-sm text-muted-foreground">
            {row.original.employee_code}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="flex items-center">
        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
        <span>{row.getValue("email")}</span>
      </div>
    ),
  },
  {
    accessorKey: "application_role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original?.application_role?.role;
      return (
        <div className="flex items-center">
          <Badge variant={role === "admin" ? "default" : "secondary"}>
            {role === "admin" ? "Admin" : "Employee"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      const department = row.original.department;
      return (
        <div className="flex items-center">
          <Building className="h-4 w-4 mr-2 text-muted-foreground" />
          {department ? (
            <Badge variant="outline">{department.name}</Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground">
              Unassigned
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "department_id",
    header: "Status",
    cell: ({ row }) => {
      //   const isActive = row.original. === "active";
      const isActive = row.original.department_id ? true : false;
      return (
        <Badge
          variant={isActive ? "default" : "secondary"}
          className={
            isActive
              ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
              : ""
          }
        >
          {isActive ? (
            <CheckCircle className="h-3 w-3 mr-1" />
          ) : (
            <XCircle className="h-3 w-3 mr-1" />
          )}
          {isActive ? "Assigned" : "Unassigned"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Joined",
    cell: ({ row }) => {
      const date = format(parseISO(row.getValue("created_at")), "dd MMM yyyy");
      return (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-sm">{date}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {user?.application_role?.role !== "admin" && (
              <AssignDepartmentDialog
                user={user}
                onRowAssigned={onActionTapped}
                accessToken={accessToken}
              />
            )}
            <DropdownMenuSeparator />

            <ChangeRoleDialog
              onRowAssigned={onActionTapped}
              user={user}
              accessToken={accessToken}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
// Assign Department Dialog
function AssignDepartmentDialog({
  user,
  accessToken,
  onRowAssigned,
}: {
  user: UserResponse;
  accessToken: string;
  onRowAssigned?: (id: string, type: "assign" | "change-role") => void;
}) {
  const [isLoading, startTransition] = React.useTransition();
  const [open, setOpen] = React.useState(false);
  const [departments, setDepartments] = React.useState<DepartmentResponse[]>(
    []
  );
  const [selectedDepartment, setSelectedDepartment] = React.useState("");

  React.useEffect(() => {
    // Fetch departments for selection
    const fetchDepartments = () => {
      startTransition(async () => {
        try {
          const response = await getDepartmentsAction(
            {
              limit: 100,
              page: 1,
            },
            accessToken
          );
          if (response.status === "success" || response.payload.data) {
            setDepartments(response.payload.data as DepartmentResponse[]);
          }
        } catch (error) {
          toast.error("Failed to fetch departments");
        }
      });
    };
    fetchDepartments();
  }, [accessToken]);

  const handleAssign = React.useCallback(async () => {
    React.startTransition(async () => {
      if (!selectedDepartment) {
        toast.error("Please select a department");
        return;
      }

      try {
        const r = await assignDepartmentAction(
          {
            user_id: user.source_user_id,
            department_id: selectedDepartment,
          },
          accessToken
        );
        startTransition(() => {
          if (r.status === "success") {
            toast.success("Department assigned successfully");
            onRowAssigned && onRowAssigned(user.id, "assign");
            setOpen(false);
          } else {
            toast("Whoops", {
              description: r.message,
            });
          }
        });
      } catch (error) {
        toast.error("Failed to assign department");
      }
    });
  }, [selectedDepartment]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Building className="h-4 w-4 mr-2" />
          Assign Department
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Assign Department</DialogTitle>
          <DialogDescription>
            Assign {user.full_name} to a department
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="department">Select Department</Label>
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={isLoading}>
            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Assign Department
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Change Role Dialog
function ChangeRoleDialog({
  user,
  onRowAssigned,
  accessToken,
}: {
  user: UserResponse;
  onRowAssigned?: (id: string, type: "assign" | "change-role") => void;

  accessToken: string;
}) {
  const [isLoading, startTransition] = React.useTransition();
  const [open, setOpen] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState(
    user?.application_role?.role || "employee"
  );

  const handleChangeRole = React.useCallback(async () => {
    startTransition(async () => {
      try {
        const r = await changeRoleAction(
          {
            role: selectedRole as "employee" | "admin",
            user_id: user.source_user_id,
          },
          accessToken
        );
        startTransition(() => {
          if (r.status === "success") {
            toast.success("Role changed successfully");
            setOpen(false);
            onRowAssigned && onRowAssigned(user.id, "change-role");
          } else {
            toast.error("Failed to change role" + " " + r.message);
          }
        });
      } catch (error) {
        toast.error("Failed to change role");
      }
    });
  }, [selectedRole, accessToken]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Edit className="h-4 w-4 mr-2" />
          Change Role
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Change User Role</DialogTitle>
          <DialogDescription>
            Change role for {user.full_name}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Select Role</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Choose role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employee">Employee</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleChangeRole} disabled={isLoading}>
            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Change Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Main Users Table Component
export function UsersTable({
  initialData,
  token,
}: {
  initialData: UserResponse[];
  token: string;
}) {
  const router = useRouter();
  const [data, setData] = React.useState<UserResponse[]>(initialData);
  const [isLoading, setIsLoading] = React.useState(false);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const handleOnRowTapped = React.useCallback(
    (id: string, type: "assign" | "change-role") => {
      setData((prev) =>
        updateWhere<UserResponse>(
          prev,
          (u) => u.id === id,
          (u) =>
            type === "assign"
              ? { ...u, department_id: "mock-department-id" }
              : {
                  ...u,
                  application_role: {
                    ...u.application_role,
                    role:
                      u.application_role?.role === "admin"
                        ? "employee"
                        : "admin",
                  },
                }
        )
      );
    },
    []
  );

  const columns = React.useMemo(
    () =>
      getColumns({
        accessToken: token,
        onActionTapped: handleOnRowTapped,
      }),
    [token]
  );
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  const handleFilterChange = async (filters: ListUsersRequest) => {
    setIsLoading(true);
    try {
      // Update URL with filter params
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value.toString());
      });
      router.replace(`?${params.toString()}`);

      // Fetch filtered data
      const response = await listUsersAction(filters, token);
      if (response.status === "success" && response.payload.data) {
        const l = response.payload.data as ListUsersResponse;
        // setData((response.payload.data as UserResponse[]) || []);
        setData(l || []);
      }
    } catch (error) {
      toast.error("Failed to apply filters");
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const response = await listUsersAction({}, token);
      if (response.status === "success") {
        setData(response.payload.data || []);
      }
    } catch (error) {
      toast.error("Failed to refresh data");
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);
  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage users, assign departments, and change roles
              </CardDescription>
            </div>
            <Button onClick={refreshData} disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <UsersFilter onFilterChange={handleFilterChange} />

          <div className="flex items-center justify-between gap-4 my-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-8"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  View
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

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
                      {isLoading ? "Loading users..." : "No users found."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
