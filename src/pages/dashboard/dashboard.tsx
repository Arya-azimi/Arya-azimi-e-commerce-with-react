import { useDashboard } from "../../hooks";
import { Modal, DashboardForm } from "../../components";

function Dashboard() {
  const {
    user,
    form,
    modal,
    handleFormChange,
    handleSubmit,
    handleConfirm,
    handleModalClose,
    handlePasswordChange,
  } = useDashboard();

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
            username={form.username}
            password={form.password}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
        title="تایید هویت"
      >
        <p className="mb-4">
          برای اعمال تغییرات، لطفا رمز عبور فعلی خود را وارد کنید.
        </p>
        <input
          type="password"
          value={modal.currentPassword}
          onChange={handlePasswordChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="رمز عبور فعلی"
        />
      </Modal>
    </>
  );
}

export { Dashboard };
