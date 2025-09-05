import { useState, useCallback } from "react";

function useConfirmModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setPassword("");
  }, []);

  const onPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  return { isOpen, password, open, close, onPasswordChange };
}

export { useConfirmModal };
