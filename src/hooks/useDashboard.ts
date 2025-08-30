import { useState, useCallback } from "react";
import { useAuth, useNotification } from "./";
import { updateUser, verifyPassword } from "../services";
import { User } from "../domain";
import { ERROR_MESSAGES } from "../constants";

export function useDashboard() {
  const { user, updateUserState: setAuthUser } = useAuth();
  const { showNotification } = useNotification();

  // تغییر نام کلیدها به username و password
  const [form, setForm] = useState({ username: "", password: "" });
  const [modal, setModal] = useState({ isOpen: false, currentPassword: "" });

  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username && !form.password) {
      showNotification("حداقل یکی از فیلدها باید پر شود.", "error");
      return;
    }
    setModal((prev) => ({ ...prev, isOpen: true }));
  };

  const handleConfirm = async () => {
    if (!user || !modal.currentPassword) {
      showNotification(ERROR_MESSAGES.CURRENT_PASSWORD_REQUIRED, "error");
      return;
    }

    try {
      // فقط فیلدهای پر شده را برای آپدیت بفرست
      const dataToUpdate = {
        ...(form.username && { username: form.username }),
        ...(form.password && { password: form.password }),
      };

      await verifyPassword(modal.currentPassword);
      const response = await updateUser(user.userId, dataToUpdate);

      const updatedUser: User = {
        username: response.user.username,
        userId: response.user.id.toString(),
      };

      setAuthUser(updatedUser);
      showNotification("اطلاعات با موفقیت به‌روز شد!", "success");

      setModal({ isOpen: false, currentPassword: "" });
      setForm({ username: "", password: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "خطای ناشناخته";
      showNotification(message, "error");
    }
  };

  const handleModalClose = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModal((prev) => ({ ...prev, currentPassword: e.target.value }));
  };

  return {
    user,
    form,
    modal,
    handleFormChange,
    handleSubmit,
    handleConfirm,
    handleModalClose,
    handlePasswordChange,
  };
}
