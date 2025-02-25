"use client";

import { CryptoProvider } from "./context/CryptoContext";
import { SidebarProvider } from "./context/SidebarContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CryptoProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </CryptoProvider>
  );
}
