import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavDocuments } from "./nav-document";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "../../../../../../auth";
import { Shield } from "lucide-react";
import { SIDEBAR_DATA } from "@/constants/seed";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const session = await auth();
  const isAdmin = session?.user.role === "admin";
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="SIDEBAR_DATA-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="#">
                <Shield className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="flex-1 pr-4">
          <NavMain items={SIDEBAR_DATA.navMain} />
          {isAdmin && <NavDocuments items={SIDEBAR_DATA.documentsAdmin} />}
          <NavSecondary items={SIDEBAR_DATA.navSecondary} className="mt-auto" />
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            avatar: session?.user.image ?? "",
            name: session?.user.user.full_name ?? "",
            email: session?.user.email ?? "",
            refreshToken: session?.user.refreshToken ?? "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
