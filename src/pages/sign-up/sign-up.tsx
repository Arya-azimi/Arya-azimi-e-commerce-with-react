import { Link } from "react-router-dom";
import { useSignUp } from "../../hooks";
import { SignUpForm } from "../../components/signup-form";
import { AuthLayout } from "../../components/auth-layout"; // <-- Layout را اضافه کنید

function SignUp() {
  const { username, password, handleChange, handleSignUp } = useSignUp();

  return (
    <AuthLayout title="ایجاد حساب کاربری">
      <SignUpForm
        username={username}
        password={password}
        handleChange={handleChange}
        onSubmit={handleSignUp}
      />
      <p className="text-center text-sm text-gray-600">
        حساب کاربری دارید ؟
        <Link
          to="/login"
          className="font-medium text-blue-600 mr-1 hover:underline"
        >
          ورود
        </Link>
      </p>
    </AuthLayout>
  );
}

export { SignUp };
