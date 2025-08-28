import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Search, Shield, AlertTriangle } from "lucide-react";
import { Token } from "./SwapInterface";

interface TokenSelectorProps {
  selectedToken: Token;
  onTokenSelect: (token: Token) => void;
  tokens: Token[];
}

export const TokenSelector = ({ selectedToken, onTokenSelect, tokens }: TokenSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTokens = tokens.filter(token =>
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTokenSelect = (token: Token) => {
    onTokenSelect(token);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-auto p-2 hover:bg-muted/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
              {selectedToken.symbol.slice(0, 2)}
            </div>
            <div className="flex flex-col items-start">
              <span className="font-semibold">{selectedToken.symbol}</span>
              <span className="text-xs text-muted-foreground">{selectedToken.name}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Token</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="max-h-60 overflow-y-auto space-y-1">
            {filteredTokens.map((token) => (
              <Button
                key={token.address}
                variant="ghost"
                onClick={() => handleTokenSelect(token)}
                className="w-full h-auto p-3 justify-start hover:bg-muted/50"
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                    {token.symbol.slice(0, 2)}
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{token.symbol}</span>
                      {token.verified ? (
                        <Badge variant="secondary" className="text-xs">
                          <Shield className="h-3 w-3 mr-1 text-success" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1 text-warning" />
                          Unverified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{token.name}</p>
                  </div>
                  
                  {token.balance && (
                    <div className="text-right">
                      <p className="text-sm font-medium">{token.balance}</p>
                      <p className="text-xs text-muted-foreground">{token.symbol}</p>
                    </div>
                  )}
                </div>
              </Button>
            ))}
          </div>
          
          {filteredTokens.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No tokens found</p>
              <p className="text-sm">Try a different search term</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};