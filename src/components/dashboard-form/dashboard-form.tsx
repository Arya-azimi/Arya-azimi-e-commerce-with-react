import { User } from "../../domain";

interface DashboardFormProps {
  user: User | null;
  newUsername: string;
  setNewUsername: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function DashboardForm({
  user,
  newUsername,
  setNewUsername,
  newPassword,
  setNewPassword,
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
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
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
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
