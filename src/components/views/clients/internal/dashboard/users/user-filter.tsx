import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Filter, CalendarIcon, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ListUsersRequest {
  email?: string;
  status?: "active" | "inactive";
  department_id?: string;
  created_at_start?: string;
  created_at_end?: string;
}

interface UsersFilterProps {
  onFilterChange: (filters: ListUsersRequest) => void;
}

function UsersFilter({ onFilterChange }: UsersFilterProps) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<ListUsersRequest>({
    email: searchParams.get("email") || undefined,
    status: (searchParams.get("status") as "active" | "inactive") || undefined,
    department_id: searchParams.get("department_id") || undefined,
    created_at_start: searchParams.get("created_at_start") || undefined,
    created_at_end: searchParams.get("created_at_end") || undefined,
  });

  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: filters.created_at_start
      ? new Date(filters.created_at_start)
      : undefined,
    to: filters.created_at_end ? new Date(filters.created_at_end) : undefined,
  });

  const [emailInput, setEmailInput] = useState(filters.email || "");

  // Debounce function
  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedEmail = useDebounce(emailInput, 500);

  // Apply filters when debounced values change
  useEffect(() => {
    handleFilterChange("email", debouncedEmail || undefined);
  }, [debouncedEmail]);

  const handleFilterChange = useCallback(
    (key: keyof ListUsersRequest, value: string | undefined) => {
      const newFilters = { ...filters, [key]: value };
      setFilters(newFilters);
      onFilterChange(newFilters);
    },
    [filters, onFilterChange]
  );

  const handleDateRangeChange = (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => {
    if (range.from && range.to) {
      setDateRange(range);

      const newFilters = {
        ...filters,
        created_at_start: format(range.from, "yyyy-MM-dd"),
        created_at_end: format(range.to, "yyyy-MM-dd"),
      };

      setFilters(newFilters);
      onFilterChange(newFilters);
    }
  };

  const clearFilter = (key: keyof ListUsersRequest) => {
    const newFilters = { ...filters, [key]: undefined };
    setFilters(newFilters);
    onFilterChange(newFilters);

    // Reset date range if clearing date filters
    if (key === "created_at_start" || key === "created_at_end") {
      setDateRange({ from: undefined, to: undefined });
    }

    // Clear email input if clearing email filter
    if (key === "email") {
      setEmailInput("");
    }
  };

  const clearAllFilters = () => {
    const emptyFilters: ListUsersRequest = {};
    setFilters(emptyFilters);
    setDateRange({ from: undefined, to: undefined });
    setEmailInput("");
    onFilterChange(emptyFilters);
  };

  const activeFilterCount = Object.values(filters).filter(
    (value) => value !== undefined && value !== ""
  ).length;

  return (
    <div className="space-y-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex gap-2">
            <Filter className="h-4 w-4" />
            User Filters
            {activeFilterCount > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 rounded-full px-2 font-normal"
              >
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-0" align="start">
          <Card className="border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  Filter Users
                </CardTitle>
                {activeFilterCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="h-8 px-2 text-xs"
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pb-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        placeholder="Search by email..."
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    {filters.email && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => clearFilter("email")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Account Status</Label>
                  <Select
                    value={filters.status || ""}
                    onValueChange={(value) =>
                      handleFilterChange(
                        "status",
                        value as "active" | "inactive"
                      )
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Creation Date Range</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateRange.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} -{" "}
                              {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Select date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={(range) =>
                          handleDateRangeChange({
                            from: range?.from,
                            to: range?.to,
                          })
                        }
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>

      {/* Active filters display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.email && (
            <Badge variant="secondary" className="px-2 py-1 text-xs">
              Email: {filters.email}
              <button
                onClick={() => clearFilter("email")}
                className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {filters.status && (
            <Badge variant="secondary" className="px-2 py-1 text-xs">
              Status: {filters.status}
              <button
                onClick={() => clearFilter("status")}
                className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {(filters.created_at_start || filters.created_at_end) && (
            <Badge variant="secondary" className="px-2 py-1 text-xs">
              Date:{" "}
              {filters.created_at_start &&
                format(new Date(filters.created_at_start), "MM/dd/yyyy")}
              {filters.created_at_end &&
                ` - ${format(new Date(filters.created_at_end), "MM/dd/yyyy")}`}
              <button
                onClick={() => {
                  clearFilter("created_at_start");
                  clearFilter("created_at_end");
                }}
                className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

export default UsersFilter;
