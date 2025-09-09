import { useState } from "react";
import { ArrowRightLeft, History, Wallet, Settings, BarChart3, TrendingUp, Shield, User, Zap } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const mainNavItems = [
  { title: "Trade", url: "/", icon: ArrowRightLeft },
  { title: "Portfolio", url: "/wallet", icon: Wallet },
  { title: "History", url: "/history", icon: History },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

const accountItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  
  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-muted text-foreground font-medium" 
      : "text-muted-foreground hover:text-foreground hover:bg-muted/50";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"}>
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold">SwapHub</h2>
              <p className="text-xs text-muted-foreground">DEX Aggregator</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel>Trading</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={getNavClasses}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                      {!isCollapsed && item.title === "Trade" && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          Live
                        </Badge>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClasses}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {!isCollapsed && (
          <div className="rounded-lg bg-muted p-3">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Market Status</span>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Volume 24h:</span>
                <span className="text-success">$2.4B</span>
              </div>
              <div className="flex justify-between">
                <span>Active Pairs:</span>
                <span>1,247</span>
              </div>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}