import { useState } from "react";
import { ArrowRightLeft, History, Wallet, Settings, BarChart3, TrendingUp, Shield, User, Zap } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

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
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
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
          <SidebarMenuButton
            asChild
            className={cn(
              "data-[state=open]:bg-gradient-to-r data-[state=open]:from-blue-500/10 data-[state=open]:to-purple-500/10",
              "data-[state=open]:text-blue-600 dark:data-[state=open]:text-blue-400",
              "hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-purple-500/5",
              "transition-all duration-200"
            )}
          >
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
            <SidebarMenuButton
              asChild
              className={cn(
                location.pathname === item.url 
                  ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 font-medium" 
                  : "hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-purple-500/5",
                "transition-all duration-200"
              )}
            >
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
          <div className="rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 dark:from-emerald-950/50 dark:to-emerald-900/30 dark:border-emerald-800 p-3">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium">Market Status</span>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Volume 24h:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">$2.4B</span>
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