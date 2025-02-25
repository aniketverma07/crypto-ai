"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CryptoContextType {
  selectedCoin: string;
  setSelectedCoin: (coin: string) => void;
}

const CryptoContext = createContext<CryptoContextType>({
  selectedCoin: 'BTC',
  setSelectedCoin: () => {},
});

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
};

interface CryptoProviderProps {
  children: ReactNode;
}

export function CryptoProvider({ children }: CryptoProviderProps) {
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <CryptoContext.Provider value={{ selectedCoin, setSelectedCoin }}>
      {children}
    </CryptoContext.Provider>
  );
}
