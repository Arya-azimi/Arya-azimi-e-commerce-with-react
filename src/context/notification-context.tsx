import { createContext, useState, ReactNode } from "react";
import { Notification } from "../components/notification/notification";

type NotificationType = "success" | "error";

interface NotificationState {
  message: string;
  type: NotificationType;
  visible: boolean;
}

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<NotificationState>({
    message: "",
    type: "success",
    visible: false,
  });

  const showNotification = (message: string, type: NotificationType) => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
      />
    </NotificationContext.Provider>
  );
}

export { NotificationContext, NotificationProvider };
