import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  AuthProvider,
  CartProvider,
  NotificationProvider,
  WishlistProvider,
} from "../context";
import { DataSync } from "../components";

interface AppProvidersProps {
  children: ReactNode;
}

function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <DataSync />
              {children}
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export { AppProviders };
