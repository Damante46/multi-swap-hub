import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { History as HistoryIcon, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";

interface Transaction {
  id: string;
  type: "swap" | "send" | "receive";
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  status: "completed" | "pending" | "failed";
  hash: string;
  timestamp: string;
  chain: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "swap",
    fromToken: "ETH",
    toToken: "USDC",
    fromAmount: "1.5",
    toAmount: "3,750.00",
    status: "completed",
    hash: "0x1234...5678",
    timestamp: "2 hours ago",
    chain: "Ethereum",
  },
  {
    id: "2",
    type: "swap",
    fromToken: "SOL",
    toToken: "USDT",
    fromAmount: "25.0",
    toAmount: "2,125.50",
    status: "completed",
    hash: "3x9876...4321",
    timestamp: "1 day ago",
    chain: "Solana",
  },
  {
    id: "3",
    type: "swap",
    fromToken: "USDC",
    toToken: "ETH",
    fromAmount: "5,000.00",
    toAmount: "2.0",
    status: "pending",
    hash: "0xabcd...efgh",
    timestamp: "3 days ago",
    chain: "Ethereum",
  },
];

export default function History() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success border-success/20";
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "failed":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "send":
        return <ArrowUpRight className="h-4 w-4" />;
      case "receive":
        return <ArrowDownLeft className="h-4 w-4" />;
      default:
        return <ArrowUpRight className="h-4 w-4 rotate-45" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Transaction History
          </h1>
          <p className="text-muted-foreground mt-2">
            View all your swap transactions
          </p>
        </div>

        <div className="space-y-4">
          {mockTransactions.map((tx) => (
            <Card key={tx.id} className="p-4 bg-gradient-card border-border/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    {getTypeIcon(tx.type)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">
                        {tx.fromToken} → {tx.toToken}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {tx.chain}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{tx.timestamp}</p>
                  </div>
                </div>
                
                <Badge className={getStatusColor(tx.status)}>
                  {tx.status}
                </Badge>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">From:</span>
                  <span>{tx.fromAmount} {tx.fromToken}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">To:</span>
                  <span>{tx.toAmount} {tx.toToken}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Hash:</span>
                  <span className="font-mono">{tx.hash}</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Explorer
              </Button>
            </Card>
          ))}

          {mockTransactions.length === 0 && (
            <Card className="p-8 text-center bg-gradient-card border-border/50">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <HistoryIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">No transactions yet</h3>
              <p className="text-muted-foreground text-sm">
                Your swap history will appear here once you make your first transaction.
              </p>
            </Card>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}