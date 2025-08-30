import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Copy, Check, Eye, EyeOff, Shield, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateAllWallets, validateMnemonic, type GeneratedWallet } from "@/utils/walletGeneration";
import { supabase } from "@/integrations/supabase/client";

interface WalletCreationProps {
  onWalletCreated: (wallets: GeneratedWallet[]) => void;
}

export const WalletCreation = ({ onWalletCreated }: WalletCreationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [activeStep, setActiveStep] = useState<'create' | 'backup' | 'verify'>('create');
  const [generatedWallets, setGeneratedWallets] = useState<GeneratedWallet[]>([]);
  const [mnemonic, setMnemonic] = useState('');
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [verificationPhrase, setVerificationPhrase] = useState('');
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const getWalletIcon = (chain: string) => {
    switch (chain) {
      case 'Ethereum': return '⟠';
      case 'Solana': return '🔮';
      case 'Bitcoin': return '₿';
      default: return '💼';
    }
  };

  const handleCreateWallet = async () => {
    setIsCreating(true);
    try {
      const result = generateAllWallets();
      setGeneratedWallets(result.wallets);
      setMnemonic(result.mnemonic);
      setActiveStep('backup');
      
      toast({
        title: "Wallets Generated",
        description: "Your new wallets have been created successfully"
      });
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "Failed to create wallets. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleSaveWallets = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to save your wallets",
          variant: "destructive"
        });
        return;
      }

      // Save primary wallet address to profile (Ethereum as default)
      const ethereumWallet = generatedWallets.find(w => w.chain === 'Ethereum');
      if (ethereumWallet) {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            user_id: user.id,
            wallet_address: ethereumWallet.address,
            preferred_chain: 'ethereum'
          });

        if (error) {
          throw error;
        }
      }

      onWalletCreated(generatedWallets);
      setIsOpen(false);
      resetState();
      
      toast({
        title: "Wallets Saved",
        description: "Your wallets have been securely saved to your profile"
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save wallets to your profile",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => new Set([...prev, label]));
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(label);
          return newSet;
        });
      }, 2000);
      
      toast({
        title: "Copied",
        description: `${label} copied to clipboard`
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const handleVerifyPhrase = () => {
    if (verificationPhrase.trim() === mnemonic) {
      handleSaveWallets();
    } else {
      toast({
        title: "Verification Failed",
        description: "The recovery phrase doesn't match. Please try again.",
        variant: "destructive"
      });
    }
  };

  const resetState = () => {
    setActiveStep('create');
    setGeneratedWallets([]);
    setMnemonic('');
    setShowMnemonic(false);
    setVerificationPhrase('');
    setCopiedItems(new Set());
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetState();
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Create New Wallet
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Wallet</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeStep} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="create" disabled={activeStep !== 'create'}>
              Create
            </TabsTrigger>
            <TabsTrigger value="backup" disabled={activeStep !== 'backup'}>
              Backup
            </TabsTrigger>
            <TabsTrigger value="verify" disabled={activeStep !== 'verify'}>
              Verify
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-4">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                You'll create wallets for multiple blockchain networks with a single recovery phrase. 
                Make sure to backup your recovery phrase securely.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Wallets to be created:</h3>
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">⟠</span>
                    <div>
                      <p className="font-medium">Ethereum</p>
                      <p className="text-xs text-muted-foreground">ETH, USDC, ERC-20</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🔮</span>
                    <div>
                      <p className="font-medium">Solana</p>
                      <p className="text-xs text-muted-foreground">SOL, SPL tokens</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">₿</span>
                    <div>
                      <p className="font-medium">Bitcoin (SegWit)</p>
                      <p className="text-xs text-muted-foreground">Native SegWit</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">₿</span>
                    <div>
                      <p className="font-medium">Bitcoin (Taproot)</p>
                      <p className="text-xs text-muted-foreground">Latest standard</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            
            <Button 
              onClick={handleCreateWallet} 
              disabled={isCreating}
              className="w-full bg-gradient-primary hover:opacity-90"
            >
              {isCreating ? "Creating Wallets..." : "Create Wallets"}
            </Button>
          </TabsContent>
          
          <TabsContent value="backup" className="space-y-4">
            <Alert className="border-warning bg-warning/10">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> Write down your recovery phrase and store it safely. 
                Anyone with this phrase can access your wallets.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="recovery-phrase">Recovery Phrase (12 words)</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMnemonic(!showMnemonic)}
                >
                  {showMnemonic ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              
              <Card className="p-4 bg-muted/50">
                <div className="grid grid-cols-3 gap-2 text-sm font-mono">
                  {(showMnemonic ? mnemonic.split(' ') : Array(12).fill('••••••')).map((word, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-muted-foreground w-4">{index + 1}.</span>
                      <span>{word}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(mnemonic, 'Recovery Phrase')}
                  >
                    {copiedItems.has('Recovery Phrase') ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </Card>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Generated Wallet Addresses:</h4>
                {generatedWallets.map((wallet, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getWalletIcon(wallet.chain)}</span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium">{wallet.chain}</p>
                            {wallet.type && (
                              <Badge variant="outline" className="text-xs">
                                {wallet.type}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground font-mono">
                            {wallet.address.slice(0, 20)}...{wallet.address.slice(-10)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(wallet.address, `${wallet.chain} Address`)}
                      >
                        {copiedItems.has(`${wallet.chain} Address`) ? (
                          <Check className="h-4 w-4 text-success" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={() => setActiveStep('verify')}
              className="w-full"
            >
              I've Backed Up My Recovery Phrase
            </Button>
          </TabsContent>
          
          <TabsContent value="verify" className="space-y-4">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Please enter your recovery phrase to verify you've backed it up correctly.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-3">
              <Label htmlFor="verify-phrase">Enter your recovery phrase</Label>
              <Input
                id="verify-phrase"
                placeholder="Enter all 12 words separated by spaces"
                value={verificationPhrase}
                onChange={(e) => setVerificationPhrase(e.target.value)}
                className="font-mono"
              />
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline"
                onClick={() => setActiveStep('backup')}
                className="flex-1"
              >
                Back to Backup
              </Button>
              <Button 
                onClick={handleVerifyPhrase}
                disabled={!verificationPhrase.trim()}
                className="flex-1 bg-gradient-primary hover:opacity-90"
              >
                Verify & Save Wallets
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};