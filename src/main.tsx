import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/auth-context";
import { CartProvider } from "./context/cart-context";
import { NotificationProvider } from "./context/notification-context";

export function Main() {
  return (
    <StrictMode>
      <NotificationProvider>
        <CartProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </CartProvider>
      </NotificationProvider>{" "}
    </StrictMode>
  );
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<Main />);
}
