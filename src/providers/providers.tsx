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
        <CartProvider>
          <WishlistProvider>
            <AuthProvider>
              <DataSync />
              {children}
            </AuthProvider>
          </WishlistProvider>
        </CartProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export { AppProviders };
