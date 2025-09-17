"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, startTransition, Fragment } from "react";

export interface IPagination {
  current_page: number;
  total_pages: number;
  per_page: number;
  total_items: number;
}

export const PaginationAction = ({
  pagination,
}: {
  pagination: IPagination;
}) => {
  const totalPages = pagination.total_pages;
  const maxVisiblePages = 5;

  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Hitung rentang halaman
  const [startPage, endPage] = useMemo(() => {
    let start = Math.max(
      1,
      pagination.current_page - Math.floor(maxVisiblePages / 2)
    );
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return [start, end];
  }, [pagination.current_page, totalPages]);

  // Update query param
  const updateSearchParams = useCallback(
    (newParams: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      startTransition(() => {
        replace(`${pathname}?${params.toString()}`);
      });
    },
    [searchParams, pathname, replace]
  );

  // Ganti halaman
  const onPageChange = useCallback(
    (page: number) => {
      updateSearchParams({ page: page.toString() });
    },
    [updateSearchParams]
  );

  // Ganti rows per page
  const onPerPageChange = useCallback(
    (perPage: number) => {
      updateSearchParams({ page: "1", per_page: perPage.toString() });
    },
    [updateSearchParams]
  );

  return (
    <Fragment>
      {/* Controls */}
      <div className="flex items-center space-x-4  w-full">
        {/* Rows per page */}
        <div className="flex flex-row items-center  w-full">
          <div className="flex flex-row items-center">
            <p className="text-sm font-medium">Rows per page</p>
          </div>
          <div>
            <Select
              value={`${pagination.per_page}`}
              onValueChange={(value) => onPerPageChange(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={`${pagination.per_page}`} />
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
        </div>

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (pagination.current_page > 1)
                    onPageChange(pagination.current_page - 1);
                }}
                isActive={pagination.current_page > 1}
              />
            </PaginationItem>

            {startPage > 1 && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(1);
                  }}
                >
                  1
                </PaginationLink>
              </PaginationItem>
            )}

            {startPage > 2 && (
              <PaginationItem>
                <span className="px-4">...</span>
              </PaginationItem>
            )}

            {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
              <PaginationItem key={startPage + i}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(startPage + i);
                  }}
                  isActive={pagination.current_page === startPage + i}
                >
                  {startPage + i}
                </PaginationLink>
              </PaginationItem>
            ))}

            {endPage < totalPages - 1 && (
              <PaginationItem>
                <span className="px-4">...</span>
              </PaginationItem>
            )}

            {endPage < totalPages && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(totalPages);
                  }}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (pagination.current_page < totalPages)
                    onPageChange(pagination.current_page + 1);
                }}
                isActive={pagination.current_page < totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Fragment>
  );
};
