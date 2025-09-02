import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { BottomNavigation } from "@/components/BottomNavigation";
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Shield, 
  Zap, 
  Globe, 
  Bell,
  HelpCircle,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [autoSlippage, setAutoSlippage] = useState(true);
  
  const isDarkMode = theme === 'dark';

  const settingsSections = [
    {
      title: "Appearance",
      items: [
        {
          icon: isDarkMode ? Moon : Sun,
          label: "Dark Mode",
          description: "Toggle dark/light theme",
          action: <Switch 
            checked={isDarkMode} 
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
          />
        }
      ]
    },
    {
      title: "Trading",
      items: [
        {
          icon: Zap,
          label: "Auto Slippage",
          description: "Automatically set optimal slippage",
          action: <Switch checked={autoSlippage} onCheckedChange={setAutoSlippage} />
        },
        {
          icon: Shield,
          label: "MEV Protection",
          description: "Protect against MEV attacks",
          action: <Badge className="bg-success/10 text-success border-success/20">Enabled</Badge>
        }
      ]
    },
    {
      title: "Notifications",
      items: [
        {
          icon: Bell,
          label: "Push Notifications",
          description: "Get notified about transactions",
          action: <Switch checked={notifications} onCheckedChange={setNotifications} />
        }
      ]
    },
    {
      title: "Network",
      items: [
        {
          icon: Globe,
          label: "Default Chain",
          description: "Ethereum",
          action: <Button variant="outline" size="sm">Change</Button>
        }
      ]
    },
    {
      title: "Support",
      items: [
        {
          icon: HelpCircle,
          label: "Help Center",
          description: "Get help and support",
          action: <ExternalLink className="h-4 w-4 text-muted-foreground" />
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Customize your DEX experience
          </p>
        </div>

        <div className="space-y-6">
          {settingsSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
              <Card className="bg-gradient-card border-border/50">
                {section.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`p-4 flex items-center justify-between ${
                        index !== section.items.length - 1 ? 'border-b border-border/50' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                      {item.action}
                    </div>
                  );
                })}
              </Card>
            </div>
          ))}

          {/* App Info */}
          <Card className="p-6 bg-gradient-card border-border/50 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
              <SettingsIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold mb-2">DEX Aggregator</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Version 1.0.0 - Multi-chain DEX Aggregator
            </p>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                Privacy Policy
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Terms of Service
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}