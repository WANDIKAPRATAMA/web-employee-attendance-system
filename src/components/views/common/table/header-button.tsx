import { HeaderContext } from "@tanstack/react-table";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { SortAsc, SortDesc } from "lucide-react";
import { User } from "./data";

interface HeaderButtonProps<T> {
  info: HeaderContext<User, T>;
  name: string;
}

export function HeaderButton<TValue>({
  info,
  name,
}: HeaderButtonProps<TValue>) {
  const { table, header } = info;
  const sorted = info.column.getIsSorted();

  return (
    <ContextMenu>
      <ContextMenuTrigger
        onPointerDown={(e) => {
          e.preventDefault();
          info.column.toggleSorting(info.column.getIsSorted() === "asc");
        }}
        className="w-full h-full flex flex-row items-center justify-start gap-4 cursor-default pr-5"
      >
        {name}
        {sorted === "asc" && <SortAsc />}
        {sorted === "desc" && <SortDesc />}
      </ContextMenuTrigger>
      <ContextMenuContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
      >
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <ContextMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </ContextMenuCheckboxItem>
          ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default HeaderButton;
