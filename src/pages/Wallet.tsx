import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { WalletConnection } from "@/components/WalletConnection";
import { BottomNavigation } from "@/components/BottomNavigation";
import { SendInterface } from "@/components/SendInterface";
import { Eye, EyeOff, Send, Download, Plus, Wallet as WalletIcon, Copy, Check, RefreshCw } from "lucide-react";
import { useState, useMemo } from "react";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
interface TokenBalance {
  symbol: string;
  name: string;
  balance: string;
  value: string;
  change: string;
  positive: boolean;
  price: number;
}
// Static balances - in real app, these would come from wallet API
const staticBalances = [
  { symbol: "ETH", balance: "2.5" },
  { symbol: "USDC", balance: "1,250.00" },
  { symbol: "SOL", balance: "45.2" },
  { symbol: "USDT", balance: "890.50" },
  { symbol: "BTC", balance: "0.05" }
];

const walletAccounts = [
  {
    chain: "Solana",
    symbol: "SOL",
    address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgHkJ",
    balance: "0.001 SOL",
    icon: "🔮",
    color: "from-purple-500 to-purple-700"
  },
  {
    chain: "Bitcoin",
    symbol: "BTC",
    type: "Taproot",
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    balance: "0 BTC",
    icon: "₿",
    color: "from-orange-500 to-orange-700"
  },
  {
    chain: "Bitcoin",
    symbol: "BTC", 
    type: "Native Segwit",
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    balance: "0 BTC",
    icon: "₿",
    color: "from-orange-500 to-orange-700"
  },
  {
    chain: "Ethereum",
    symbol: "ETH",
    address: "0x742d35Cc6641C5532c2048d96C3f99b3C2f8e9E2",
    balance: "0 ETH",
    icon: "⟠",
    color: "from-blue-500 to-blue-700"
  },
  {
    chain: "Ethereum",
    symbol: "ETH",
    address: "0x742d35Cc6641C5532c2048d96C3f99b3C2f8e9E2", 
    balance: "0 ETH",
    icon: "⟠",
    color: "from-blue-500 to-blue-700"
  }
];

export default function Wallet() {
  const [showBalances, setShowBalances] = useState(true);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [selectedWalletForSend, setSelectedWalletForSend] = useState<typeof walletAccounts[0] | null>(null);
  const [showSendInterface, setShowSendInterface] = useState(false);
  const { prices, loading, error, lastUpdated } = useCryptoPrices(30000); // Update every 30 seconds

  const copyToClipboard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleWalletSelect = (wallet: typeof walletAccounts[0]) => {
    setSelectedWalletForSend(wallet);
    setShowSendInterface(true);
  };

  const handleBackToWalletSelection = () => {
    setShowSendInterface(false);
    setSelectedWalletForSend(null);
  };

  const handleCloseSend = () => {
    setShowSendInterface(false);
    setSelectedWalletForSend(null);
  };

  // Calculate token balances with real-time prices
  const tokenBalances: TokenBalance[] = useMemo(() => {
    return staticBalances.map(balance => {
      const priceData = prices[balance.symbol];
      if (!priceData) {
        return {
          symbol: balance.symbol,
          name: balance.symbol,
          balance: balance.balance,
          value: "$0.00",
          change: "0.0%",
          positive: true,
          price: 0
        };
      }

      const balanceNum = parseFloat(balance.balance.replace(',', ''));
      const value = balanceNum * priceData.current_price;
      const change = priceData.price_change_percentage_24h;

      return {
        symbol: balance.symbol,
        name: priceData.name,
        balance: balance.balance,
        value: `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        change: `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`,
        positive: change >= 0,
        price: priceData.current_price
      };
    });
  }, [prices]);

  const totalValue = tokenBalances.reduce((sum, token) => {
    return sum + parseFloat(token.value.replace('$', '').replace(',', ''));
  }, 0);

  const portfolioChange = useMemo(() => {
    if (tokenBalances.length === 0) return 0;
    
    // Calculate weighted average of price changes
    let totalValue = 0;
    let weightedChange = 0;
    
    tokenBalances.forEach(token => {
      const tokenValue = parseFloat(token.value.replace('$', '').replace(',', ''));
      const tokenChange = parseFloat(token.change.replace('%', '').replace('+', ''));
      totalValue += tokenValue;
      weightedChange += tokenValue * tokenChange;
    });
    
    return totalValue > 0 ? weightedChange / totalValue : 0;
  }, [tokenBalances]);
  return <div className="min-h-screen pb-20 bg-[#355e72]/[0.31]">
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
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold">Portfolio Value</h2>
              {loading && <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />}
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowBalances(!showBalances)}>
              {showBalances ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-3xl font-bold mb-1">
              {showBalances ? `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "••••••"}
            </p>
            <div className="flex items-center justify-center space-x-2">
              <Badge className={portfolioChange >= 0 ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20"}>
                {portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(1)}%
              </Badge>
              <span className="text-sm text-muted-foreground">24h</span>
            </div>
            {lastUpdated && (
              <p className="text-xs text-muted-foreground mt-2">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
            {error && (
              <p className="text-xs text-destructive mt-2">
                Error updating prices: {error}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex flex-col h-16">
                  <Send className="h-5 w-5 mb-1" />
                  <span className="text-xs">Send</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="bg-background border-border">
                {!showSendInterface ? (
                  <>
                    <SheetHeader className="text-left">
                      <SheetTitle>Send from</SheetTitle>
                      <SheetDescription>
                        Choose the wallet to send from
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-2">
                      {walletAccounts.map((wallet, index) => (
                        <Card 
                          key={`${wallet.chain}-${index}`} 
                          className="p-4 bg-card border-border hover:bg-accent cursor-pointer transition-colors"
                          onClick={() => handleWalletSelect(wallet)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">
                                {wallet.icon}
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <p className="font-semibold text-base">{wallet.chain}</p>
                                  {wallet.type && (
                                    <span className="text-sm text-muted-foreground">
                                      {wallet.type}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {wallet.balance}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Button variant="ghost" size="sm" className="text-primary">
                                Select
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                      
                      <div className="pt-4 border-t border-border mt-6">
                        <Button variant="ghost" className="w-full justify-center" size="sm">
                          Close
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  selectedWalletForSend && (
                    <SendInterface
                      selectedWallet={selectedWalletForSend}
                      onBack={handleBackToWalletSelection}
                      onClose={handleCloseSend}
                    />
                  )
                )}
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex flex-col h-16">
                  <Download className="h-5 w-5 mb-1" />
                  <span className="text-xs">Receive</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="bg-background border-border">
                <SheetHeader className="text-left">
                  <SheetTitle>Receive Address</SheetTitle>
                  <SheetDescription>
                    Your wallet addresses for receiving crypto
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {walletAccounts.map((wallet, index) => (
                    <Card key={`${wallet.chain}-${index}`} className="p-4 bg-gradient-card border-border/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">
                            {wallet.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="font-semibold">{wallet.chain}</p>
                              {wallet.type && (
                                <span className="text-sm text-muted-foreground">
                                  {wallet.type}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground font-mono break-all">
                              {wallet.address}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => copyToClipboard(wallet.address)}
                          className="h-8 w-8 flex-shrink-0"
                        >
                          {copiedAddress === wallet.address ? (
                            <Check className="h-4 w-4 text-success" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <Button variant="outline" className="flex flex-col h-16">
              <Plus className="h-5 w-5 mb-1" />
              <span className="text-xs">Buy</span>
            </Button>
          </div>
        </Card>

        {/* Token Balances */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Your Tokens</h3>
          
          {tokenBalances.map(token => <Card key={token.symbol} className="p-4 bg-gradient-card border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                    {token.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold">{token.symbol}</p>
                    <p className="text-sm text-muted-foreground">{token.name}</p>
                    <p className="text-xs text-muted-foreground">
                      ${showBalances ? token.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 }) : "••••••"}
                    </p>
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
                    <Badge className={token.positive ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20"}>
                      {token.change}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>)}

          {tokenBalances.length === 0 && <Card className="p-8 text-center bg-gradient-card border-border/50">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <WalletIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">No tokens found</h3>
              <p className="text-muted-foreground text-sm">
                Connect your wallet to view your token balances.
              </p>
            </Card>}
        </div>
      </div>

      <BottomNavigation />
    </div>;
}