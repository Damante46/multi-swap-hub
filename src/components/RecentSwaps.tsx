import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, ExternalLink, Loader2, TrendingUp } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface SwapTransaction {
  id: string;
  from_token_symbol: string;
  to_token_symbol: string;
  from_amount: number;
  to_amount: number | null;
  status: string;
  chain: string;
  created_at: string;
  transaction_hash?: string | null;
}

export const RecentSwaps = () => {
  const { user } = useAuth();
  const [swaps, setSwaps] = useState<SwapTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchRecentSwaps();
    }
  }, [user]);

  const fetchRecentSwaps = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (supabaseError) {
        throw supabaseError;
      }

      setSwaps(data || []);
    } catch (err) {
      console.error('Error fetching recent swaps:', err);
      setError('Failed to load recent transactions');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'failed':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatAmount = (amount: number, symbol: string) => {
    return `${amount.toLocaleString(undefined, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 6 
    })} ${symbol}`;
  };

  const getExplorerUrl = (hash: string, chain: string) => {
    const explorers: { [key: string]: string } = {
      'ethereum': 'https://etherscan.io/tx/',
      'bitcoin': 'https://blockstream.info/tx/',
      'solana': 'https://solscan.io/tx/',
    };
    
    const baseUrl = explorers[chain.toLowerCase()] || 'https://etherscan.io/tx/';
    return `${baseUrl}${hash}`;
  };

  if (loading) {
    return (
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Swaps
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading recent transactions...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Swaps
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-destructive text-sm">{error}</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchRecentSwaps}
            className="mt-2"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Swaps
          </CardTitle>
          {swaps.length > 0 && (
            <Link to="/history">
              <Button variant="ghost" size="sm" className="text-xs">
                View All
              </Button>
            </Link>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {swaps.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
              <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-2">No recent swaps</p>
            <p className="text-xs text-muted-foreground">
              Your swap history will appear here after your first transaction
            </p>
          </div>
        ) : (
          swaps.map((swap) => (
            <div
              key={swap.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card/50 hover:bg-card/70 transition-colors"
            >
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium">
                      {swap.from_token_symbol} → {swap.to_token_symbol}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {swap.chain}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{formatAmount(swap.from_amount, swap.from_token_symbol)}</span>
                    <span>→</span>
                    <span>{swap.to_amount ? formatAmount(swap.to_amount, swap.to_token_symbol) : 'Pending'}</span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(swap.created_at).toLocaleDateString()} at{' '}
                    {new Date(swap.created_at).toLocaleTimeString(undefined, { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(swap.status)}>
                  {swap.status}
                </Badge>
                
                {swap.transaction_hash && swap.status === 'completed' && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => window.open(getExplorerUrl(swap.transaction_hash!, swap.chain), '_blank')}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};