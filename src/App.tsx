import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  ProductDetail,
  Products,
  SignUp,
  Dashboard,
} from "./pages";
import { Header } from "./components";

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
