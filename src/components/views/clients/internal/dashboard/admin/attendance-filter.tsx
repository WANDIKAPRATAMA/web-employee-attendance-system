import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { GetAttendanceLogsRequest } from "@/internal/validations/attedance-validation";

export function AttendanceFilters({
  onFilterChange,
  departments,
}: {
  onFilterChange: (filters: GetAttendanceLogsRequest) => void;
  departments: { id: string; name: string }[];
}) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = React.useState<GetAttendanceLogsRequest>({
    date: searchParams.get("date") || undefined,
    department_id: searchParams.get("department_id") || undefined,
    page: searchParams.get("page")
      ? Number(searchParams.get("page"))
      : undefined,
    limit: searchParams.get("limit")
      ? Number(searchParams.get("limit"))
      : undefined,
  });

  const handleFilterChange = (
    key: keyof GetAttendanceLogsRequest,
    value: string | number | undefined
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const clearFilters = () => {
    const emptyFilters: GetAttendanceLogsRequest = {};
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const hasActiveFilters = filters.date || filters.department_id;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="ml-auto">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              Active
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Attendance Filters</h4>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            )}
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={filters.date || ""}
                onChange={(e) => handleFilterChange("date", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={filters.department_id || ""}
                onValueChange={(value) =>
                  handleFilterChange("department_id", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
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

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="page">Page</Label>
                <Select
                  value={`${filters.page || 1}`}
                  onValueChange={(value) =>
                    handleFilterChange(
                      "page",
                      value ? Number(value) : undefined
                    )
                  }
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue placeholder={`${filters.page || 1}`} />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
                      <SelectItem key={page} value={`${page}`}>
                        {page}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="limit">Limit</Label>
                <Select
                  value={filters.limit?.toString() || "10"}
                  onValueChange={(value) =>
                    handleFilterChange("limit", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Items per page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button onClick={applyFilters} className="w-full">
            Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
