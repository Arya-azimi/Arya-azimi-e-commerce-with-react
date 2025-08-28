import { useState } from "react";

function useDashboardFormState() {
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

export { useDashboardFormState };
