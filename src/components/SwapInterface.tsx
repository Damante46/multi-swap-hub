import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, Settings } from "lucide-react";
import { TokenSelector } from "./TokenSelector";
import { Badge } from "@/components/ui/badge";

export interface Token {
  symbol: string;
  name: string;
  address: string;
  logoURI?: string;
  verified: boolean;
  balance?: string;
}

const SAMPLE_TOKENS: Token[] = [
  { symbol: "ETH", name: "Ethereum", address: "0x0", verified: true, balance: "2.5" },
  { symbol: "USDC", name: "USD Coin", address: "0x1", verified: true, balance: "1,250.00" },
  { symbol: "SOL", name: "Solana", address: "So11111", verified: true, balance: "45.2" },
  { symbol: "USDT", name: "Tether", address: "0x2", verified: true, balance: "890.50" },
];

export const SwapInterface = () => {
  const [fromToken, setFromToken] = useState<Token>(SAMPLE_TOKENS[0]);
  const [toToken, setToToken] = useState<Token>(SAMPLE_TOKENS[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    // Simulate price calculation
    if (value && !isNaN(Number(value))) {
      const mockRate = 2500; // Example: ETH to USDC rate
      setToAmount((Number(value) * mockRate).toFixed(2));
    } else {
      setToAmount("");
    }
  };

  const handleSwap = async () => {
    setIsLoading(true);
    // Simulate swap transaction
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="p-6 bg-gradient-card shadow-glow border-border/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Swap Tokens
          </h2>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* From Token */}
        <div className="space-y-4">
          <div className="rounded-xl bg-muted/50 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">From</span>
              {fromToken.balance && (
                <span className="text-sm text-muted-foreground">
                  Balance: {fromToken.balance}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <TokenSelector
                selectedToken={fromToken}
                onTokenSelect={setFromToken}
                tokens={SAMPLE_TOKENS.filter(t => t.address !== toToken.address)}
              />
              <Input
                type="number"
                placeholder="0.0"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                className="text-right text-2xl font-semibold border-0 bg-transparent p-0 h-auto"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSwapTokens}
              className="h-10 w-10 rounded-full border border-border bg-background hover:bg-muted/50"
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>

          {/* To Token */}
          <div className="rounded-xl bg-muted/50 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">To</span>
              {toToken.balance && (
                <span className="text-sm text-muted-foreground">
                  Balance: {toToken.balance}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <TokenSelector
                selectedToken={toToken}
                onTokenSelect={setToToken}
                tokens={SAMPLE_TOKENS.filter(t => t.address !== fromToken.address)}
              />
              <Input
                type="number"
                placeholder="0.0"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
                className="text-right text-2xl font-semibold border-0 bg-transparent p-0 h-auto"
                readOnly
              />
            </div>
          </div>

          {/* Route Info */}
          {fromAmount && toAmount && (
            <div className="rounded-lg bg-muted/30 p-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Best Route</span>
                <Badge variant="secondary" className="text-xs">
                  Uniswap V3
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Price Impact</span>
                <span className="text-success">0.12%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Slippage</span>
                <span>0.5%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Gas</span>
                <span>~$12.50</span>
              </div>
            </div>
          )}

          {/* Swap Button */}
          <Button
            onClick={handleSwap}
            disabled={!fromAmount || !toAmount || isLoading}
            className="w-full h-14 text-lg font-semibold bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            {isLoading ? "Swapping..." : "Swap Tokens"}
          </Button>
        </div>
      </Card>
    </div>
  );
};