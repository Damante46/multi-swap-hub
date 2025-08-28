import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Wallet, Copy, ExternalLink, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
interface WalletInfo {
  address: string;
  chain: string;
  balance: string;
  connected: boolean;
}
const SUPPORTED_WALLETS = [{
  name: "MetaMask",
  icon: "🦊",
  type: "ethereum"
}, {
  name: "Phantom",
  icon: "👻",
  type: "solana"
}, {
  name: "WalletConnect",
  icon: "🔗",
  type: "multi"
}];
export const WalletConnection = () => {
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    toast
  } = useToast();

  // Check for existing wallet connection on mount
  useEffect(() => {
    checkWalletConnection();
  }, []);
  const checkWalletConnection = async () => {
    // Check if MetaMask is connected
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts'
        });
        if (accounts.length > 0) {
          const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest']
          });
          setWallet({
            address: accounts[0],
            chain: 'Ethereum',
            balance: (parseInt(balance, 16) / 1e18).toFixed(4) + ' ETH',
            connected: true
          });
        }
      } catch (error) {
        console.error('Failed to check wallet connection:', error);
      }
    }
  };
  const connectWallet = async (walletName: string) => {
    setIsConnecting(true);
    try {
      if (walletName === "MetaMask") {
        if (typeof window !== 'undefined' && window.ethereum) {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
          });
          const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest']
          });
          setWallet({
            address: accounts[0],
            chain: 'Ethereum',
            balance: (parseInt(balance, 16) / 1e18).toFixed(4) + ' ETH',
            connected: true
          });
          toast({
            title: "Wallet Connected",
            description: `Connected to ${walletName}`
          });
        } else {
          toast({
            title: "MetaMask not found",
            description: "Please install MetaMask to continue",
            variant: "destructive"
          });
        }
      } else {
        // Simulate connection for other wallets
        setWallet({
          address: `${walletName.toLowerCase()}...${Math.random().toString(36).slice(2, 8)}`,
          chain: walletName === "Phantom" ? "Solana" : "Multi-chain",
          balance: walletName === "Phantom" ? "125.50 SOL" : "Multi-chain",
          connected: true
        });
        toast({
          title: "Wallet Connected",
          description: `Connected to ${walletName} (Demo)`
        });
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
      setIsDialogOpen(false);
    }
  };
  const disconnectWallet = () => {
    setWallet(null);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected"
    });
  };
  const copyAddress = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard"
      });
    }
  };
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  if (wallet?.connected) {
    return <Card className="p-4 bg-gradient-card border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center bg-slate-50">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{formatAddress(wallet.address)}</span>
                <Badge variant="secondary" className="text-xs">
                  {wallet.chain}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{wallet.balance}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={copyAddress}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={disconnectWallet}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>;
  }
  return <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
          <Wallet className="h-4 w-4 mr-2" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {SUPPORTED_WALLETS.map(walletOption => <Button key={walletOption.name} variant="outline" onClick={() => connectWallet(walletOption.name)} disabled={isConnecting} className="w-full h-16 justify-start hover:bg-muted/50">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{walletOption.icon}</span>
                <div className="text-left">
                  <p className="font-semibold">{walletOption.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {walletOption.type} wallet
                  </p>
                </div>
              </div>
            </Button>)}
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-4">
          By connecting a wallet, you agree to our Terms of Service and Privacy Policy.
        </p>
      </DialogContent>
    </Dialog>;
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}