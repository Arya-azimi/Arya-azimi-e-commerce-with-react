interface LoginFormProps {
  username: string;
  password: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function LoginForm({
  username,
  password,
  handleChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
  );
}

export { LoginForm };
