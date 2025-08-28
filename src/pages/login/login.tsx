import { Link } from "react-router-dom";
import { useLogin } from "../../hooks";
import { LoginForm } from "../../components/login-form";
import { AuthLayout } from "../../components/auth-layout";

function Login() {
  const { username, password, handleChange, handleLogin } = useLogin();

  return (
    <AuthLayout title="ورود">
      <LoginForm
        username={username}
        password={password}
        handleChange={handleChange}
        onSubmit={handleLogin}
      />
      <p className="text-center text-sm text-gray-600">
        هیچ اکانتی ندارید ؟
        <Link
          to="/signup"
          className="font-medium text-green-600 mr-1 hover:underline"
        >
          ساخت حساب کاربری
        </Link>
      </p>
    </AuthLayout>
  );
}

export { Login };
