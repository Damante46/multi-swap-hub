import { SwapInterface } from "@/components/SwapInterface";
import { WalletConnection } from "@/components/WalletConnection";
import { RecentSwaps } from "@/components/RecentSwaps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, BarChart3, Activity } from "lucide-react";

const Index = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          Multi-Chain DEX Hub
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Trade, swap, and manage your crypto across multiple blockchains with advanced tools and real-time market data.
        </p>
      </div>

      {/* Market Stats with Gradients */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 dark:from-emerald-950/50 dark:to-emerald-900/30 dark:border-emerald-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">24h Volume</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">$2.4B</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">+12.5%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-950/50 dark:to-blue-900/30 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Pairs</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,247</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">Live</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-950/50 dark:to-purple-900/30 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Best Rate</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">0.12%</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">Low Impact</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 dark:from-amber-950/50 dark:to-amber-900/30 dark:border-amber-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Gas Price</p>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">32 Gwei</p>
                <p className="text-xs text-amber-600 dark:text-amber-400">Standard</p>
              </div>
              <Badge variant="secondary" className="bg-amber-200 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Fast</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Trading Interface */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-card border">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span>Swap Tokens</span>
                <Badge variant="outline" className="text-primary border-primary">
                  Live
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <WalletConnection />
              <SwapInterface />
            </CardContent>
          </Card>
        </div>

        {/* Trading Activity */}
        <div className="lg:col-span-2 space-y-6">
          <RecentSwaps />
          
          {/* Market Overview */}
          <Card className="shadow-card border">
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
                      <div key={item.pair} className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/70 transition-colors">
                        <div>
                          <span className="font-medium text-sm">{item.pair}</span>
                          <p className="text-xs text-muted-foreground">{item.volume}</p>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={item.change.startsWith('+') ? "text-success" : "text-destructive"}
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
                      <div key={item.dex} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                        <div>
                          <span className="font-medium text-sm">{item.dex}</span>
                          <p className="text-xs text-muted-foreground">{item.share} market share</p>
                        </div>
                        <Badge 
                          variant={item.status === "Best Rate" ? "default" : "secondary"}
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