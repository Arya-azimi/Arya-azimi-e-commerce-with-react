import { UI_MESSAGES } from "../../constants/messages";

export function Loading() {
  return (
    <div className="text-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-blue-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">{UI_MESSAGES.LOADING}</p>
    </div>
  );
}
