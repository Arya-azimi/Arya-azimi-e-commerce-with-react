import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context";
import { CartProvider } from "../context";
import { NotificationProvider } from "../context";
import { WishlistProvider } from "../context/wishlist";
import { AuthDataSync } from "../components";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <CartProvider>
          <WishlistProvider>
            <AuthProvider>
              <AuthDataSync />
              {children}
            </AuthProvider>
          </WishlistProvider>
        </CartProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}
