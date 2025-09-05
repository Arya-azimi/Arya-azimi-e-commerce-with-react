import { useCallback } from "react";
import { useAuth } from "./useAuth";
import { useConfirmModal } from "./useConfirmModal";
import { useProfileForm } from "./useProfileForm";

function useProfile() {
  const { user } = useAuth();
  const { isOpen, password, open, close, onPasswordChange } = useConfirmModal();

  const { form, onChange, updateUser } = useProfileForm({
    onSuccess: close,
  });

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (form.username || form.password) {
        open();
      }
    },
    [form, open]
  );

  const onConfirm = useCallback(async () => {
    await updateUser(password);
  }, [updateUser, password]);

  return {
    user,
    form,
    modal: { isOpen, currentPassword: password },
    onChange,
    onSubmit,
    onConfirm,
    onCloseModal: close,
    onPasswordChange,
  };
}

export { useProfile };
