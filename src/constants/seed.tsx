import { Building, Camera, LayoutDashboard, User2 } from "lucide-react";

export const SIDEBAR_DATA = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/attendance",
      icon: <LayoutDashboard />,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: <Camera />,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [],
  documentsAdmin: [
    {
      name: "Departments",
      url: "/dashboard/departments",
      icon: <Building />,
    },
    {
      name: "Users",
      url: "/dashboard/users",
      icon: <User2 />,
    },
  ],
};
