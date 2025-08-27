import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/auth-context";
import { CartProvider } from "./context/cart-context";
import { NotificationProvider } from "./context/notification-context"; // <-- این خط را اضافه کنید

export function Main() {
  return (
    <StrictMode>
      <NotificationProvider>
        {" "}
        {/* <-- این Provider را اضافه کنید */}
        <CartProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </CartProvider>
      </NotificationProvider>{" "}
      {/* <-- این Provider را اضافه کنید */}
    </StrictMode>
  );
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<Main />);
}
