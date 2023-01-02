import { ReactNode } from "react";
import { toast } from "react-toastify";

export const useCustomToast = () => {
  const notify = (content: ReactNode) => {
    const newToast = toast(content);
    setTimeout(() => toast.dismiss(newToast), 2000);
  };

  return { notify };
};
