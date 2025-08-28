import { useState } from "react";
import { useAuth, useNotification } from "./";
import { updateUser, verifyPassword } from "../services";
import { User } from "../domain";
import { ERROR_MESSAGES } from "../constants";

function useDashboardSubmit(
  newUsername: string,
  newPassword: string,
  resetForm: () => void
) {
  const { user, updateUserState } = useAuth();
  const { showNotification } = useNotification();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");

  const handleInitiateUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername && !newPassword) {
      showNotification("حداقل یکی از فیلدها باید پر شود.", "error");
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const handleConfirmUpdate = async () => {
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

      const response = await updateUser(user.userId, dataToUpdate);

      const updatedUserForState: User = {
        username: response.user.username,
        userId: response.user.id.toString(),
      };

      updateUserState(updatedUserForState);
      showNotification("اطلاعات با موفقیت به‌روز شد!", "success");

      setIsConfirmModalOpen(false);
      setCurrentPassword("");
      resetForm();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "خطای ناشناخته";
      if (errorMessage.includes("رمز عبور فعلی اشتباه است")) {
        showNotification(ERROR_MESSAGES.INCORRECT_CURRENT_PASSWORD, "error");
      } else {
        showNotification(errorMessage, "error");
      }
    }
  };

  return {
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    currentPassword,
    setCurrentPassword,
    handleInitiateUpdate,
    handleConfirmUpdate,
  };
}

export { useDashboardSubmit };
