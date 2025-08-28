import { NavLink, useLocation } from "react-router-dom";
import { ArrowRightLeft, History, Wallet, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    path: "/",
    label: "Swap",
    icon: ArrowRightLeft,
  },
  {
    path: "/history",
    label: "History",
    icon: History,
  },
  {
    path: "/wallet",
    label: "Wallet",
    icon: Wallet,
  },
  {
    path: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

export const BottomNavigation = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50">
      <div className="max-w-md mx-auto px-4 py-2">
        <nav className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-lg transition-colors",
                  isActive 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};