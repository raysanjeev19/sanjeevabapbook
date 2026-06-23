"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";
import { CommandPalette } from "@/components/layout/command-palette";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { PwaRegister } from "@/components/layout/pwa-register";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <MobileTabBar />
      <CommandPalette />
      <Toaster theme="system" position="top-center" />
      <PwaRegister />
    </QueryClientProvider>
  );
}
