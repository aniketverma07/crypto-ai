import axios from 'axios';

export interface CryptoData {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      volume_24h: number;
      market_cap: number;
      percent_change_24h: number;
    };
  };
}

// API endpoints
const API_BASE_URL = '/api';

// Fetch crypto data
export async function fetchCryptoData(): Promise<CryptoData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/crypto`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return [];
  }
}

// Fetch historical data for a specific coin
export async function fetchCryptoHistoricalData(symbol: string, timeframe: string) {
  try {
    // For development, return mock data
    const mockHistoricalData = (symbol: string) => ({
      data: Array.from({ length: 30 }, (_, i) => {
        const basePrice = symbol === 'BTC' ? 50000 : symbol === 'ETH' ? 3000 : 300;
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        return {
          timestamp: date.toISOString(),
          price: basePrice * (1 + Math.sin(i / 5) * 0.1),
          volume: Math.random() * 1000000
        };
      })
    });
    return mockHistoricalData(symbol);
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return { data: [] };
  }
}

// Fetch trading signals
export async function fetchTradingSignals() {
  try {
    const response = await fetch(`${API_BASE_URL}/trading/signals`);
    if (!response.ok) {
      throw new Error('Failed to fetch trading signals');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching trading signals:', error);
    return null;
  }
}

// Fetch trading tips
export async function fetchTradingTips() {
  try {
    const response = await fetch(`${API_BASE_URL}/trading/tips`);
    if (!response.ok) {
      throw new Error('Failed to fetch trading tips');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching trading tips:', error);
    return null;
  }
}

export async function fetchMarketAnalysis(symbol: string = 'BTC') {
  try {
    const response = await fetch(`/api/market/analysis?symbol=${symbol}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching market analysis:', error);
    return null;
  }
}

export async function fetchMarketSentiment(symbol: string) {
  try {
    const response = await fetch(`/api/market/sentiment?symbol=${symbol}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching market sentiment:', error);
    return null;
  }
}
