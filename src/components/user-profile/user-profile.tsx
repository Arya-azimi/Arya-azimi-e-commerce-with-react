import { useProfile } from "../../hooks";
import { Modal, DashboardForm } from "..";

export function UserProfile() {
  const {
    user,
    form,
    modal,
    onChange,
    onSubmit,
    onConfirm,
    onCloseModal,
    onPasswordChange,
  } = useProfile();

  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <DashboardForm
          user={user}
          username={form.username}
          password={form.password}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={onCloseModal}
        onConfirm={onConfirm}
        title="تایید هویت"
      >
        <input
          type="password"
          value={modal.currentPassword}
          onChange={onPasswordChange}
          // ...
        />
      </Modal>
    </>
  );
}
