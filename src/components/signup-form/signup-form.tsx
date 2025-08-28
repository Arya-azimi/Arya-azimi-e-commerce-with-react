interface SignUpFormProps {
  username: string;
  password: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function SignUpForm({
  username,
  password,
  handleChange,
  onSubmit,
}: SignUpFormProps) {
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
  );
}

export { SignUpForm };
