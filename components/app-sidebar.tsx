import { ChartNoAxesCombinedIcon, ChartSplineIcon, UsersIcon, ChartPieIcon, HashIcon, ArrowRightLeftIcon, Clock9Icon, ClipboardListIcon, CrownIcon, SquareActivityIcon, CalendarClockIcon, Undo2Icon, SettingsIcon, ZapIcon } from "lucide-react"
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge, SidebarGroupLabel, Sidebar } from "./ui/sidebar"
import Link from "next/link"

const AppSidebar = () => {
    return (
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href={'/'}>
                        <ZapIcon/>
                        <span>Versus</span>
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuBadge className='bg-primary/10 rounded-full'>5</SidebarMenuBadge>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Pages</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <ChartSplineIcon />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar