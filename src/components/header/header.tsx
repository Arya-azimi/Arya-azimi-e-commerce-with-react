import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "../shopping-cart";
import { useAuth } from "../../hooks";
import { Modal } from "../modal";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className="bg-white shadow h-[8vh]  flex justify-between items-center">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            فروشگاه
          </Link>
          <nav className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-600 ml-4 hover:text-gray-900 transition-colors"
            >
              خانه
            </Link>
            <Link
              to="/products"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              محصولات
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  سلام، {user.username}
                </Link>
                <button
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  خروج
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ورود
              </Link>
            )}
            <ShoppingCart />
          </nav>
        </div>
      </header>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="خروج از حساب کاربری"
      >
        <p>آیا برای خروج از حساب کاربری خود مطمئن هستید؟</p>
      </Modal>
    </>
  );
}

export { Header };
