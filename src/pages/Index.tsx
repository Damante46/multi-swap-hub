import { SwapInterface } from "@/components/SwapInterface";
import { WalletConnection } from "@/components/WalletConnection";
import { RecentSwaps } from "@/components/RecentSwaps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Activity } from "lucide-react";

const Index = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Trading Dashboard Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">24h Volume</p>
                <p className="text-2xl font-bold">$2.4B</p>
                <p className="text-xs text-success flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Pairs</p>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-xs text-info flex items-center">
                  <Activity className="h-3 w-3 mr-1" />
                  Live
                </p>
              </div>
              <Activity className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Best Rate</p>
                <p className="text-2xl font-bold">0.12%</p>
                <p className="text-xs text-success flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  Low Impact
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Gas Price</p>
                <p className="text-2xl font-bold">32 Gwei</p>
                <p className="text-xs text-warning">Standard</p>
              </div>
              <Badge variant="secondary" className="text-warning">Fast</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Trading Interface */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-gradient-card shadow-elegant border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Swap Tokens
                </span>
                <Badge variant="outline" className="border-success text-success">
                  Live Rates
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <WalletConnection />
              <SwapInterface />
            </CardContent>
          </Card>
        </div>

        {/* Trading Activity & Analytics */}
        <div className="lg:col-span-2 space-y-6">
          <RecentSwaps />
          
          {/* Market Overview */}
          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Market Overview</span>
                <Badge variant="secondary">Real-time</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Tokens */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Top Trading Pairs</h4>
                  <div className="space-y-2">
                    {[
                      { pair: "ETH/USDC", volume: "$245M", change: "+2.45%" },
                      { pair: "SOL/USDT", volume: "$128M", change: "+5.12%" },
                      { pair: "BTC/USDC", volume: "$892M", change: "-0.87%" },
                      { pair: "MATIC/ETH", volume: "$67M", change: "+3.21%" },
                    ].map((item) => (
                      <div key={item.pair} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                        <div>
                          <span className="font-medium text-sm">{item.pair}</span>
                          <p className="text-xs text-muted-foreground">{item.volume}</p>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={item.change.startsWith('+') ? "text-success" : "text-danger"}
                        >
                          {item.change}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DEX Statistics */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">DEX Performance</h4>
                  <div className="space-y-2">
                    {[
                      { dex: "Uniswap V3", share: "42%", status: "Optimal" },
                      { dex: "SushiSwap", share: "18%", status: "Good" },
                      { dex: "PancakeSwap", share: "15%", status: "Good" },
                      { dex: "1inch", share: "25%", status: "Best Rate" },
                    ].map((item) => (
                      <div key={item.dex} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                        <div>
                          <span className="font-medium text-sm">{item.dex}</span>
                          <p className="text-xs text-muted-foreground">{item.share} market share</p>
                        </div>
                        <Badge 
                          variant={item.status === "Best Rate" ? "default" : "secondary"}
                          className={item.status === "Best Rate" ? "bg-success text-white" : ""}
                        >
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;