import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context";
import { CartProvider } from "../context";
import { NotificationProvider } from "../context";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <CartProvider>
          <AuthProvider>{children}</AuthProvider>
        </CartProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}
