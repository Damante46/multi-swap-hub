// Update this page (the content is just a fallback if you fail to update the page)

import { SwapInterface } from "@/components/SwapInterface";
import { WalletConnection } from "@/components/WalletConnection";
import { BottomNavigation } from "@/components/BottomNavigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            DEX Aggregator
          </h1>
          <p className="text-muted-foreground">
            Best prices across all DEXs
          </p>
        </div>

        <div className="mb-6">
          <WalletConnection />
        </div>

        <SwapInterface />
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Index;
