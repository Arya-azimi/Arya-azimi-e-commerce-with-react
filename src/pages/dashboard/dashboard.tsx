import {
  useDashboardFormState,
  useDashboardSubmit,
  useAuth,
} from "../../hooks";
import { Modal } from "../../components/modal";
import { DashboardForm } from "../../components/dashboard-form";

function Dashboard() {
  const { user } = useAuth();

  const {
    newUsername,
    setNewUsername,
    newPassword,
    setNewPassword,
    resetForm,
  } = useDashboardFormState();

  const {
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    currentPassword,
    setCurrentPassword,
    handleInitiateUpdate,
    handleConfirmUpdate,
  } = useDashboardSubmit(newUsername, newPassword, resetForm);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">داشبورد</h1>
          <p className="text-lg mb-6">
            خوش آمدی، <span className="font-semibold">{user?.username}</span>!
          </p>

          <DashboardForm
            user={user}
            newUsername={newUsername}
            setNewUsername={setNewUsername}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            onSubmit={handleInitiateUpdate}
          />
        </div>
      </div>

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmUpdate}
        title="تایید هویت"
      >
        <p className="mb-4">
          برای اعمال تغییرات، لطفا رمز عبور فعلی خود را وارد کنید.
        </p>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="رمز عبور فعلی"
        />
      </Modal>
    </>
  );
}
export { Dashboard };
