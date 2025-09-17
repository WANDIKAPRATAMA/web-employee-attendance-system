import { Typography } from "@/components/ui/typography";
import { PaginationAction } from "./pagination-action";

export default function PaginationControl({
  paginations,
  limit,
}: {
  paginations: IPagination;
  limit: number;
}) {
  return (
    <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 border-t">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <Typography.Small className="w-full">
          Showing {(paginations.current_page - 1) * limit + 1}–
          {Math.min(paginations.current_page * limit, paginations.total_items)}{" "}
          of {paginations.total_items} contacts
        </Typography.Small>
        <PaginationAction pagination={{ ...paginations, per_page: limit }} />
      </div>
    </div>
  );
}
