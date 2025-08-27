import { useState } from "react";

export function useDashboardFormState() {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const resetForm = () => {
    setNewUsername("");
    setNewPassword("");
  };

  return {
    newUsername,
    setNewUsername,
    newPassword,
    setNewPassword,
    resetForm,
  };
}
