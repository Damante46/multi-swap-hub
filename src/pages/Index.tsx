// Update this page (the content is just a fallback if you fail to update the page)

import { SwapInterface } from "@/components/SwapInterface";
import { WalletConnection } from "@/components/WalletConnection";
import { RecentSwaps } from "@/components/RecentSwaps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-6xl mx-auto p-4 space-y-8">
        {/* Hero Section */}
        <div className="text-center py-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Multi Swap Hub
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the future of decentralized trading with our advanced DEX aggregator. 
            Get the best prices across all major exchanges in one seamless interface.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2">
              <TrendingUp className="h-4 w-4 mr-2" />
              Best Rates Guaranteed
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Lightning Fast
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              Secure & Trustless
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              Community Driven
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main Swap Interface */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Swap Tokens</span>
                  <Badge variant="outline">Live Rates</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <WalletConnection />
                <div className="mt-6">
                  <SwapInterface />
                </div>
              </CardContent>
            </Card>

            {/* Features Section */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Why Choose Multi Swap Hub?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20">
                    <TrendingUp className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Best Prices</h4>
                      <p className="text-xs text-muted-foreground">
                        Aggregated from 20+ DEXs for optimal rates
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20">
                    <Zap className="h-5 w-5 text-warning mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Fast Execution</h4>
                      <p className="text-xs text-muted-foreground">
                        Sub-second route optimization
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20">
                    <Shield className="h-5 w-5 text-info mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">MEV Protection</h4>
                      <p className="text-xs text-muted-foreground">
                        Advanced MEV protection built-in
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Multi-Chain</h4>
                      <p className="text-xs text-muted-foreground">
                        Ethereum, Solana, BSC & more
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-4">
                  <Link to="/wallet">
                    <Button variant="outline" size="sm">
                      View Wallet
                    </Button>
                  </Link>
                  <Link to="/history">
                    <Button variant="outline" size="sm">
                      Transaction History
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity & Stats */}
          <div className="space-y-6">
            <RecentSwaps />
            
            {/* Stats Card */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Platform Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-primary/10">
                    <p className="text-2xl font-bold text-primary">$2.4B+</p>
                    <p className="text-sm text-muted-foreground">Total Volume</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-success/10">
                    <p className="text-2xl font-bold text-success">150K+</p>
                    <p className="text-sm text-muted-foreground">Transactions</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-warning/10">
                    <p className="text-2xl font-bold text-warning">25+</p>
                    <p className="text-sm text-muted-foreground">DEXs Connected</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-info/10">
                    <p className="text-2xl font-bold text-info">99.9%</p>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/wallet" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Connect New Wallet
                  </Button>
                </Link>
                <Link to="/history" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View All Transactions
                  </Button>
                </Link>
                <Link to="/settings" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Account Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
