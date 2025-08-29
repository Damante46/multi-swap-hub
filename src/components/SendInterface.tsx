import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";

interface SendInterfaceProps {
  selectedWallet: {
    chain: string;
    symbol: string;
    type?: string;
    address: string;
    balance: string;
    icon: string;
    color: string;
  };
  onBack: () => void;
  onClose: () => void;
}

export const SendInterface = ({ selectedWallet, onBack, onClose }: SendInterfaceProps) => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const { prices } = useCryptoPrices();

  const priceData = prices[selectedWallet.symbol];
  const balanceNum = parseFloat(selectedWallet.balance.split(' ')[0]);
  const availableBalance = isNaN(balanceNum) ? 0 : balanceNum;
  
  const handleMaxClick = () => {
    setAmount(availableBalance.toString());
  };

  const handleNext = () => {
    // In a real app, this would proceed to transaction confirmation
    console.log("Proceeding with transaction:", {
      from: selectedWallet.address,
      to: recipientAddress,
      amount: amount,
      symbol: selectedWallet.symbol
    });
  };

  const currentAmountValue = amount && priceData ? 
    (parseFloat(amount) * priceData.current_price).toFixed(2) : "0.00";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-lg">
            {selectedWallet.icon}
          </div>
          <h2 className="text-xl font-semibold">Send {selectedWallet.symbol}</h2>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          Select
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recipient">
            Recipient's {selectedWallet.chain} address
          </Label>
          <Input
            id="recipient"
            placeholder={`Enter ${selectedWallet.chain} address`}
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="bg-muted/50 border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="relative">
            <Input
              id="amount"
              type="number"
              placeholder="~$0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-muted/50 border-border pr-20"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              <span className="text-sm font-medium">{selectedWallet.symbol}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-xs text-primary"
                onClick={handleMaxClick}
              >
                Max
              </Button>
            </div>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>≈ ${currentAmountValue}</span>
            <span>Available {availableBalance.toFixed(6)} {selectedWallet.symbol}</span>
          </div>
        </div>
      </div>

      {priceData && (
        <Card className="p-4 bg-muted/30 border-border/50">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Current Price</p>
              <p className="font-semibold">
                ${priceData.current_price.toLocaleString(undefined, { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 6 
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">24h Change</p>
              <p className={`font-semibold ${priceData.price_change_percentage_24h >= 0 ? 'text-success' : 'text-destructive'}`}>
                {priceData.price_change_percentage_24h >= 0 ? '+' : ''}
                {priceData.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="flex space-x-4 pt-4">
        <Button variant="outline" className="flex-1" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          className="flex-1" 
          onClick={handleNext}
          disabled={!recipientAddress || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > availableBalance}
        >
          Next
        </Button>
      </div>
    </div>
  );
};