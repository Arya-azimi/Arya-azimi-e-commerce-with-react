import { useState } from "react";
import { useLogin, useSignUp } from "../../hooks";
import { LoginForm, SignUpForm, AuthLayout } from "../../components";

type AuthMode = "login" | "signup";

function Auth() {
  const [mode, setMode] = useState<AuthMode>("login");
  const loginProps = useLogin();
  const signUpProps = useSignUp();

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "login" ? "signup" : "login"));
  };

  return (
    <AuthLayout title={mode === "login" ? "ورود" : "ایجاد حساب کاربری"}>
      {mode === "login" ? (
        <>
          <LoginForm
            username={loginProps.username}
            password={loginProps.password}
            handleChange={loginProps.handleChange}
            onSubmit={loginProps.handleLogin}
          />
          <p className="text-center text-sm text-gray-600">
            هیچ اکانتی ندارید؟
            <button
              onClick={toggleMode}
              className="font-medium text-green-600 mr-1 hover:underline focus:outline-none"
            >
              ساخت حساب کاربری
            </button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm
            username={signUpProps.username}
            password={signUpProps.password}
            handleChange={signUpProps.handleChange}
            onSubmit={signUpProps.handleSignUp}
          />
          <p className="text-center text-sm text-gray-600">
            حساب کاربری دارید؟
            <button
              onClick={toggleMode}
              className="font-medium text-blue-600 mr-1 hover:underline focus:outline-none"
            >
              ورود
            </button>
          </p>
        </>
      )}
    </AuthLayout>
  );
}

export { Auth };
