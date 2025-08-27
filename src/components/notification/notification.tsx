import { useState, useEffect } from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  visible: boolean;
}

function Notification({ message, type, visible }: NotificationProps) {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!show) return null;

  const baseClasses =
    "fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white transition-all duration-500 transform";
  const typeClasses = type === "success" ? "bg-green-500" : "bg-red-500";
  const animationClasses = visible
    ? "translate-x-0 opacity-100"
    : "translate-x-full opacity-0";

  return (
    <div className={`${baseClasses} ${typeClasses} ${animationClasses}`}>
      {message}
    </div>
  );
}

export { Notification };
