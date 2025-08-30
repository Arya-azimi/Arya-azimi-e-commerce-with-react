import { User } from "../../domain";

interface DashboardFormProps {
  user: User | null;
  username: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function DashboardForm({
  user,
  username,
  password,
  onChange,
  onSubmit,
}: DashboardFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">تغییر اطلاعات کاربری</h2>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          نام کاربری جدید
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={onChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder={user?.username}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          رمز عبور جدید
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
      >
        ذخیره تغییرات
      </button>
    </form>
  );
}

export { DashboardForm };
