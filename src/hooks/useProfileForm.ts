import { useState, useCallback } from "react";
import { useAuth, useNotification } from "./";
import { updateUser as updateUserOnApi, verifyPassword } from "../services";

function useProfileForm({ onSuccess }: { onSuccess: () => void }) {
  const { user, updateUserState } = useAuth();
  const { showNotification } = useNotification();
  const [form, setForm] = useState({ username: "", password: "" });

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const updateUser = async (currentPassword: string) => {
    if (!user) return;
    try {
      const data = {
        ...(form.username && { username: form.username }),
        ...(form.password && { password: form.password }),
      };

      if (Object.keys(data).length === 0) {
        showNotification("هیچ تغییری برای ثبت وجود ندارد.", "error");
        return;
      }

      await verifyPassword(currentPassword);
      const { user: updatedUser } = await updateUserOnApi(user.userId, data);

      updateUserState({
        username: updatedUser.username,
        userId: updatedUser.id.toString(),
      });

      showNotification("اطلاعات با موفقیت به‌روز شد!", "success");
      setForm({ username: "", password: "" });
      onSuccess();
    } catch (error) {
      const message = error instanceof Error ? error.message : "خطای ناشناخته";
      showNotification(message, "error");
    }
  };

  return { form, onChange, updateUser };
}

export { useProfileForm };
