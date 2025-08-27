import { useNavigate, Link } from "react-router-dom";
import { useAuth, useAuthForm, useNotification } from "../../hooks";
import { UI_MESSAGES, ERROR_MESSAGES } from "../../constants";

function Login() {
  const { username, password, handleChange } = useAuthForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      try {
        await login(username, password);
        showNotification(UI_MESSAGES.LOGIN_SUCCESS, "success");
        navigate("/");
      } catch (error) {
        console.error("Login failed:", error);
        showNotification(ERROR_MESSAGES.LOGIN_FAILED, "error");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center">ورود</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              نام کاربری
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              رمز
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            ورود
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          هیچ اکانتی ندارید ؟
          <Link
            to="/signup"
            className="font-medium text-green-600 mr-1 hover:underline"
          >
            ساخت حساب کاربری
          </Link>
        </p>
      </div>
    </div>
  );
}
export { Login };
