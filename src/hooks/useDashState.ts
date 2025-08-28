import { useState } from "react";

function useDashState() {
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

export { useDashState };
