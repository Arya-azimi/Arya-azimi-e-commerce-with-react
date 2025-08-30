import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/auth-context";
import { CartProvider } from "../context/cart-context";
import { NotificationProvider } from "../context/notification-context";

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
