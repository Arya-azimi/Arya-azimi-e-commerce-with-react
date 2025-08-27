import { useNavigate, Link } from "react-router-dom";
import { useAuth, useAuthForm, useNotification } from "../../hooks"; // useNotification را اضافه کنید
import { UI_MESSAGES, ERROR_MESSAGES } from "../../constants"; // پیام‌ها را اضافه کنید

function SignUp() {
  const { username, password, handleChange } = useAuthForm();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification(); // <-- هوک اعلان را فراخوانی کنید

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      try {
        await signup(username, password);
        showNotification(UI_MESSAGES.SIGNUP_SUCCESS, "success"); // <-- پیام موفقیت
        navigate("/");
      } catch (error) {
        console.error("Sign up failed:", error);
        showNotification(ERROR_MESSAGES.SIGNUP_FAILED, "error"); // <-- پیام خطا
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center">ایجاد حساب کاربری</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              نام کاربری
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="نام کاربری خود را انتخاب کنید"
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
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="رمز عبور خود را انتخاب کنید"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            ایجاد حساب
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          حساب کاربری دارید ؟
          <Link
            to="/login"
            className="font-medium text-blue-600 mr-1 hover:underline"
          >
            ورود
          </Link>
        </p>
      </div>
    </div>
  );
}

export { SignUp };
