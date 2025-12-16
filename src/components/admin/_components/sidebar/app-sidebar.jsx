"use client";

import * as React from "react";
import { NavMain } from "@/components/admin/_components/sidebar/nav-main";
import { NavProjects } from "@/components/admin/_components/sidebar/nav-projects";
import { NavUser } from "@/components/admin/_components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/admin/_components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ADMIN_CONFIG_DATA } from "@/utils/constants";



export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={ADMIN_CONFIG_DATA.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={ADMIN_CONFIG_DATA.navMain} />
        {/* <NavProjects projects={ADMIN_CONFIG_DATA.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={ADMIN_CONFIG_DATA.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
