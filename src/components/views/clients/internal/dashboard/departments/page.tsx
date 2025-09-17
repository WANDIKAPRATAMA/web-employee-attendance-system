"use client";

import * as React from "react";
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
  Plus,
  Edit,
  Trash2,
  Search,
  MoreHorizontal,
  Building,
  Clock,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Types and Actions

import {
  createDepartmentAction,
  deleteDepartmentAction,
  updateDepartmentAction,
} from "@/internal/actions/department-action";
import {
  CreateDepartmentRequestSchema,
  DepartmentResponse,
  UpdateDepartmentRequest,
  UpdateDepartmentRequestSchema,
} from "@/internal/validations/department-validation";
import { insertAt, removeWhere, updateWhere } from "@/lib/array";

interface ColumnProps {
  onRowUpdated: (id: string, payload: UpdateDepartmentRequest) => void;
  accessToken: string;
  onRowDeleted: (id: string) => void;
}
export const getColumns = ({
  accessToken,
  onRowUpdated,
  onRowDeleted,
}: ColumnProps): ColumnDef<DepartmentResponse>[] => [
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
    accessorKey: "name",
    header: "Department Name",
    cell: ({ row }) => (
      <div className="flex items-center">
        <Building className="h-4 w-4 mr-2 text-muted-foreground" />
        <span className="font-medium">{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "max_clock_in_time",
    header: "Max Clock In",
    cell: ({ row }) => {
      const time = format(parseISO(row.getValue("max_clock_in_time")), "HH:mm");
      return (
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          <Badge variant="outline" className="font-mono">
            {time}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "max_clock_out_time",
    header: "Max Clock Out",
    cell: ({ row }) => {
      const time = format(
        parseISO(row.getValue("max_clock_out_time")),
        "HH:mm"
      );
      return (
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          <Badge variant="outline" className="font-mono">
            {time}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = format(parseISO(row.getValue("created_at")), "dd MMM yyyy");
      return <span className="text-sm text-muted-foreground">{date}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const department = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(department.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Department
                </DropdownMenuItem>
              </DialogTrigger>
              <EditDepartmentDialog
                department={department}
                accessToken={accessToken}
                onRowUpdated={onRowUpdated}
              />
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Department
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <DeleteDepartmentDialog
                accessToken={accessToken}
                department={department}
                onRowDeleted={onRowDeleted}
              />
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Create Department Dialog
function CreateDepartmentDialog({
  onSuccess,
  accesToken,
}: {
  accesToken: string;
  onSuccess: (payload: DepartmentResponse) => void;
}) {
  const [isPending, startTransition] = React.useTransition();
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setErrors({});

      const formData = new FormData(event.currentTarget);
      const data = {
        name: formData.get("name") as string,
        max_clock_in_time:
          (formData.get("max_clock_in_time") as string) + ":00",
        max_clock_out_time:
          (formData.get("max_clock_out_time") as string) + ":00",
      };

      startTransition(async () => {
        try {
          const parsed = CreateDepartmentRequestSchema.safeParse(data);
          if (!parsed) {
            toast.error("Please check the form for errors");
          }

          const r = await createDepartmentAction(data, accesToken);

          startTransition(() => {
            if (r.status === "success" && r.payload.data) {
              toast.success("Department created successfully");
              setOpen(false);

              onSuccess(r.payload.data);
            } else {
              toast.error(r.message);
            }
          });
        } catch (error: any) {
          toast("Error", {
            description: error?.message ?? "An unexpected error occurred",
          });
        }
      });
    },
    [accesToken]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Department
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Department</DialogTitle>
          <DialogDescription>
            Add a new department with its working hours policy.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Department Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., Quality Control"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="max_clock_in_time">Max Clock In Time</Label>
              <Input
                id="max_clock_in_time"
                name="max_clock_in_time"
                type="time"
                className={errors.max_clock_in_time ? "border-red-500" : ""}
              />
              {errors.max_clock_in_time && (
                <p className="text-sm text-red-500">
                  {errors.max_clock_in_time}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="max_clock_out_time">Max Clock Out Time</Label>
              <Input
                id="max_clock_out_time"
                name="max_clock_out_time"
                type="time"
                className={errors.max_clock_out_time ? "border-red-500" : ""}
              />
              {errors.max_clock_out_time && (
                <p className="text-sm text-red-500">
                  {errors.max_clock_out_time}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Department"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Edit Department Dialog
function EditDepartmentDialog({
  department,
  accessToken,
  onRowUpdated,
}: {
  department: DepartmentResponse;
  accessToken: string;
  onRowUpdated: (id: string, payload: UpdateDepartmentRequest) => void;
}) {
  const [isPending, startTransition] = React.useTransition();
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get("name") as string,
      max_clock_in_time: (formData.get("max_clock_in_time") as string) + ":00",
      max_clock_out_time:
        (formData.get("max_clock_out_time") as string) + ":00",
    };

    startTransition(async () => {
      try {
        const parsed = UpdateDepartmentRequestSchema.safeParse(data);
        if (!parsed) {
          toast.error("Please check the form for errors");
        }
        const r = await updateDepartmentAction(
          department.id,
          data,
          accessToken
        );

        startTransition(() => {
          if (r.status === "success") {
            toast.success("Department updated successfully");
            onRowUpdated(department.id, data);
          } else {
            toast.error(r.message);
          }
        });
      } catch (error) {
        //   if (error instanceof z.ZodError) {
        //     const fieldErrors: Record<string, string> = {};
        //     error.errors.forEach((err) => {
        //       if (err.path) {
        //         fieldErrors[err.path[0]] = err.message;
        //       }
        //     });
        //     setErrors(fieldErrors);
        //     toast.error("Please check the form for errors");
        //   }
        toast("Error", {
          description: "An unexpected error occurred",
        });
      }
    });
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Edit Department</DialogTitle>
        <DialogDescription>
          Update department information and working hours policy.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="edit-name">Department Name</Label>
          <Input
            id="edit-name"
            name="name"
            defaultValue={department.name}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="edit-max_clock_in_time">Max Clock In Time</Label>
            <Input
              id="edit-max_clock_in_time"
              name="max_clock_in_time"
              type="time"
              defaultValue={format(
                parseISO(department.max_clock_in_time),
                "HH:mm"
              )}
              className={errors.max_clock_in_time ? "border-red-500" : ""}
            />
            {errors.max_clock_in_time && (
              <p className="text-sm text-red-500">{errors.max_clock_in_time}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-max_clock_out_time">Max Clock Out Time</Label>
            <Input
              id="edit-max_clock_out_time"
              name="max_clock_out_time"
              type="time"
              defaultValue={format(
                parseISO(department.max_clock_out_time),
                "HH:mm"
              )}
              className={errors.max_clock_out_time ? "border-red-500" : ""}
            />
            {errors.max_clock_out_time && (
              <p className="text-sm text-red-500">
                {errors.max_clock_out_time}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Updating..." : "Update Department"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

// Delete Department Dialog
function DeleteDepartmentDialog({
  department,
  onRowDeleted,
  accessToken,
}: {
  department: DepartmentResponse;
  onRowDeleted: (id: string) => void;
  accessToken: string;
}) {
  const [isPending, startTransition] = React.useTransition();
  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const r = await deleteDepartmentAction(department.id, accessToken);
        startTransition(() => {
          if (r.status === "success") {
            onRowDeleted(department.id);
            toast.success("Department deleted successfully");
          } else {
            toast.error(r.message);
          }
        });
      } catch (error) {
        toast.error("Failed to delete department");
      }
    });
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the{" "}
          <strong>{department.name}</strong> department and remove all
          associated data.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={handleDelete}
          disabled={isPending}
          className="bg-red-600 hover:bg-red-700"
        >
          {isPending ? "Deleting..." : "Delete Department"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

// Main Department Table Component
export function DepartmentTable({
  data: initialData,
  token,
  limit,
}: {
  data: DepartmentResponse[];
  token: string;
  limit: number;
}) {
  const [data, setData] = React.useState<DepartmentResponse[]>(initialData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const handleRowUpdated = React.useCallback(
    (id: string, updatedRow: UpdateDepartmentRequest) => {
      setData((prev) => {
        return updateWhere<DepartmentResponse>(
          prev,
          (row) => row.id === id,
          (row) => ({
            ...row,
            ...updatedRow,
          })
        );
      });
    },
    []
  );
  const handleRowDeleted = React.useCallback((id: string) => {
    setData((prev) => {
      return removeWhere(prev, (row) => row.id === id);
    });
  }, []);

  const columns = React.useMemo(
    () =>
      getColumns({
        accessToken: token,
        onRowUpdated: handleRowUpdated,
        onRowDeleted: handleRowDeleted,
      }),
    [handleRowUpdated, token, handleRowDeleted]
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

  const refreshData = React.useCallback((payload: DepartmentResponse) => {
    setData((prev) => {
      return insertAt<DepartmentResponse>(prev, 0, payload);
    });
  }, []);
  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);
  return (
    <div className="w-full space-y-4 h-full">
      <Card className="shadow-none h-full  ">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Department Management</CardTitle>
              <CardDescription>
                Manage departments and their working hour policies
              </CardDescription>
            </div>
            <CreateDepartmentDialog
              onSuccess={refreshData}
              accesToken={token}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search departments..."
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
                      No departments found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 border-t">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
