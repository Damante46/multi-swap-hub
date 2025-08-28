import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WalletConnection } from "@/components/WalletConnection";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Eye, EyeOff, Send, Download, Plus, Wallet as WalletIcon } from "lucide-react";
import { useState } from "react";

interface TokenBalance {
  symbol: string;
  name: string;
  balance: string;
  value: string;
  change: string;
  positive: boolean;
}

const mockBalances: TokenBalance[] = [
  { symbol: "ETH", name: "Ethereum", balance: "2.5", value: "$6,250.00", change: "+2.5%", positive: true },
  { symbol: "USDC", name: "USD Coin", balance: "1,250.00", value: "$1,250.00", change: "0.0%", positive: true },
  { symbol: "SOL", name: "Solana", balance: "45.2", value: "$3,164.00", change: "+5.2%", positive: true },
  { symbol: "USDT", name: "Tether", balance: "890.50", value: "$890.50", change: "-0.1%", positive: false },
];

export default function Wallet() {
  const [showBalances, setShowBalances] = useState(true);

  const totalValue = mockBalances.reduce((sum, token) => {
    return sum + parseFloat(token.value.replace('$', '').replace(',', ''));
  }, 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Wallet
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your crypto assets
          </p>
        </div>

        {/* Wallet Connection */}
        <div className="mb-6">
          <WalletConnection />
        </div>

        {/* Portfolio Overview */}
        <Card className="p-6 mb-6 bg-gradient-card border-border/50 shadow-glow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Portfolio Value</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowBalances(!showBalances)}
            >
              {showBalances ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-3xl font-bold mb-1">
              {showBalances ? `$${totalValue.toLocaleString()}` : "••••••"}
            </p>
            <div className="flex items-center justify-center space-x-2">
              <Badge className="bg-success/10 text-success border-success/20">
                +12.5%
              </Badge>
              <span className="text-sm text-muted-foreground">24h</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Button variant="outline" className="flex flex-col h-16">
              <Send className="h-5 w-5 mb-1" />
              <span className="text-xs">Send</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-16">
              <Download className="h-5 w-5 mb-1" />
              <span className="text-xs">Receive</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-16">
              <Plus className="h-5 w-5 mb-1" />
              <span className="text-xs">Buy</span>
            </Button>
          </div>
        </Card>

        {/* Token Balances */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Your Tokens</h3>
          
          {mockBalances.map((token) => (
            <Card key={token.symbol} className="p-4 bg-gradient-card border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                    {token.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold">{token.symbol}</p>
                    <p className="text-sm text-muted-foreground">{token.name}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold">
                    {showBalances ? token.balance : "••••"} {token.symbol}
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-muted-foreground">
                      {showBalances ? token.value : "••••••"}
                    </p>
                    <Badge
                      className={
                        token.positive
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      }
                    >
                      {token.change}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {mockBalances.length === 0 && (
            <Card className="p-8 text-center bg-gradient-card border-border/50">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <WalletIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">No tokens found</h3>
              <p className="text-muted-foreground text-sm">
                Connect your wallet to view your token balances.
              </p>
            </Card>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}