import { DataTable } from "@/components/views/common/table";
import { auth } from "../../../../auth";
import { createUser } from "@/components/views/common/table/data";
import { User } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-start p-10 gap-4">
      <DataTable />
    </div>
  );
}
