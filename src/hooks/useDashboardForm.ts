import { useState } from "react";
import { useAuth, useNotification } from "./";
import { updateUser, verifyPassword } from "../services";
import { User } from "../domain";
import { ERROR_MESSAGES } from "../constants";

export function useDashboardForm() {
  const { user, updateUserState } = useAuth();
  const { showNotification } = useNotification();

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const resetForm = () => {
    setNewUsername("");
    setNewPassword("");
    setCurrentPassword("");
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername && !newPassword) {
      showNotification("حداقل یکی از فیلدها باید پر شود.", "error");
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const confirmUpdate = async () => {
    if (!user) return;
    if (!currentPassword) {
      showNotification(ERROR_MESSAGES.CURRENT_PASSWORD_REQUIRED, "error");
      return;
    }

    try {
      await verifyPassword(currentPassword);

      const dataToUpdate: { username?: string; password?: string } = {};
      if (newUsername) dataToUpdate.username = newUsername;
      if (newPassword) dataToUpdate.password = newPassword;

      const { user: updatedUser } = await updateUser(user.userId, dataToUpdate);

      const newUserState: User = {
        username: updatedUser.username,
        userId: updatedUser.id.toString(),
      };

      updateUserState(newUserState);
      showNotification("اطلاعات با موفقیت به‌روز شد!", "success");

      setIsConfirmModalOpen(false);
      resetForm();
    } catch (error) {
      const message = error instanceof Error ? error.message : "خطای ناشناخته";
      showNotification(message, "error");
    }
  };

  return {
    user,
    newUsername,
    setNewUsername,
    newPassword,
    setNewPassword,
    currentPassword,
    setCurrentPassword,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    handleUpdate,
    confirmUpdate,
  };
}
