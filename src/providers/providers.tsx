import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context";
import { CartProvider } from "../context";
import { NotificationProvider } from "../context";
import { WishlistProvider } from "../context/wishlist";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <CartProvider>
          {/* AuthProvider must wrap WishlistProvider to break the cycle */}
          <AuthProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </AuthProvider>
        </CartProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}
