import { useState, useEffect } from 'react';

interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

interface UseCryptoPricesReturn {
  prices: Record<string, CryptoPrice>;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

const COINGECKO_API = 'https://api.coingecko.com/api/v3/simple/price';
const COINS = 'ethereum,solana,tether,usd-coin,bitcoin';
const CURRENCY = 'usd';

export const useCryptoPrices = (updateInterval: number = 30000): UseCryptoPricesReturn => {
  const [prices, setPrices] = useState<Record<string, CryptoPrice>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPrices = async () => {
    try {
      const response = await fetch(
        `${COINGECKO_API}?ids=${COINS}&vs_currencies=${CURRENCY}&include_24hr_change=true&include_last_updated_at=true`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform the API response to our format
      const transformedPrices: Record<string, CryptoPrice> = {};
      
      Object.entries(data).forEach(([coinId, coinData]: [string, any]) => {
        const symbolMap: Record<string, string> = {
          'ethereum': 'ETH',
          'solana': 'SOL',
          'tether': 'USDT',
          'usd-coin': 'USDC',
          'bitcoin': 'BTC'
        };
        
        const nameMap: Record<string, string> = {
          'ethereum': 'Ethereum',
          'solana': 'Solana',
          'tether': 'Tether',
          'usd-coin': 'USD Coin',
          'bitcoin': 'Bitcoin'
        };
        
        transformedPrices[symbolMap[coinId]] = {
          id: coinId,
          symbol: symbolMap[coinId],
          name: nameMap[coinId],
          current_price: coinData.usd,
          price_change_percentage_24h: coinData.usd_24h_change || 0
        };
      });
      
      setPrices(transformedPrices);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prices');
      console.error('Error fetching crypto prices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchPrices();
    
    // Set up interval for real-time updates
    const interval = setInterval(fetchPrices, updateInterval);
    
    return () => clearInterval(interval);
  }, [updateInterval]);

  return { prices, loading, error, lastUpdated };
};