import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
}

function Modal({ isOpen, onClose, onConfirm, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-xl p-6 z-50 w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="text-gray-700 mb-6">{children}</div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            نه، لغو
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            بله، خارج شو
          </button>
        </div>
      </div>
    </div>
  );
}

export { Modal };
