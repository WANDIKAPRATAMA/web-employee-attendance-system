import { Separator } from "@radix-ui/react-dropdown-menu";
import { Activity } from "lucide-react";
import ContainerIcons from "../ui/container-icons";
import { Typography } from "../ui/typography";

type HeaderLayout = {
  title: string;
  description: string;
  icon: React.ReactNode;
  smallTag?: string;
  iconVariant?:
    | "blue"
    | "gray"
    | "black"
    | "green"
    | "indigo"
    | "yellow"
    | "red"
    | "orange"
    | "purple";
};
export function HeaderComp(payload: HeaderLayout) {
  return (
    <div className="flex items-start gap-4">
      <ContainerIcons
        variant={payload.iconVariant ?? "gray"}
        className="size-10"
      >
        {payload.icon}
      </ContainerIcons>
      <div>
        <Typography.Title className="text-lg md:text-xl" unsize>
          {payload.title}
        </Typography.Title>
        <Typography.Description
          className="text-sm text-gray-500 dark:text-gray-400"
          unsize
        >
          {payload.description}
        </Typography.Description>
        {payload.smallTag && (
          <Typography.Small unsize>{payload.smallTag}</Typography.Small>
        )}
        <Separator className="mt-2 " />
      </div>
    </div>
  );
}
