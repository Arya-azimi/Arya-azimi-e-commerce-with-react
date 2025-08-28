import { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
}

function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export { AuthLayout };
